import React from 'react';
import { Device } from 'micro-device-modules'

interface deviceContext {
    list: Device[];
    item: Device;
    newDevice: () => void;
    getFirstSelection: () => void;
    put: (device: Device) => void;
    removeSelected: () => void;
    toggle: (key: string) => void;
    key: (device: Device) => string;
};

const deviceDefaultContext: deviceContext = {
    list: [],
    item: {} as Device,
    getFirstSelection: () => { },
    newDevice: () => { },
    put: (device: Device) => { },
    removeSelected: () => { },
    toggle: (key: string) => { },
    key: (device: Device) => "",
};

export const DeviceContext = React.createContext(deviceDefaultContext);

export default DeviceContext;