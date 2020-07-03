import React from "react";
import { IonList } from "@ionic/react";
import DeviceItem from "./DeviceItem";
import { Device } from "micro-device-modules";

export interface props {
  keyf: (device: Device) => string;
  list: Device[];
}

export const DeviceList: React.FC<props> = (d) => {
  const sortedList = () =>
    d.list.map((device) => {
      return (
        <DeviceItem key={d.keyf(device)} device={device} />
      );
    });
  return <IonList>{sortedList()}</IonList>;
};

export default DeviceList;
