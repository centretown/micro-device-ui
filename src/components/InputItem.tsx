import React from "react";
import { IonItem, IonLabel, IonInput, IonSelectOption, IonSelect } from "@ionic/react";

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

interface selectProps {
  label: string,
  options: { label: string, value: string }[],
  value: string,
  setValue: (value: any) => void;
}
export const SelectItem: React.FC<selectProps> = (p) => {
  return (
    <InputItem label={p.label}>
      <IonSelect
        interface="popover"
        value={p.value}
        onIonChange={(e) => p.setValue(e.detail.value)}
      >
        {p.options.map((o) => {
          return (
            <IonSelectOption key={o.value} value={o.value}>
              {o.label}
            </IonSelectOption>);
        })}
      </IonSelect>
    </InputItem>
  );
};
