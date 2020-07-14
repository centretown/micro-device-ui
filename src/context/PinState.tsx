
import React, { useReducer } from 'react';
import { Pin, PinSelectable } from 'micro-device-modules';
import { createItemContext } from './item-context'
import { ItemState, itemReducer, SelectAction } from './item-reducer';
import { itemSelect } from './item-state';

export const PinContext =
  React.createContext(createItemContext<Pin>());

export const pinReducer = (
  state: ItemState<Pin>,
  action: SelectAction<Pin>) => {
  return itemReducer<Pin>(state, action);
};

interface props {
  pins: PinSelectable;
  children: JSX.Element | JSX.Element[];
}

export const PinState = (p: props) => {
  const [state, dispatch] = useReducer(pinReducer, {
    list: p.pins.sort(),
    item: p.pins.newItem(),
  });
  return (
    <PinContext.Provider
      value={
        itemSelect<Pin, PinSelectable>(p.pins, state, dispatch)
      }>
      {p.children}

    </PinContext.Provider>
  );
}

export default PinState;
