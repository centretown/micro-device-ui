import React, { useContext } from "react";
import { IonList } from "@ionic/react";
import DeviceItem from "./DeviceItem";
import DeviceContext from "../context/device-context";

export const DeviceList: React.FC = () => {
  const context = useContext(DeviceContext);
  return (
    <IonList>
      {context.list.map((device) => (
        <DeviceItem key={context.key(device)} device={device} />
      ))}
    </IonList>
  );
};

export default DeviceList;
