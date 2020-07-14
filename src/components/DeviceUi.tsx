import React, { useState, useContext } from "react";
import { IonModal } from "@ionic/react";

import { Device } from "micro-device-modules";
import DeviceList from "./DeviceList";
import EditMenu from "./EditMenu";
import DeviceForm from "./DeviceForm";
import { GlobalContext } from "../context/GlobalState";
import { itemUi } from "./item-ui";

export const DeviceUi: React.FC = () => {
  const context = useContext(GlobalContext);
  const [modal, setModal] = useState(false);
  const p = itemUi<Device>(context.device, setModal);
  return (
    <>
      <IonModal
        isOpen={modal}
        swipeToClose={true}
        onDidDismiss={() => p.close()}
      >
        <DeviceForm
          device={context.device.item}
          close={() => p.close()}
          submit={p.submit}
        />
      </IonModal>

      <EditMenu
        add={p.addClicked}
        remove={p.removeClicked}
        edit={p.editClicked}
        vertical="bottom"
        horizontal="end"
      />
      <DeviceList />
    </>
  );
};
export default DeviceUi;
