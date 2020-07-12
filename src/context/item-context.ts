export interface ItemBase<T> {
    newItem: () => void;
    getFirstSelection: () => void;
    put: (item: T) => void;
    putList: (list: T[]) => void;
    removeSelected: () => void;
    toggle: (key: string) => void;
    key: (item: T) => string;
    replace: (list: T[]) => void;
}

export interface ItemStore<T> {
    save: () => void,
    load: () => void,
}

const createItemBase = <T>(): ItemBase<T> => {
    return {
        newItem: () => { },
        getFirstSelection: () => { },
        put: (item: T) => { },
        putList: (list: T[]) => { },
        removeSelected: () => { },
        toggle: (key: string) => { },
        key: (item: T) => "",
        replace: (list: T[]) => { },
    }
}

export interface ItemContext<T> {
    list: T[];
    item: T;
    select: ItemBase<T>;
}

export interface ItemStoreContext<T> {
    list: T[];
    item: T;
    store: ItemStore<T>;
    select: ItemBase<T>;
}

export const createItemContext = <T>(): ItemContext<T> => {
    return {
        list: [],
        item: {} as T,
        select: createItemBase<T>(),
    }
}

export const createItemStoreContext = <T>(): ItemStoreContext<T> => {
    return {
        list: [],
        item: {} as T,
        select: createItemBase<T>(),
        store: {
            save: () => { },
            load: () => { },
        }
    }
}
