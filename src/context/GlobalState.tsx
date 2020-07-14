import React, { useReducer } from "react";
import { DeviceStoreable, Device, ProcessStoreable, Process } from "micro-device-modules";
import { itemStore } from "./item-state";
import { createItemStoreContext } from "./item-context";
import { ItemState, itemReducer, ItemStoreAction } from "./item-reducer";

export const GlobalContext = React.createContext({
    device: createItemStoreContext<Device>(),
    process: createItemStoreContext<Process>(),
});

export const deviceReducer = (
    state: ItemState<Device>,
    action: ItemStoreAction<Device>) => {
    return itemReducer<Device>(state, action);
};

export const processReducer = (
    state: ItemState<Process>,
    action: ItemStoreAction<Process>) => {
    return itemReducer<Process>(state, action);
};

const processes: ProcessStoreable = new ProcessStoreable();
const devices: DeviceStoreable = new DeviceStoreable();

interface props {
    children: JSX.Element | JSX.Element[];
}

export const GlobalState = (p: props) => {
    devices.load();
    processes.load();

    const [deviceState, deviceDispatch] = useReducer(deviceReducer, {
        list: devices.sort(),
        item: devices.newItem(),
    });

    const [processState, processDispatch] = useReducer(processReducer, {
        list: processes.sort(),
        item: processes.newItem(),
    });

    return (
        <GlobalContext.Provider
            value={{
                device: itemStore<Device, DeviceStoreable>
                    (devices, deviceState, deviceDispatch),
                process: itemStore<Process, ProcessStoreable>
                    (processes, processState, processDispatch),
            }}>
            {p.children}
        </GlobalContext.Provider >
    )
}
