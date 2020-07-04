import React, { useReducer } from "react";

import { PinContext } from "./pin-context";
import { PinSelectable, Pin } from "micro-device-modules";
import {
  pinReducer,
  REMOVE_SELECTED_PINS,
  SELECTED_PIN,
  TOGGLE_PIN,
  PUT_PIN,
  NEW_PIN,
  defaultPin,
  REPLACE_PINS,
} from "./pin-reducer";

interface props {
  pins: PinSelectable;
  children: JSX.Element | JSX.Element[];
}

export const PinState = (p: props) => {
  const [state, dispatch] = useReducer(pinReducer, {
    list: p.pins.sort(),
    item: defaultPin,
  });
  return (
    <PinContext.Provider
      value={{
        pins: p.pins,
        list: state.list,
        item: state.item,
        newPin: () => {
          dispatch({ type: NEW_PIN, pins: p.pins });
        },
        getFirstSelection: () => {
          dispatch({ type: SELECTED_PIN, pins: p.pins });
        },
        put: (pin: Pin) => {
          dispatch({ type: PUT_PIN, pins: p.pins, pin: pin });
        },
        replace: (list: Pin[]) => {
          dispatch({
            type: REPLACE_PINS,
            pins: p.pins,
            list: list,
          });
        },
        removeSelected: () => {
          dispatch({
            type: REMOVE_SELECTED_PINS,
            pins: p.pins,
          });
        },
        toggle: (key: string) => {
          dispatch({
            type: TOGGLE_PIN,
            pins: p.pins,
            key: key,
          });
        },
        key: (pin: Pin) => {
          return p.pins.key(pin);
        },
      }}
    >
      {p.children}
    </PinContext.Provider>
  );
};

export default PinState;
