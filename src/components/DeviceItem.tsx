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

interface deviceProps {
  device: Device;
}

const DeviceItem: React.FC<deviceProps> = (d) => {
  const context = useContext(GlobalContext);
  return (
    <IonItem lines="full">
      <IonGrid>
        <IonRow className="ion-align-items-center">
          <IonCheckbox
            className="ion-margin-end"
            onIonChange={() =>
              context.device.select.toggle(context.device.select.key(d.device))
            }
          />
          <IonCol size="4">
            <IonLabel>{d.device.label}</IonLabel>
          </IonCol>
          <IonCol size="5">
            <IonLabel>{d.device.model}</IonLabel>
          </IonCol>
          <IonCol size="12">
            <IonLabel>{d.device.ip}</IonLabel>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default DeviceItem;
