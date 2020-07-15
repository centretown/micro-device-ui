import React, { useContext } from "react";

import {
  IonLabel,
  IonCol,
  IonNote,
} from "@ionic/react";

import { Pin } from "micro-device-modules";

import { PinContext } from "../context/PinState";
import { ItemTemplate } from "./ItemTemplate";

interface pinProps {
  pin: Pin;
}

const PinItem: React.FC<pinProps> = (p) => {
  const context = useContext(PinContext);
  const keyValue = context.select.key(p.pin);
  return (
    <ItemTemplate
      keyValue={keyValue}
      toggle={context.select.toggle}
      toggled={context.select.isSelected(keyValue)}
    >
      <IonCol size="2" className="ion-padding-start">
        <IonLabel>Id: {p.pin.id}</IonLabel>
      </IonCol>
      <IonCol size="5">
        <IonLabel>{p.pin.label}</IonLabel>
      </IonCol>
      <IonCol size="12">
        <IonNote>{p.pin.purpose}</IonNote>
      </IonCol>
    </ItemTemplate>
  );
};
export default PinItem;
