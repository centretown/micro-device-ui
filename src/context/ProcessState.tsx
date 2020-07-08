import React, { useReducer } from "react";
import { createItemStoreContext } from "./item-context";
import { Process, ProcessStoreable, ActionSelectable } from "micro-device-modules";
import { ItemStoreAction, itemStoreReducer } from "./item-store-reducer";
import { ItemState } from "./item-reducer";
import { itemStore } from "./item-state";

export const ProcessContext =
    React.createContext(createItemStoreContext<Process>());

export const processReducer = (
    state: ItemState<Process>,
    action: ItemStoreAction<Process>) => {

    return itemStoreReducer(state, action);
}

const processDefault: Process = {
    deviceKey: '',
    label: '',
    purpose: '',
    setup: new ActionSelectable(),
    loop: new ActionSelectable(),
}

interface props {
    processes: ProcessStoreable;
    children: JSX.Element | JSX.Element[];
}

export const ProcessState = (p: props) => {
    const [state, dispatch] = useReducer(processReducer, {
        list: p.processes.sort(),
        item: processDefault,
    })
    return (
        <ProcessContext.Provider
            value={itemStore<Process, ProcessStoreable>(p.processes, state, dispatch)}>
            {p.children}
        </ProcessContext.Provider >
    )
}
