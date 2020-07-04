import React from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";

interface props {
  type: "text" | "url";
  label: string;
  value: string;
  place: string;
  set: (v: string) => void;
}
export const TextInputItem: React.FC<props> = (p) => {
  return (
    <InputItem label={p.label}>
      <IonInput
        type={p.type}
        value={p.value}
        placeholder={p.place}
        onIonChange={(e) => p.set(e.detail.value!)}
      />
    </InputItem>
  );
};

interface inputProps {
  label: string;
  children: JSX.Element | JSX.Element[];
}

export const InputItem: React.FC<inputProps> = (p) => {
  return (
    <IonItem>
      <IonLabel position="floating">{p.label}</IonLabel>
      {p.children}
    </IonItem>
  );
};

interface props {}
