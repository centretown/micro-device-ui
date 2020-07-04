import React, { useReducer, useEffect } from "react";

import DeviceContext from "./device-context";
import {
  deviceReducer,
  defaultDevice,
  NEW_DEVICE,
  SELECTED_DEVICE,
  PUT_DEVICE,
  REMOVE_SELECTED_DEVICES,
  TOGGLE_DEVICE,
  SAVE_DEVICES,
} from "./device-reducer";
import { DeviceStoreable, Device } from "micro-device-modules";

interface props {
  devices: DeviceStoreable;
  children: JSX.Element | JSX.Element[];
}

export const DeviceState = (p: props) => {
  const [state, dispatch] = useReducer(deviceReducer, {
    list: p.devices.sort(),
    item: defaultDevice,
  });

  useEffect(() => {
    dispatch({ type: SAVE_DEVICES, devices: p.devices });
  }, [state.list, p.devices]);

  return (
    <DeviceContext.Provider
      value={{
        // devices: p.devices,
        list: state.list,
        item: state.item,
        newDevice: () => {
          dispatch({ type: NEW_DEVICE, devices: p.devices });
        },
        getFirstSelection: () => {
          dispatch({
            type: SELECTED_DEVICE,
            devices: p.devices,
          });
        },
        put: (device: Device) => {
          dispatch({
            type: PUT_DEVICE,
            devices: p.devices,
            device: device,
          });
        },
        key: (device: Device) => {
          return p.devices.key(device);
        },
        removeSelected: () => {
          dispatch({
            type: REMOVE_SELECTED_DEVICES,
            devices: p.devices,
          });
        },
        toggle: (key: string) => {
          dispatch({
            type: TOGGLE_DEVICE,
            devices: p.devices,
            key: key,
          });
        },
      }}
    >
      {p.children}
    </DeviceContext.Provider>
  );
};

export default DeviceState;
