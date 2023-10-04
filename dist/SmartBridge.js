"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartBridge = exports.LEAP_PORT = void 0;
const debug_1 = require("debug");
const events_1 = require("events");
const logDebug = (0, debug_1.default)('leap:bridge');
exports.LEAP_PORT = 8081;
const PING_INTERVAL_MS = 300000;
const PING_TIMEOUT_MS = 10000;
class SmartBridge extends events_1.EventEmitter {
    constructor(bridgeID, client) {
        super();
        this.bridgeID = bridgeID;
        this.client = client;
        this.pingLooper = null;
        logDebug('new bridge', bridgeID, 'being constructed');
        client.on('unsolicited', this._handleUnsolicited.bind(this));
        client.on('disconnected', this._handleDisconnect.bind(this));
        this.startPingLoop();
    }
    startPingLoop() {
        this.pingLooper = setInterval(() => {
            const pingPromise = this.client.request('ReadRequest', '/server/1/status/ping');
            const timeoutPromise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('Ping timeout');
                }, PING_TIMEOUT_MS);
            });
            Promise.race([pingPromise, timeoutPromise])
                .then((resp) => {
                // if the ping succeeds, there's not really anything to do.
                logDebug('Ping succeeded', resp);
            })
                .catch((e) => {
                // if it fails, however, what do we do? the client's
                // behavior is to attempt to re-open the connection if it's
                // lost. that means calling `this.client.close()` might
                // clobber in-flight requests made between the ping timing
                // out and the attempt to close it. that's bad.
                //
                // I think the answer is: nothing. future attempts to use
                // the client will block (and potentially eventually time
                // out), and we don't ever want to prevent that happening
                // unless specifically requested.
                logDebug('Ping failed:', e);
            });
        }, PING_INTERVAL_MS);
    }
    start() {
        // not much to do here, but it needs to exist if close exists.
        if (this.pingLooper === null) {
            logDebug('Bridge starting');
            this.startPingLoop();
        }
    }
    close() {
        // much as with LeapClient.close, this method will not actually prevent
        // some caller from causing the client to reconnect. all this really
        // does is tell the client to close the socket, and kills the
        // keep-alive loop.
        logDebug('bridge id', this.bridgeID, 'closing');
        if (this.pingLooper !== null) {
            clearTimeout(this.pingLooper);
            this.pingLooper = null;
        }
        this.client.close();
    }
    async ping() {
        return await this.client.request('ReadRequest', '/server/1/status/ping');
    }
    async getHref(href) {
        logDebug(`client getting href ${href.href}`);
        const raw = await this.client.request('ReadRequest', href.href);
        return raw.Body;
    }
    async getBridgeInfo() {
        logDebug('getting bridge information');
        const raw = await this.client.request('ReadRequest', '/device/1');
        if (raw.Body.Device) {
            const device = raw.Body.Device;
            return {
                firmwareRevision: device.FirmwareImage.Firmware.DisplayName,
                manufacturer: 'Lutron Electronics Co., Inc',
                model: device.ModelNumber,
                name: device.FullyQualifiedName.join(' '),
                serialNumber: device.SerialNumber,
            };
        }
        throw new Error('Got bad response to bridge info request');
    }
    async getDeviceInfo() {
        logDebug('getting info about all devices');
        const raw = await this.client.request('ReadRequest', '/device');
        if (raw.Body.Devices) {
            const devices = raw.Body.Devices;
            return devices;
        }
        throw new Error('got bad response to all device list request');
    }
    async setBlindsTilt(device, value) {
        const href = device.LocalZones[0].href + '/commandprocessor';
        logDebug('setting href', href, 'to value', value);
        this.client.request('CreateRequest', href, {
            Command: {
                CommandType: 'GoToTilt',
                TiltParameters: {
                    Tilt: Math.round(value),
                },
            },
        });
    }
    async readBlindsTilt(device) {
        const resp = await this.client.request('ReadRequest', device.LocalZones[0].href + '/status');
        const val = resp.Body.ZoneStatus.Tilt;
        logDebug('read tilt for device', device.FullyQualifiedName.join(' '), 'at', val);
        return val;
    }
    /* A device has a list of ButtonGroup Hrefs. This method maps them to
     * (promises for) the actual ButtonGroup objects themselves.
     */
    async getButtonGroupsFromDevice(device) {
        return Promise.all(device.ButtonGroups.map((bgHref) => this.client.request('ReadRequest', bgHref.href).then((resp) => {
            switch (resp.CommuniqueType) {
                case 'ExceptionResponse':
                    return resp.Body;
                case 'ReadResponse':
                    return resp.Body.ButtonGroup;
                default:
                    throw new Error('Unexpected communique type');
            }
        })));
    }
    /* Similar to getButtonGroupsFromDevice, a ButtonGroup contains a list of
     * Button Hrefs. This maps them to (promises for) the actual Button
     * objects themselves.
     */
    async getButtonsFromGroup(bgroup) {
        return Promise.all(bgroup.Buttons.map((button) => this.client
            .request('ReadRequest', button.href)
            .then((resp) => resp.Body.Button)));
    }
    subscribeToButton(button, cb) {
        this.client.subscribe(button.href + '/status/event', cb);
    }
    /* Because we can't subscribe to individual occupancysensors, we have to
     * subscribe to everything and handle routing elsewhere. As such, this will
     * call `cb` every time any sensor changes.
     */
    async subscribeToOccupancy(cb) {
        this.client.subscribe('/occupancygroup/status', cb).catch((e) => {
            logDebug('ignoring failed subscription because response is not tagged');
        });
        return this.client
            .request('ReadRequest', '/occupancygroup/status')
            .then((resp) => resp.Body);
    }
    _handleUnsolicited(response) {
        logDebug('bridge', this.bridgeID, 'got unsolicited message:');
        logDebug(response);
        this.emit('unsolicited', this.bridgeID, response);
    }
    _handleDisconnect() {
        // nothing to do here
        logDebug('bridge id', this.bridgeID, 'disconnected.');
        this.emit('disconnected');
    }
}
exports.SmartBridge = SmartBridge;
//# sourceMappingURL=SmartBridge.js.map