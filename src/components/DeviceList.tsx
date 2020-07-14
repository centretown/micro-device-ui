import React, { useContext } from "react";
import { IonList } from "@ionic/react";
import DeviceItem from "./DeviceItem";
import { GlobalContext } from "../context/GlobalState";

export const DeviceList: React.FC = () => {
  const context = useContext(GlobalContext);
  return (
    <IonList>
      {context.device.list.map((device) => (
        <DeviceItem key={context.device.select.key(device)} device={device} />
      ))}
    </IonList>
  );
};

export default DeviceList;
