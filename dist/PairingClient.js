"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PairingClient = void 0;
const tls_1 = require("tls");
const debug_1 = require("debug");
const events_1 = require("events");
const Association_1 = require("./Association");
const logDebug = (0, debug_1.default)('leap:pairing');
class PairingClient extends events_1.EventEmitter {
    constructor(host, port) {
        super();
        this.host = host;
        this.port = port;
        logDebug('new PairingClient being constructed');
        this.connected = null;
        this.buffer = '';
        const context = (0, tls_1.createSecureContext)({
            ca: Association_1.assocCACert,
            key: Association_1.assocKey,
            cert: Association_1.assocCert,
        });
        this.tlsOptions = {
            secureContext: context,
            secureProtocol: 'TLSv1_2_method',
            rejectUnauthorized: false,
        };
    }
    connect() {
        if (!this.connected) {
            logDebug('needs to connect');
            this.connected = new Promise((resolve, reject) => {
                logDebug('about to connect');
                this.socket = (0, tls_1.connect)(this.port, this.host, this.tlsOptions, () => {
                    logDebug('connected!');
                });
                this.socket.once('secureConnect', () => {
                    logDebug('securely connected');
                    resolve();
                });
                this.socket.once('error', (e) => {
                    logDebug('connection failed: ', e);
                    this.connected = null;
                    delete this.socket;
                    reject(e);
                });
                this.socket.once('close', () => (sock) => {
                    logDebug('client socket has closed.');
                    this.connected = null;
                    delete this.socket;
                    this.emit('disconnected');
                });
                this.socket.on('data', this.socketDataHandler.bind(this));
            });
        }
        return this.connected;
    }
    async requestPair(csrText) {
        var _a;
        await this.connect();
        const tag = 'get-cert';
        // special not-quite-LEAP format just for CSRs
        const message = {
            Header: {
                RequestType: 'Execute',
                Url: '/pair',
                ClientTag: 'get-cert',
            },
            Body: {
                CommandType: 'CSR',
                Parameters: {
                    CSR: csrText,
                    DisplayName: 'get_lutron_cert.py',
                    DeviceUID: '000000000000',
                    Role: 'Admin',
                },
            },
        };
        const msg = JSON.stringify(message);
        logDebug('request handler about to write:', msg);
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.write(msg + '\n', () => {
            logDebug('sent request tag', tag, ' successfully');
        });
    }
    socketDataHandler(data) {
        const s = data.toString();
        logDebug('got data from socket:', s);
        try {
            logDebug('parsing line', s);
            this.emit('message', JSON.parse(s));
        }
        catch (e) {
            logDebug('malformed response:', e, ' caused by', s);
        }
    }
}
exports.PairingClient = PairingClient;
/*

Reference messages
===

Button pressed
---

'{"Header":{"StatusCode":"200 OK","ContentType":"status;plurality=single"},"Body":{"Status":{"Permissions":["Public","PhysicalAccess"]}}}

Signing request w/o button press (or too slow)
---

'{"Header":{"StatusCode":"401 Unauthorized","ClientTag":"get-cert","ContentType":"exception;plurality=single"},"Body":{"Exception":{"Message":"You are not authorized to perform this request"}}}

Successful signing request
---

'{"Header":{"StatusCode":"200 OK","ClientTag":"get-cert","ContentType":"signing-result;plurality=single"},"Body":{"SigningResult":{"Certificate":"-----BEGIN CERTIFICATE-----\\nMIIC5zCCAo2gAwIBAgIBATAKBggqhkjOPQQDAjCBgzELMAkGA1UEBhMCVVMxFTAT\\nBgNVBAgTDFBlbm5zeWx2YW5pYTEUMBIGA1UEBxMLQ29vcGVyc2J1cmcxJTAjBgNV\\nBAoTHEx1dHJvbiBFbGVjdHJvbmljcyBDby4sIEluYy4xIDAeBgNVBAMTF1NtYXJ0\\nQnJpZGdlOTA3MDY1RTM4RjI1MB4XDTE1MTAzMTAwMDAwMFoXDTM1MTAyNjAwMDAw\\nMFowajEmMCQGA1UEAxMdaG9tZWJyaWRnZS1sdXRyb24tY2FzZXRhLWxlYXAxHDAa\\nBgorBgEEAYK5CQECEwwwMDAwMDAwMDAwMDAxIjAgBgorBgEEAYK5CQEDDBJnZXRf\\nbHV0cm9uX2NlcnQucHkwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDl\\ngZgqYJVnMlEYaaMUdYYWcZA29MrlvPreeiZmQ2ecVAzh/RLkyCW4cB+eLfkkHe3Y\\n1BKgAw8UA8mPrXCN1EnNoXYpAATvbVus3R/WXnfi/15OJMKdedzpyWadgNb14dAe\\nwMGT8GfNrjhPgTs1BEnAnDMaDitrfe8szCD/XAPAywB302QhOXw3sazjjUKysLXU\\nYRcGHV8oB178pAJdy8PU9PqI1ndZgfRFK1XEqG/werAxWteJO6YtNpw8KyDPjKfL\\nij1hy/Nh4ZdzjiXqLSYPZhSrVHY7dL/f8LHDAEEf4pdKgxySeqEruyCXKGeJ10rQ\\nCmHYlVYfHqneQfatR3CdAgMBAAGjPzA9MA4GA1UdDwEB/wQEAwIFoDAdBgNVHSUE\\nFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDAYDVR0TAQH/BAIwADAKBggqhkjOPQQD\\nAgNIADBFAiEA6P/FxTGhr8sQH3zs8iX+J6WLlQAYccbbHqTKKotF0JECIBBg4OQg\\nHNJg9xzp8yIjl8vipLt2+sviVjZHGDgL7YOC\\n-----END CERTIFICATE-----\\n","RootCertificate":"-----BEGIN CERTIFICATE-----\\nMIICGTCCAcCgAwIBAgIBATAKBggqhkjOPQQDAjCBgzELMAkGA1UEBhMCVVMxFTAT\\nBgNVBAgTDFBlbm5zeWx2YW5pYTEUMBIGA1UEBxMLQ29vcGVyc2J1cmcxJTAjBgNV\\nBAoTHEx1dHJvbiBFbGVjdHJvbmljcyBDby4sIEluYy4xIDAeBgNVBAMTF1NtYXJ0\\nQnJpZGdlOTA3MDY1RTM4RjI1MB4XDTE1MTAzMTAwMDAwMFoXDTM1MTAyNjAwMDAw\\nMFowgYMxCzAJBgNVBAYTAlVTMRUwEwYDVQQIEwxQZW5uc3lsdmFuaWExFDASBgNV\\nBAcTC0Nvb3BlcnNidXJnMSUwIwYDVQQKExxMdXRyb24gRWxlY3Ryb25pY3MgQ28u\\nLCBJbmMuMSAwHgYDVQQDExdTbWFydEJyaWRnZTkwNzA2NUUzOEYyNTBZMBMGByqG\\nSM49AgEGCCqGSM49AwEHA0IABHwaUv8PjzUhWjEg6MYhofN8wGNC6s+cwLSC9bBR\\nEvpAAoKqSLXKBDFTCmwdGJj6t2ibBs3dCdR2igKCtrwxrbajIzAhMA4GA1UdDwEB\\n/wQEAwIBvjAPBgNVHRMBAf8EBTADAQH/MAoGCCqGSM49BAMCA0cAMEQCIE1OpNEA\\nmCJBhs5cF53+ETZyP53B3jnxBnx8p1CtlulPAiAc2LMpdtL/H/SWbCC7/iykNn5L\\nflnROpNa+aEHRIW/PQ==\\n-----END CERTIFICATE-----\\n"}}}'

*/
//# sourceMappingURL=PairingClient.js.map