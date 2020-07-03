import React from 'react';
import { PinSelectable, Pin } from 'micro-device-modules'

export interface contextProps {
    pins: PinSelectable;
    list: Pin[];
    item: Pin;
    newPin: () => void;
    getFirstSelection: () => void;
    put: (pin: Pin) => void;
    removeSelected: () => void;
    toggle: (key: string) => void;
    replace: (list: Pin[]) => void;
};

export const contextDefault: contextProps = {
    pins: new PinSelectable(),
    list: [],
    item: {} as Pin,
    getFirstSelection: () => { },
    newPin: () => { },
    put: (pin: Pin) => { },
    removeSelected: () => { },
    toggle: (key: string) => { },
    replace: (list: Pin[]) => { },
};

export const PinContext = React.createContext(contextDefault);

export default PinContext;