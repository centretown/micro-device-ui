import React from "react";
import { IonList, IonItem, IonContent } from "@ionic/react";
import PinItem from "./PinItem";
import { Pin } from "micro-device-modules/lib/pin";

export interface props {
  keyf(pin: Pin): string;
  list: Pin[];
}

export const PinList: React.FC<props> = (p) => {
  const sortedList = () =>
    p.list.map((pin) => {
      return (
        <IonItem key={p.keyf(pin)} lines="full">
          <PinItem pin={pin}></PinItem>
        </IonItem>
      );
    });
  return (
    <IonContent scrollY={true}>
      <IonList>{sortedList()}</IonList>
    </IonContent>
  );
};
export default PinList;
