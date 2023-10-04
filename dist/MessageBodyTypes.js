"use strict";
/* tslint:disable:max-classes-per-file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBody = exports.ExceptionDetail = exports.OneTiltAssignmentDefinition = exports.OneFanSpeedAssignmentDefinition = exports.OneDimmedLevelAssignmentDefinition = exports.OnePresetAssignmentDefinition = exports.OneProgrammingModelDefinition = exports.OneVirtualButtonDefinition = exports.MultipleVirtualButtonDefinition = exports.OneClientSettingDefinition = exports.OneOccupancyGroupDefinition = exports.MultipleOccupancyGroupStatus = exports.OneButtonStatusEvent = exports.OneButtonDefinition = exports.MultipleButtonGroupDefinition = exports.OneButtonGroupDefinition = exports.OnePingResponse = exports.OneLEDStatus = exports.MultipleZoneStatus = exports.OneZoneStatus = exports.MultipleControlStationDefinition = exports.OneControlStationDefinition = exports.OneAreaDefinition = exports.MultipleAreaStatus = exports.OneAreaStatus = exports.OneProjectDefinition = exports.MultipleZoneDefinition = exports.OneZoneDefinition = exports.MultipleAreaDefinition = exports.MultipleDeviceDefinition = exports.OneDeviceDefinition = exports.MultipleLinkDefinition = exports.MultipleLinkNodeDefinition = exports.OneLinkNodeDefinition = exports.OneLinkDefinition = exports.OnePresetDefinition = exports.MultipleAreaSceneDefinition = exports.OneAreaSceneDefinition = exports.OneDeviceStatus = exports.UnimplementedMessageBodyType = void 0;
const debug = require("debug");
const util = require("util");
const logDebug = debug('leap:message:bodytype');
class UnimplementedMessageBodyType {
    constructor(type) {
        this.type = type;
    }
}
exports.UnimplementedMessageBodyType = UnimplementedMessageBodyType;
class OneDeviceStatus {
}
exports.OneDeviceStatus = OneDeviceStatus;
class OneAreaSceneDefinition {
}
exports.OneAreaSceneDefinition = OneAreaSceneDefinition;
class MultipleAreaSceneDefinition {
}
exports.MultipleAreaSceneDefinition = MultipleAreaSceneDefinition;
class OnePresetDefinition {
}
exports.OnePresetDefinition = OnePresetDefinition;
class OneLinkDefinition {
}
exports.OneLinkDefinition = OneLinkDefinition;
class OneLinkNodeDefinition {
}
exports.OneLinkNodeDefinition = OneLinkNodeDefinition;
class MultipleLinkNodeDefinition {
}
exports.MultipleLinkNodeDefinition = MultipleLinkNodeDefinition;
class MultipleLinkDefinition {
}
exports.MultipleLinkDefinition = MultipleLinkDefinition;
class OneDeviceDefinition {
}
exports.OneDeviceDefinition = OneDeviceDefinition;
class MultipleDeviceDefinition {
    constructor() {
        this.Devices = [];
    }
}
exports.MultipleDeviceDefinition = MultipleDeviceDefinition;
class MultipleAreaDefinition {
    constructor() {
        this.Areas = [];
    }
}
exports.MultipleAreaDefinition = MultipleAreaDefinition;
class OneZoneDefinition {
}
exports.OneZoneDefinition = OneZoneDefinition;
class MultipleZoneDefinition {
    constructor() {
        this.Zones = [];
    }
}
exports.MultipleZoneDefinition = MultipleZoneDefinition;
class OneProjectDefinition {
}
exports.OneProjectDefinition = OneProjectDefinition;
class OneAreaStatus {
}
exports.OneAreaStatus = OneAreaStatus;
class MultipleAreaStatus {
}
exports.MultipleAreaStatus = MultipleAreaStatus;
class OneAreaDefinition {
}
exports.OneAreaDefinition = OneAreaDefinition;
class OneControlStationDefinition {
}
exports.OneControlStationDefinition = OneControlStationDefinition;
class MultipleControlStationDefinition {
}
exports.MultipleControlStationDefinition = MultipleControlStationDefinition;
class OneZoneStatus {
}
exports.OneZoneStatus = OneZoneStatus;
class MultipleZoneStatus {
}
exports.MultipleZoneStatus = MultipleZoneStatus;
class OneLEDStatus {
}
exports.OneLEDStatus = OneLEDStatus;
class OnePingResponse {
}
exports.OnePingResponse = OnePingResponse;
class OneButtonGroupDefinition {
}
exports.OneButtonGroupDefinition = OneButtonGroupDefinition;
class MultipleButtonGroupDefinition {
}
exports.MultipleButtonGroupDefinition = MultipleButtonGroupDefinition;
class OneButtonDefinition {
}
exports.OneButtonDefinition = OneButtonDefinition;
class OneButtonStatusEvent {
}
exports.OneButtonStatusEvent = OneButtonStatusEvent;
class MultipleOccupancyGroupStatus {
}
exports.MultipleOccupancyGroupStatus = MultipleOccupancyGroupStatus;
class OneOccupancyGroupDefinition {
}
exports.OneOccupancyGroupDefinition = OneOccupancyGroupDefinition;
class OneClientSettingDefinition {
}
exports.OneClientSettingDefinition = OneClientSettingDefinition;
class MultipleVirtualButtonDefinition {
}
exports.MultipleVirtualButtonDefinition = MultipleVirtualButtonDefinition;
class OneVirtualButtonDefinition {
}
exports.OneVirtualButtonDefinition = OneVirtualButtonDefinition;
class OneProgrammingModelDefinition {
}
exports.OneProgrammingModelDefinition = OneProgrammingModelDefinition;
class OnePresetAssignmentDefinition {
}
exports.OnePresetAssignmentDefinition = OnePresetAssignmentDefinition;
class OneDimmedLevelAssignmentDefinition {
}
exports.OneDimmedLevelAssignmentDefinition = OneDimmedLevelAssignmentDefinition;
class OneFanSpeedAssignmentDefinition {
}
exports.OneFanSpeedAssignmentDefinition = OneFanSpeedAssignmentDefinition;
class OneTiltAssignmentDefinition {
}
exports.OneTiltAssignmentDefinition = OneTiltAssignmentDefinition;
class ExceptionDetail {
    constructor() {
        this.Message = '';
    }
}
exports.ExceptionDetail = ExceptionDetail;
function parseBody(type, data) {
    logDebug('parsing body type', type, 'with data:', util.inspect(data, { depth: null }));
    let theType;
    switch (type) {
        case 'OneDeviceDefinition':
            theType = OneDeviceDefinition;
            break;
        case 'OnePresetDefinition':
            theType = OnePresetDefinition;
            break;
        case 'OneAreaSceneDefinition':
            theType = OneAreaSceneDefinition;
            break;
        case 'MultipleAreaSceneDefinition':
            theType = MultipleAreaSceneDefinition;
            break;
        case 'MultipleAreaDefinition':
            theType = MultipleAreaDefinition;
            break;
        case 'MultipleDeviceDefinition':
            theType = MultipleDeviceDefinition;
            break;
        case 'ExceptionDetail':
            theType = ExceptionDetail;
            break;
        case 'OneZoneStatus':
            theType = OneZoneStatus;
            break;
        case 'MultipleZoneStatus':
            theType = MultipleZoneStatus;
            break;
        case 'OneLEDStatus':
            theType = OneLEDStatus;
            break;
        case 'OnePingResponse':
            theType = OnePingResponse;
            break;
        case 'OneButtonGroupDefinition':
            theType = OneButtonGroupDefinition;
            break;
        case 'MultipleButtonGroupDefinition':
            theType = MultipleButtonGroupDefinition;
            break;
        case 'OneButtonDefinition':
            theType = OneButtonDefinition;
            break;
        case 'OneButtonStatusEvent':
            theType = OneButtonStatusEvent;
            break;
        case 'OneDeviceStatus':
            theType = OneDeviceStatus;
            break;
        case 'OneZoneDefinition':
            theType = OneZoneDefinition;
            break;
        case 'MultipleZoneDefinition':
            theType = MultipleZoneDefinition;
            break;
        case 'OneAreaDefinition':
            theType = OneAreaDefinition;
            break;
        case 'OneAreaStatus':
            theType = OneAreaStatus;
            break;
        case 'MultipleAreaStatus':
            theType = MultipleAreaStatus;
            break;
        case 'OneControlStationDefinition':
            theType = OneControlStationDefinition;
            break;
        case 'MultipleControlStationDefinition':
            theType = MultipleControlStationDefinition;
            break;
        case 'OneProjectDefinition':
            theType = OneProjectDefinition;
            break;
        case 'OneLinkDefinition':
            theType = OneLinkDefinition;
            break;
        case 'OneLinkNodeDefinition':
            theType = OneLinkNodeDefinition;
            break;
        case 'MultipleLinkNodeDefinition':
            theType = MultipleLinkNodeDefinition;
            break;
        case 'MultipleLinkDefinition':
            theType = MultipleLinkDefinition;
            break;
        case 'MultipleOccupancyGroupStatus':
            theType = MultipleOccupancyGroupStatus;
            break;
        case 'OneOccupancyGroupDefinition':
            theType = OneOccupancyGroupDefinition;
            break;
        case 'OneClientSettingDefinition':
            theType = OneClientSettingDefinition;
            break;
        case 'MultipleVirtualButtonDefinition':
            theType = MultipleVirtualButtonDefinition;
            break;
        case 'OneVirtualButtonDefinition':
            theType = OneVirtualButtonDefinition;
            break;
        case 'OneProgrammingModelDefinition':
            theType = OneProgrammingModelDefinition;
            break;
        case 'OnePresetAssignmentDefinition':
            theType = OnePresetAssignmentDefinition;
            break;
        case 'OneDimmedLevelAssignmentDefinition':
            theType = OneDimmedLevelAssignmentDefinition;
            break;
        case 'OneFanSpeedAssignmentDefinition':
            theType = OneFanSpeedAssignmentDefinition;
            break;
        case 'OneTiltAssignmentDefinition':
            theType = OneTiltAssignmentDefinition;
            break;
        default:
            throw new UnimplementedMessageBodyType(type);
    }
    return Object.assign(new theType(), data);
}
exports.parseBody = parseBody;
//# sourceMappingURL=MessageBodyTypes.js.map