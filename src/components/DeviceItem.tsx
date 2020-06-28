import React, { useContext } from "react";
import { Device } from "micro-device-modules/lib/device";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonCheckbox,
} from "@ionic/react";

import { ToggleContext } from "./DeviceUi";

interface deviceProps {
  device: Device;
  deviceKey: string;
}

const DeviceItem: React.FC<deviceProps> = (d) => {
  const toggle = useContext(ToggleContext);

  const onToggle = () => {
    toggle(d.deviceKey);
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonCheckbox onIonChange={() => onToggle()} />
        </IonCol>
        <IonCol>
          <IonLabel>{d.device.label}</IonLabel>
        </IonCol>
        <IonCol>
          <IonLabel>{d.device.model}</IonLabel>
        </IonCol>
        <IonCol>
          <IonLabel>{d.device.ip}</IonLabel>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default DeviceItem;
