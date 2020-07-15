import React, { useContext } from "react";
import { Device } from "micro-device-modules/lib/device";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonCheckbox,
  IonItem,
} from "@ionic/react";

import { GlobalContext } from "../context/GlobalState";
import { ItemTemplate } from "./ItemTemplate";

interface deviceProps {
  device: Device;
}

const DeviceItem: React.FC<deviceProps> = (d) => {
  const context = useContext(GlobalContext);
  const keyValue = context.device.select.key(d.device);
  return (
    <ItemTemplate
      keyValue={keyValue}
      toggle={context.device.select.toggle}
      toggled={context.device.select.isSelected(keyValue)}
    >
      <IonCol size="4">
        <IonLabel>{d.device.label}</IonLabel>
      </IonCol>
      <IonCol size="5">
        <IonLabel>{d.device.model}</IonLabel>
      </IonCol>
      <IonCol size="12">
        <IonLabel>{d.device.ip}</IonLabel>
      </IonCol>
    </ItemTemplate>
  );
};

export default DeviceItem;
