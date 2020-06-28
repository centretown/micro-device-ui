import React from "react";
import { IonList, IonItem, IonContent } from "@ionic/react";
import DeviceItem from "./DeviceItem";
import {
  DeviceStoreable,
  Device,
} from "micro-device-modules/lib/device";

export interface props {
  list: Device[];
  keyf: (device: Device) => string;
}

export const DeviceList: React.FC<props> = (d) => {
  const sortedList = () =>
    d.list.map((device) => {
      const deviceKey = d.keyf(device);
      return (
        <IonItem key={deviceKey} lines="full">
          <DeviceItem
            device={device}
            deviceKey={deviceKey}
          ></DeviceItem>
        </IonItem>
      );
    });
  return (
    <IonContent scrollY={true}>
      <IonList>{sortedList()}</IonList>
    </IonContent>
  );
};

export default DeviceList;
