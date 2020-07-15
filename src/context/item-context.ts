export interface ItemBase<T> {
    newItem: () => void;
    getFirstSelection: () => void;
    put: (item: T) => void;
    putList: (list: T[]) => void;
    removeSelected: () => void;
    toggle: (key: string) => void;
    replace: (list: T[]) => void;
    key: (item: T) => string;
    get: (key: string) => T;
    isSelected: (key: string) => boolean;
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
        isSelected: (key: string) => false,
        key: (item: T) => "",
        replace: (list: T[]) => { },
        get: (key: string): T => { return {} as T },
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
