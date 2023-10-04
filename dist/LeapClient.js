"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeapClient = void 0;
const tls_1 = require("tls");
const debug_1 = require("debug");
const events_1 = require("events");
const MessageBodyTypes_1 = require("./MessageBodyTypes");
const ResponseParser_1 = require("./ResponseParser");
const uuid_1 = require("uuid");
const logDebug = (0, debug_1.default)('leap:protocol:client');
class LeapClient extends events_1.EventEmitter {
    constructor(host, port, ca, key, cert, sslKeylogFile) {
        super();
        this.host = host;
        this.port = port;
        this.inFlightRequests = new Map();
        this.taggedSubscriptions = new Map();
        logDebug('new LeapClient being constructed');
        this.connected = null;
        const context = (0, tls_1.createSecureContext)({
            ca,
            key,
            cert,
        });
        this.tlsOptions = {
            secureContext: context,
            secureProtocol: 'TLSv1_2_method',
            rejectUnauthorized: false,
        };
        this.responseParser = new ResponseParser_1.ResponseParser();
        this.responseParser.on('response', this._handleResponse.bind(this));
        if (sslKeylogFile !== undefined) {
            this.sslKeylogFile = sslKeylogFile;
        }
    }
    async retrieve(href, endpoint) {
        const resp = await this.request('ReadRequest', href.href + (endpoint !== undefined ? endpoint : ''));
        if (resp.Body === undefined) {
            throw new Error(`could not get ${href.href}: no body`);
        }
        if (resp.Body instanceof MessageBodyTypes_1.ExceptionDetail) {
            throw new Error(`could not get ${href.href}: ${resp.Body.Message}`);
        }
        return resp.Body;
    }
    async request(communiqueType, url, body, tag) {
        var _a;
        logDebug(`request ${communiqueType} for url ${url}`);
        await this.connect();
        if (tag === undefined) {
            tag = (0, uuid_1.v4)();
        }
        if (this.inFlightRequests.has(tag)) {
            const ifr = this.inFlightRequests.get(tag);
            ifr.reject(new Error('Request clobbered due to tag re-use'));
            clearTimeout(ifr.timeout);
            this.inFlightRequests.delete(tag);
        }
        let requestResolve = () => {
            // this gets replaced
        };
        let requestReject = () => {
            // this gets replaced
        };
        const requestPromise = new Promise((resolve, reject) => {
            requestResolve = resolve;
            requestReject = reject;
        });
        const message = {
            CommuniqueType: communiqueType,
            Header: {
                ClientTag: tag,
                Url: url,
            },
        };
        if (body !== undefined) {
            message.Body = body;
        }
        const msg = JSON.stringify(message);
        logDebug('request handler about to write:', msg);
        let timeout;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.write(msg + '\n', () => {
            timeout = setTimeout(() => {
                requestReject(new Error('request with tag' + tag + 'timed out'));
            }, 5000);
            logDebug('sent request tag', tag, ' successfully');
        });
        this.inFlightRequests.set(tag, {
            message,
            resolve: requestResolve,
            reject: requestReject,
            timeout,
        });
        logDebug('added promise to inFlightRequests with tag key', tag);
        return requestPromise;
    }
    connect() {
        if (!this.connected) {
            logDebug('needs to connect');
            this.connected = new Promise((resolve, reject) => {
                this.socket = (0, tls_1.connect)(this.port, this.host, this.tlsOptions, () => {
                    logDebug('connected!');
                });
                this.socket.once('secureConnect', () => {
                    logDebug('securely connected');
                    this._onConnect(resolve, reject);
                });
                this.socket.once('error', (e) => {
                    console.error('connection failed: ', e);
                    this.connected = null;
                    reject(e);
                });
                if (this.sslKeylogFile !== undefined) {
                    this.socket.on('keylog', (line) => this.sslKeylogFile.write(line));
                }
            });
        }
        return this.connected;
    }
    close() {
        // this method does not prevent the client from being used; instead it
        // only closes the connection. subsequent requests will trigger this
        // client to attempt to reconnect. make sure nobody is going to try to
        // use this client before you dispose of it.
        var _a;
        this.connected = null;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.end();
    }
    async subscribe(url, callback, communiqueType, body, tag) {
        const _tag = tag || (0, uuid_1.v4)();
        if (communiqueType === undefined) {
            communiqueType = 'SubscribeRequest';
        }
        return await this.request(communiqueType, url, body, _tag).then((response) => {
            if (response.Header.StatusCode !== undefined && response.Header.StatusCode.isSuccessful()) {
                this.taggedSubscriptions.set(_tag, callback);
                logDebug('Subscribed to', url, ' as ', _tag);
            }
            return { response, tag: _tag };
        });
    }
    _empty() {
        this.inFlightRequests.clear();
        this.taggedSubscriptions.clear();
    }
    _onConnect(next, _reject) {
        var _a, _b, _c, _d;
        logDebug('_onConnect called');
        const socketErr = (err) => {
            console.error('socket error:', err);
        };
        const socketEnd = () => {
            var _a, _b;
            logDebug('client socket has ended');
            (_a = this.socket) === null || _a === void 0 ? void 0 : _a.end(); // Acknowledge to other end of the connection that the connection is ended.
            (_b = this.socket) === null || _b === void 0 ? void 0 : _b.destroy(); // Prevent writes
        };
        const socketClose = (sock) => {
            console.warn('client socket has closed.');
            this.connected = null;
            this._empty();
            this.emit('disconnected');
        };
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.on('error', socketErr);
        (_b = this.socket) === null || _b === void 0 ? void 0 : _b.on('close', socketClose);
        (_c = this.socket) === null || _c === void 0 ? void 0 : _c.on('data', this.socketDataHandler.bind(this));
        (_d = this.socket) === null || _d === void 0 ? void 0 : _d.on('end', socketEnd);
        return next();
    }
    socketDataHandler(data) {
        const s = data.toString();
        logDebug('got data from socket:', s);
        this.responseParser.handleData(s);
    }
    _handleResponse(response) {
        const tag = response.Header.ClientTag;
        if (tag !== undefined) {
            logDebug('got response to tag', tag);
            const arrow = this.inFlightRequests.get(tag);
            if (arrow !== undefined) {
                logDebug('tag', tag, ' recognized as in-flight');
                clearTimeout(arrow.timeout);
                this.inFlightRequests.delete(tag);
                arrow.resolve(response);
            }
            else {
                logDebug('tag', tag, ' not in flight');
                const sub = this.taggedSubscriptions.get(tag);
                if (sub !== undefined) {
                    logDebug('tag', tag, ' has a subscription');
                    sub(response);
                }
                else {
                    logDebug('ERROR was not expecting tag ', tag);
                }
            }
        }
        else {
            logDebug('got untagged, unsolicited response');
            this.emit('unsolicited', response);
        }
    }
    async setVersion() {
        logDebug('setVersion request');
        const resp = await this.request('UpdateRequest', '/clientsetting', {
            ClientSetting: {
                ClientMajorVersion: 1,
            },
        });
        switch (resp.CommuniqueType) {
            case 'ExceptionResponse': {
                return resp.Body;
            }
            case 'UpdateResponse': {
                return resp.Body.ClientSetting;
            }
            default: {
                throw new Error('bad communique type');
            }
        }
    }
    async ping() {
        const resp = await this.request('ReadRequest', '/server/1/status/ping');
        return resp.Body.PingResponse;
    }
}
exports.LeapClient = LeapClient;
//# sourceMappingURL=LeapClient.js.map