import React, { useContext, useRef } from 'react'

import { Device, DeviceStoreable } from 'micro-device-modules'
import { SelectItem } from './InputItem';
import { GlobalContext } from '../context/GlobalState';

interface DeviceLookupProps {
    label: string;
    value: string;
    setValue: (value: any) => void;
}

export const DeviceLookup: React.FC<DeviceLookupProps> = (p) => {
    const context = useContext(GlobalContext);
    const listOptions = context.device.list.map((d) => {
        return {
            label: d.label,
            value: context.device.select.key(d)
        };
    });

    return (<SelectItem
        label={p.label}
        value={p.value}
        setValue={p.setValue}
        options={listOptions} />);
}

interface PinLookupProps {
    deviceKey: string;
    label: string;
    value: string;
    setValue: (value: any) => void;
}
export const PinLookup: React.FC<PinLookupProps> = (p) => {
    const context = useContext(GlobalContext);
    const device = context.device.select.get(p.deviceKey);
    const pins = device.pins;
    const listOptions = pins.sort().map((pin) => {
        return {
            label: `${pin.id} - ${pin.label}`,
            value: pins.key(pin),
        };
    });

    return (<SelectItem
        label={p.label}
        value={p.value}
        setValue={p.setValue}
        options={listOptions} />);
}