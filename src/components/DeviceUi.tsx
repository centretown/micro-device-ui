import React, { useState, useContext } from "react";
import { IonModal } from "@ionic/react";
import {
  hardwareChipOutline,
  hardwareChipSharp,
} from "ionicons/icons";

import { Device } from "micro-device-modules";
import DeviceList from "./DeviceList";
import EditMenu from "./EditMenu";
import DeviceForm from "./DeviceForm";
import { DeviceContext } from "../context/device-context";

export const DeviceUi: React.FC = () => {
  const context = useContext(DeviceContext);
  const [modal, setModal] = useState(false);

  const addClicked = () => {
    context.newDevice();
    setModal(true);
  };

  const editClicked = () => {
    context.getFirstSelection();
    setModal(true);
  };

  const removeClicked = () => {
    context.removeSelected();
  };

  const close = () => {
    setModal(false);
  };

  const submit = (d: Device) => {
    close();
    context.put(d);
  };

  return (
    <>
      <IonModal
        isOpen={modal}
        swipeToClose={true}
        onDidDismiss={() => close()}
      >
        <DeviceForm
          device={context.item}
          close={() => close()}
          submit={submit}
        />
      </IonModal>

      <EditMenu
        add={addClicked}
        remove={removeClicked}
        edit={editClicked}
        vertical="bottom"
        horizontal="end"
      />
      <DeviceList></DeviceList>
    </>
  );
};
export default DeviceUi;
