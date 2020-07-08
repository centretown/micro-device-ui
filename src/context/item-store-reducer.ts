import { ItemState, SelectAction, itemReducer } from "./item-reducer";
import { StoreableList } from "micro-device-modules";

export const SAVE = 'SAVE';
export const LOAD = 'LOAD';

export interface saveAction<T> {
    type: 'SAVE',
    items: StoreableList<T>,
}
const save = <T>(action: saveAction<T>, state: ItemState<T>) => {
    action.items.save();
    return state;
}

export interface loadAction<T> {
    type: 'LOAD',
    items: StoreableList<T>,
}
const load = <T>(action: loadAction<T>, state: ItemState<T>) => {
    action.items.load();
    state.list = action.items.sort();
    return state;
}

export interface StoreAction<T> {
    store: saveAction<T> |
    loadAction<T>
}

export interface ItemStoreAction<T> extends SelectAction<T>, StoreAction<T> {
}

export const itemStoreReducer = <T>(
    state: ItemState<T>,
    action: ItemStoreAction<T>,
) => {
    const newState: ItemState<T> = { list: state.list, item: state.item };
    switch (action.store.type) {
        case SAVE:
            return save<T>(action.store, newState);
        case LOAD:
            return load<T>(action.store, newState);
        default:
            return itemReducer(state, action);
    }
}


