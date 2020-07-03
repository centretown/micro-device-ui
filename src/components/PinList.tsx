import React from "react";
import { IonList } from "@ionic/react";
import PinItem from "./PinItem";
import { Pin } from "micro-device-modules";

export interface props {
  keyf(pin: Pin): string;
  list: Pin[];
}

export const PinList: React.FC<props> = (p) => {
  const sortedList = () =>
    p.list.map((pin) => {
      return <PinItem key={p.keyf(pin)} pin={pin} />;
    });
  return (
    <IonList className="ion-align-self-center">
      {sortedList()}
    </IonList>
  );
};
export default PinList;
