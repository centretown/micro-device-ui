import { SelectableList } from "micro-device-modules"

export const PUT = 'PUT';
export const PUT_LIST = 'PUT_LIST';
export const REMOVE_SELECTED = 'REMOVE_SELECTED';
export const TOGGLE = 'TOGGLE';
export const SELECTED = 'SELECTED';
export const NEW = 'NEW';
export const REPLACE = 'REPLACE';

export interface ItemState<T> {
    list: T[];
    item: T;
}

export interface SelectAction<T> {
    select: putAction<T> |
    putListAction<T> |
    removeAction<T> |
    replaceAction<T> |
    toggleAction<T> |
    getAction<T> |
    newAction<T>
}

export const defaultItem: any = {};

export interface newAction<T> {
    type: 'NEW';
    items: SelectableList<T>;
}
const newItem = <T>(action: newAction<T>, state: ItemState<T>) => {
    state.item = defaultItem;
    return state;
}

export interface getAction<T> {
    type: 'SELECTED';
    items: SelectableList<T>;
}
const selectedItems = <T>(action: getAction<T>, state: ItemState<T>) => {
    const l = action.items.getSelected();
    state.item = (l.length > 0) ? l[0] : defaultItem;
    return state;
}

export interface putAction<T> {
    type: 'PUT';
    items: SelectableList<T>;
    item: T;
};
const putItem = <T>(action: putAction<T>, state: ItemState<T>) => {
    action.items.put(action.item);
    state.list = action.items.sort();
    return state;
}

export interface putListAction<T> {
    type: 'PUT_LIST';
    items: SelectableList<T>;
    item: T[];
};
const putList = <T>(action: putListAction<T>, state: ItemState<T>) => {
    action.items.putList(action.item);
    state.list = action.items.sort();
    return state;
}

export interface removeAction<T> {
    type: 'REMOVE_SELECTED';
    items: SelectableList<T>;
}
const removeSelected = <T>(action: removeAction<T>, state: ItemState<T>) => {
    action.items.removeSelected();
    state.list = action.items.sort();
    return state;
}

export interface replaceAction<T> {
    type: 'REPLACE';
    items: SelectableList<T>;
    list: T[];
}
const replace = <T>(action: replaceAction<T>, state: ItemState<T>) => {
    action.items.replace(action.list);
    state.list = action.items.sort();
    return state;
}

export interface toggleAction<T> {
    type: 'TOGGLE';
    items: SelectableList<T>;
    key: string;
}
const toggle = <T>(action: toggleAction<T>, state: ItemState<T>) => {
    action.items.toggleSelect(action.key);
    return state;
}

export const itemReducer = <T>(
    state: ItemState<T>,
    action: SelectAction<T>,
) => {
    const newState: ItemState<T> = { list: state.list, item: state.item };
    switch (action.select.type) {
        case PUT_LIST:
            return putList<T>(action.select, newState);
        case PUT:
            return putItem<T>(action.select, newState);
        case REMOVE_SELECTED:
            return removeSelected<T>(action.select, newState);
        case TOGGLE:
            return toggle<T>(action.select, newState);
        case SELECTED:
            return selectedItems<T>(action.select, newState);
        case NEW:
            return newItem(action.select, newState);
        case REPLACE:
            return replace<T>(action.select, newState);
        default:
            return state;
    }
}