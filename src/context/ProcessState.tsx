import React, { useReducer, useEffect } from "react";
import { createItemStoreContext } from "./item-context";
import { Process, ProcessStoreable } from "micro-device-modules";
import { ItemStoreAction, itemStoreReducer, StoreAction } from "./item-store-reducer";
import { ItemState } from "./item-reducer";
import { itemStore, itemStoreBase } from "./item-state";

export const ProcessContext =
    React.createContext(createItemStoreContext<Process>());

export const processReducer = (
    state: ItemState<Process>,
    action: ItemStoreAction<Process>) => {

    return itemStoreReducer<Process>(state, action);
}

interface props {
    processes: ProcessStoreable;
    children: JSX.Element | JSX.Element[];
}

export const ProcessState = (p: props) => {
    const [state, dispatch] = useReducer(processReducer, {
        list: p.processes.sort(),
        item: p.processes.newItem(),
    });

    useEffect(() => {
        const store = itemStoreBase<Process, ProcessStoreable>(
            p.processes,
            dispatch as React.Dispatch<StoreAction<Process>>
        );
        store.save();
    }, [state.list, p]);

    return (
        <ProcessContext.Provider
            value={itemStore<Process, ProcessStoreable>(
                p.processes, state, dispatch)}>
            {p.children}
        </ProcessContext.Provider >
    )
}
