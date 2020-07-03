import React from 'react';
import { DeviceStoreable, Device } from 'micro-device-modules'

interface deviceContext {
    devices: DeviceStoreable;
    list: Device[];
    item: Device;
    newDevice: () => void;
    getFirstSelection: () => void;
    put: (device: Device) => void;
    removeSelected: () => void;
    toggle: (key: string) => void;
};

const deviceDefaultContext: deviceContext = {
    devices: new DeviceStoreable(),
    list: [],
    item: {} as Device,
    getFirstSelection: () => { },
    newDevice: () => { },
    put: (device: Device) => { },
    removeSelected: () => { },
    toggle: (key: string) => { },
};

export const DeviceContext = React.createContext(deviceDefaultContext);

export default DeviceContext;