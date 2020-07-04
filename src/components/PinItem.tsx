import React, { useContext } from "react";

import {
  IonLabel,
  IonCheckbox,
  IonCol,
  IonGrid,
  IonNote,
  IonRow,
  IonItem,
} from "@ionic/react";

import { Pin } from "micro-device-modules";

import { PinContext } from "../context/pin-context";

interface pinProps {
  pin: Pin;
}

const PinItem: React.FC<pinProps> = (p) => {
  const context = useContext(PinContext);
  return (
    <IonItem lines="full">
      <IonGrid fixed>
        <IonRow className="ion-align-items-center">
          <IonCheckbox
            onIonChange={() =>
              context.toggle(context.key(p.pin))
            }
          />
          <IonCol size="2" className="ion-padding-start">
            <IonLabel>Id: {p.pin.id}</IonLabel>
          </IonCol>
          <IonCol size="3">
            <IonLabel>
              {p.pin.digital ? "digital" : "analog"}
            </IonLabel>
          </IonCol>
          <IonCol size="5">
            <IonLabel>{p.pin.label}</IonLabel>
          </IonCol>
          <IonCol size="12">
            <IonNote>{p.pin.purpose}</IonNote>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};
export default PinItem;
