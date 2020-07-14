import React, { } from "react";

import { SelectableList, StoreableList } from "micro-device-modules";

import {
  ItemState,
  SelectAction,
  NEW,
  PUT,
  PUT_LIST,
  SELECTED,
  REMOVE_SELECTED,
  REPLACE,
  TOGGLE,
  SAVE,
  LOAD,
  ItemStoreAction,
  StoreAction,
} from "./item-reducer";

import { ItemStoreContext, ItemContext, ItemBase, ItemStore } from "./item-context";

export const itemSelectBase = <T, S extends SelectableList<T>>(
  items: S,
  dispatch: React.Dispatch<SelectAction<T>>
): ItemBase<T> => {
  return {
    newItem: () => {
      dispatch({ select: { type: NEW, items: items } });
    },
    getFirstSelection: () => {
      dispatch({ select: { type: SELECTED, items: items } });
    },
    put: (item: T) => {
      dispatch({
        select: {
          type: PUT,
          items: items,
          item: item,
        }
      });
    },
    putList: (item: T[]) => {
      dispatch({
        select: {
          type: PUT_LIST,
          items: items,
          item: item,
        }
      });
    },
    removeSelected: () => {
      dispatch({
        select: {
          type: REMOVE_SELECTED,
          items: items,
        }
      });
    },
    key: (item: T) => {
      return items.key(item);
    },
    toggle: (key: string) => {
      dispatch({
        select: {
          type: TOGGLE,
          items: items,
          key: key,
        }
      });
    },
    replace: (list: T[]) => {
      dispatch({
        select: {
          type: REPLACE,
          items: items,
          list: list,
        }
      });
    },
  }
}

export const itemSelect = <T, S extends SelectableList<T>>(
  items: S,
  state: ItemState<T>,
  dispatch: React.Dispatch<SelectAction<T>>,
): ItemContext<T> => {

  return {
    list: state.list,
    item: state.item,
    select: itemSelectBase<T, S>(items, dispatch),
  }
}

export const itemStoreBase = <T, S extends StoreableList<T>>(
  items: S,
  dispatch: React.Dispatch<StoreAction<T>>,
): ItemStore<T> => {
  return {
    save: () => {
      dispatch({
        store: {
          type: SAVE,
          items: items,
        }
      })
    },
    load: () => {
      dispatch({
        store: {
          type: LOAD,
          items: items,
        }
      })
    },
  }
}

export const itemStore = <T, S extends StoreableList<T>>(
  items: S,
  state: ItemState<T>,
  dispatch: React.Dispatch<ItemStoreAction<T>>,
): ItemStoreContext<T> => {

  return {
    list: state.list,
    item: state.item,
    select: itemSelectBase<T, S>(items,
      dispatch as React.Dispatch<SelectAction<T>>),
    store: itemStoreBase<T, S>(items,
      dispatch as React.Dispatch<StoreAction<T>>)
  }
}