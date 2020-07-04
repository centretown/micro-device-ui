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

import { DeviceContext } from "../context/device-context";

interface deviceProps {
  device: Device;
}

const DeviceItem: React.FC<deviceProps> = (d) => {
  const context = useContext(DeviceContext);
  return (
    <IonItem lines="full">
      <IonGrid>
        <IonRow className="ion-align-items-center">
          <IonCheckbox
            onIonChange={() =>
              context.toggle(context.key(d.device))
            }
          />
          <IonCol size="6" sizeSm="6" push=".1">
            <IonLabel>{d.device.label}</IonLabel>
          </IonCol>
          <IonCol sizeSm="6" push=".1">
            <IonLabel>{d.device.model}</IonLabel>
          </IonCol>
          <IonCol sizeSm="12">
            <IonLabel>{d.device.ip}</IonLabel>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default DeviceItem;
