import React, { useState, useEffect, useRef } from "react";
import { IonModal } from "@ionic/react";

import {
  Device,
  DeviceStoreable,
} from "micro-device-modules/lib/device";
import { PinSelectable } from "micro-device-modules/lib/pin";
import DeviceList from "./DeviceList";
import EditMenu from "./EditMenu";
import DeviceForm from "./DeviceForm";

const newDevice: Device = {
  ip: "",
  label: "",
  model: "",
  pins: new PinSelectable(),
};

const protoToggle = (k: string) => false;
export const ToggleContext = React.createContext(protoToggle);
export interface props {
  devices: DeviceStoreable;
}

const DeviceUi: React.FC = () => {
  const devices = useRef(new DeviceStoreable());
  const [modal, setModal] = useState(false);
  const deviceRef = useRef<Device>(newDevice);
  const [list, setList] = useState<Device[]>([]);

  useEffect(() => {
    devices.current.load();
    setList(devices.current.sort());
  }, []);

  useEffect(() => {
    devices.current.save();
  }, [list]);

  const addClicked = () => {
    setModal(true);
  };

  const editClicked = () => {
    setModal(true);
  };

  const removeClicked = () => {
    devices.current.removeSelected();
  };

  const close = () => {
    setModal(false);
  };

  const submit = (d: Device) => {
    close();
    devices.current.put(d);
    setList(devices.current.sort());
  };

  const toggle = (key: string) => {
    return devices.current.toggleSelect(key);
  };

  return (
    <ToggleContext.Provider value={toggle}>
      <IonModal
        isOpen={modal}
        swipeToClose={true}
        onDidDismiss={() => close()}
      >
        <DeviceForm
          device={deviceRef.current}
          close={close}
          submit={submit}
        />
      </IonModal>

      <EditMenu
        add={addClicked}
        remove={removeClicked}
        edit={editClicked}
      />
      <DeviceList keyf={devices.current.key} list={list} />
    </ToggleContext.Provider>
  );
};
export default DeviceUi;
