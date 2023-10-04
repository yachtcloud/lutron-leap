export declare class UnimplementedMessageBodyType {
    type: string;
    constructor(type: string);
}
export declare type MessageBodyType = 'OneProjectDefinition' | 'OnePresetDefinition' | 'OneAreaSceneDefinition' | 'MultipleAreaSceneDefinition' | 'OneLinkDefinition' | 'OneLinkNodeDefinition' | 'MultipleLinkNodeDefinition' | 'MultipleLinkDefinition' | 'OneControlStationDefinition' | 'MultipleControlStationDefinition' | 'OneAreaDefinition' | 'MultipleAreaDefinition' | 'OneAreaStatus' | 'MultipleAreaStatus' | 'OneDeviceStatus' | 'OneDeviceDefinition' | 'MultipleDeviceDefinition' | 'OneZoneDefinition' | 'MultipleZoneDefinition' | 'OneZoneStatus' | 'MultipleZoneStatus' | 'OneLEDStatus' | 'OnePingResponse' | 'OneButtonGroupDefinition' | 'MultipleButtonGroupDefinition' | 'OneButtonDefinition' | 'OneButtonStatusEvent' | 'MultipleOccupancyGroupStatus' | 'OneOccupancyGroupDefinition' | 'OneClientSettingDefinition' | 'MultipleVirtualButtonDefinition' | 'OneVirtualButtonDefinition' | 'OneProgrammingModelDefinition' | 'OnePresetAssignmentDefinition' | 'OneDimmedLevelAssignmentDefinition' | 'OneFanSpeedAssignmentDefinition' | 'OneTiltAssignmentDefinition' | 'ExceptionDetail';
export declare class OneDeviceStatus {
    DeviceStatus: DeviceStatus;
}
export declare class OneAreaSceneDefinition {
    AreaScene: AreaSceneDefinition;
}
export declare class MultipleAreaSceneDefinition {
    AreaScenes: AreaSceneDefinition[];
}
export declare class OnePresetDefinition {
    Preset: PresetDefinition;
}
export declare class OneLinkDefinition {
    LinkNode: LinkNodeDefinition;
}
export declare class OneLinkNodeDefinition {
    LinkNode: LinkNodeDefinition;
}
export declare class MultipleLinkNodeDefinition {
    Links: LinkNodeDefinition[];
}
export declare class MultipleLinkDefinition {
    Links: LinkNodeDefinition[];
}
export declare class OneDeviceDefinition {
    Device: DeviceDefinition;
}
export declare class MultipleDeviceDefinition {
    Devices: DeviceDefinition[];
}
export declare class MultipleAreaDefinition {
    Areas: AreaDefinition[];
}
export declare class OneZoneDefinition {
    Zone: ZoneDefinition;
}
export declare class MultipleZoneDefinition {
    Zones: ZoneDefinition[];
}
export declare class OneProjectDefinition {
    Project: ProjectDefinition;
}
export declare class OneAreaStatus {
    AreaStatus: AreaStatus;
}
export declare class MultipleAreaStatus {
    AreaStatuses: AreaStatus[];
}
export declare class OneAreaDefinition {
    Area: AreaDefinition;
}
export declare class OneControlStationDefinition {
    ControlStation: ControlStationDefinition;
}
export declare class MultipleControlStationDefinition {
    ControlStations: ControlStationDefinition[];
}
export declare class OneZoneStatus {
    ZoneStatus: ZoneStatus;
}
export declare class MultipleZoneStatus {
    ZoneStatuses: ZoneStatus[];
}
export declare class OneLEDStatus {
    LEDStatus: LEDStatus;
}
export declare class OnePingResponse {
    PingResponse: PingResponseDefinition;
}
export declare class OneButtonGroupDefinition {
    ButtonGroup: ButtonGroupDefinition;
}
export declare class MultipleButtonGroupDefinition {
    ButtonGroups: ButtonGroupDefinition[];
}
export declare class OneButtonDefinition {
    Button: ButtonDefinition;
}
export declare class OneButtonStatusEvent {
    ButtonStatus: ButtonStatus;
}
export declare class MultipleOccupancyGroupStatus {
    OccupancyGroupStatuses: OccupancyGroupStatus[];
}
export declare class OneOccupancyGroupDefinition {
    OccupancyGroup: OccupancyGroupDefinition;
}
export declare class OneClientSettingDefinition {
    ClientSetting: ClientSettingDefinition;
}
export declare class MultipleVirtualButtonDefinition {
    VirtualButtons: VirtualButtonDefinition[];
}
export declare class OneVirtualButtonDefinition {
    VirtualButton: VirtualButtonDefinition;
}
export declare class OneProgrammingModelDefinition {
    ProgrammingModel: ProgrammingModelDefinition;
}
export declare class OnePresetAssignmentDefinition {
    PresetAssignment: PresetAssignmentDefinition;
}
export declare class OneDimmedLevelAssignmentDefinition {
    DimmedLevelAssignment: DimmedLevelAssignmentDefinition;
}
export declare class OneFanSpeedAssignmentDefinition {
    FanSpeedAssignment: FanSpeedAssignmentDefinition;
}
export declare class OneTiltAssignmentDefinition {
    TiltAssignment: TiltAssignmentDefinition;
}
export declare class ExceptionDetail {
    Message: string;
}
export declare type BodyType = OneProjectDefinition | OnePresetDefinition | OneAreaSceneDefinition | MultipleAreaSceneDefinition | OneLinkDefinition | OneLinkNodeDefinition | MultipleLinkNodeDefinition | MultipleLinkDefinition | OneZoneDefinition | MultipleZoneDefinition | OneAreaDefinition | MultipleAreaDefinition | OneControlStationDefinition | MultipleControlStationDefinition | OneAreaStatus | MultipleAreaStatus | OneDeviceStatus | OneDeviceDefinition | MultipleDeviceDefinition | OneZoneStatus | MultipleZoneStatus | OneLEDStatus | OnePingResponse | OneButtonGroupDefinition | MultipleButtonGroupDefinition | OneButtonDefinition | OneButtonStatusEvent | MultipleOccupancyGroupStatus | OccupancyGroupDefinition | OneClientSettingDefinition | MultipleVirtualButtonDefinition | OneVirtualButtonDefinition | OneProgrammingModelDefinition | OnePresetAssignmentDefinition | OneDimmedLevelAssignmentDefinition | OneFanSpeedAssignmentDefinition | OneTiltAssignmentDefinition | ExceptionDetail;
export declare function parseBody(type: MessageBodyType, data: object): BodyType;
export declare type Href = {
    href: string;
};
export declare type PhaseSetting = Href & {
    Direction: string;
};
export declare type TuningSetting = Href & {
    HighEndTrim: number;
    LowEndTrim: number;
};
export declare type Zone = Href & {
    AssociatedArea: Href;
    ControlType: string;
    Name: string;
    PhaseSettings: PhaseSetting;
    SortOrder: number;
    TuningSettings: TuningSetting;
};
export declare type AffectedZone = Href & {
    ButtonGroup: ButtonGroupDefinition;
    Zone: Zone;
};
export declare type AdvancedToggleProperties = {
    PrimaryPreset: Href;
    SecondaryPreset: Href;
};
export declare type DualActionProperties = {
    PressPreset: Href;
    ReleasePreset: Href;
};
export declare type ProgrammingModelType = 'SingleActionProgrammingModel' | 'SingleSceneRaiseProgrammingModel' | 'DualActionProgrammingModel' | 'AdvancedToggleProgrammingModel' | 'AdvancedConditionalProgrammingModel' | 'SingleSceneLowerProgrammingModel' | 'SimpleConditionalProgrammingModel' | 'OpenStopCloseStopProgrammingModel' | 'Unknown';
export declare type ProgrammingModelDefinition = Href & {
    AdvancedToggleProperties: AdvancedToggleProperties;
    DualActionProperties: DualActionProperties;
    Name: string;
    Parent: Href;
    Preset: Href;
    ProgrammingModelType: ProgrammingModelType;
};
export declare type ButtonDefinition = Href & {
    AssociatedLED: Href;
    ButtonNumber: number;
    Engraving: {
        Text: string;
    };
    Name: string;
    Parent: Href;
    ProgrammingModel: ProgrammingModelDefinition;
};
export declare type ButtonGroupDefinition = Href & {
    AffectedZones: AffectedZone[];
    Buttons: Href[];
    Parent: DeviceDefinition;
    ProgrammingType: string;
    SortOrder: number;
    StopIfMoving: string;
};
export declare type ButtonStatus = Href & {
    Button: Href;
    ButtonEvent: {
        EventType: 'Press' | 'Release' | 'LongHold';
    };
};
export declare type DeviceDefinition = Href & {
    Name: string;
    FullyQualifiedName: string[];
    Parent: Href;
    SerialNumber: string;
    ModelNumber: string;
    DeviceType: string;
    ButtonGroups: Href[];
    LocalZones: Href[];
    AssociatedArea: Href;
    OccupancySensors: Href[];
    LinkNodes: Href[];
    DeviceRules: Href[];
    RepeaterProperties: {
        IsRepeater: boolean;
    };
    FirmwareImage: {
        Firmware: {
            DisplayName: string;
        };
        Installed: {
            Year: number;
            Month: number;
            Day: number;
            Hour: number;
            Minute: number;
            Second: number;
            Utc: string;
        };
    };
    AddressedState?: 'Addressed' | 'Unaddressed' | 'Unknown';
    IsThisDevice?: boolean;
};
export declare type OnOrOff = 'On' | 'Off';
export declare type FanSpeedType = 'High' | 'MediumHigh' | 'Medium' | 'Low' | 'Off';
export declare type ZoneStatus = Href & {
    CCOLevel: 'Open' | 'Closed';
    Level: number;
    SwitchedLevel: 'On' | 'Off';
    FanSpeed: FanSpeedType;
    Zone: Href;
    StatusAccuracy: 'Good';
    AssociatedArea: Href;
    Availability: 'Available' | 'Unavailable' | 'Mixed' | 'Unknown';
    Tilt: number;
};
export declare type LEDStatus = Href & {
    LED: Href;
    State: 'On' | 'Off';
};
export declare type Category = {
    Type: string;
    SubType: string;
    IsLight: boolean;
};
export declare type ZoneDefinition = Href & {
    Name: string;
    ControlType: string;
    Category: Category;
    Device: Href;
    AssociatedFacade: Href;
};
export declare type DeviceStatus = Href & {
    DeviceHeard: DeviceHeard;
};
export declare type DeviceHeard = {
    DiscoveryMechanism: 'UserInteraction' | 'UnassociatedDeviceDiscovery' | 'Unknown';
    SerialNumber: string;
    DeviceType: string;
    ModelNumber: string;
};
export declare type AreaStatus = Href & {
    Level: number;
    OccupancyStatus: string;
    CurrentScene: Href;
};
export declare type AreaDefinition = Href & {
    Name: string;
    ControlType: string;
    Parent: Href;
    AssociatedZones: Href[];
    AssociatedControlStations: Href[];
    AssociatedOccupancyGroups: Href[];
};
export declare type ControlStationDefinition = Href & {
    Name: string;
    ControlType: string;
    Parent: Href;
    AssociatedArea: Href;
    SortOrder: number;
    AssociatedGangedDevices: DeviceDefinition[];
};
export declare type ProjectDefinition = Href & {
    Name: string;
    ControlType: string;
    ProductType: string;
    Contacts: Href[];
    TimeclockEventRules: Href;
    ProjectModifiedTimestamp: {
        Year: number;
        Month: number;
        Day: number;
        Hour: number;
        Minute: number;
        Second: number;
        Utc: 'string';
    };
};
export declare type LinkNodeDefinition = Href & {
    Parent: Href;
    LinkType: string;
    SortOrder: number;
    AssociatedLink: Href;
    ClearConnectTypeXLinkProperties: {
        PANID: number;
        ExtendedPANID: string;
        Channel: number;
        NetworkName: string;
        NetworkMasterKey: string;
    };
};
export declare type AreaSceneDefinition = Href & {
    Name: string;
    Parent: Href;
    Preset: Href;
    SortOrder: number;
};
export declare type PresetAssignmentDefinition = Href & {
    AffectedZone?: Zone;
    Delay?: number;
    Fade?: number;
    Level?: number;
    Name?: string;
    Parent?: PresetDefinition;
};
export declare type PresetDefinition = Href & {
    Name: string;
    Parent: Href;
    ChildPresetAssignment: PresetAssignmentDefinition;
    PresetAssignments: Href[];
    FanSpeedAssignments: Href[];
    TiltAssignments: Href[];
    DimmedLevelAssignments: Href[];
    FavoriteCycleAssignments: Href[];
    NextTrackAssignments: Href[];
    PauseAssignments: Href[];
    PlayPauseToggleAssignments: Href[];
    RaiseLowerAssignments: Href[];
    ShadeLevelAssignments: Href[];
    SonosPlayAssignments: Href[];
    SwitchedLevelAssignments: Href[];
    WhiteTuningLevelAssignments: Href[];
};
export declare type OccupancyStatus = 'Occupied' | 'Unoccupied' | 'Unknown';
export declare type OccupancyGroupStatus = Href & {
    OccupancyGroup: OccupancyGroupDefinition;
    OccupancyStatus: OccupancyStatus;
};
export declare type OccupancyGroupDefinition = Href & {
    AssociatedAreas?: AssociatedArea[];
    AssociatedSensors?: AssociatedSensor[];
    ProgrammingModel?: Href;
    ProgrammingType?: string;
    OccupiedActionSchedule?: {
        ScheduleType: string;
    };
    UnoccupiedActionSchedule?: {
        ScheduleType: string;
    };
};
export declare type AssociatedArea = Href & {
    Area: Href;
};
export declare type AssociatedSensor = Href & {
    OccupancySensor: Href;
};
export declare type ClientSettingDefinition = Href & {
    ClientMajorVersion: number;
    ClientMinorVersion: number;
    Permissions: {
        SessionRole: string;
    };
};
export declare type PingResponseDefinition = {
    LEAPVersion: number;
};
export declare type VirtualButtonDefinition = Href & {
    ButtonNumber: number;
    Category: Category;
    IsProgrammed: boolean;
    Name: string;
    Parent: Href;
    ProgrammingModel: Href;
};
export declare type DimmedLevelAssignmentDefinition = Href & {
    AssignableResource: Href;
    DelayTime: string;
    FadeTime: string;
    Level: number;
    Parent: Href;
};
export declare type FanSpeedAssignmentDefinition = Href & {
    AssignableResource: Href;
    DelayTime: string;
    Parent: Href;
    Speed: string;
};
export declare type TiltAssignmentDefinition = Href & {
    Parent: Href;
    AssignableResource: Href;
    DelayTime: string;
    Tilt: number;
};
//# sourceMappingURL=MessageBodyTypes.d.ts.map