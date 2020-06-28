import React, { useState, useRef } from "react";
import {
  IonCardTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonToolbar,
  IonButtons,
  IonButton,
  IonList,
  IonListHeader,
  IonContent,
} from "@ionic/react";
import { Device } from "micro-device-modules/lib/device";
import PinUi from "./PinUi";

export interface DeviceFormProps {
  device: Device;
  submit: (p: Device) => void;
  close: () => void;
}
const DeviceForm: React.FC<DeviceFormProps> = (props) => {
  const [label, setLabel] = useState(props.device.label);
  const [model, setModel] = useState(props.device.model);
  const [ip, setIP] = useState(props.device.ip);
  const pins = useRef(props.device.pins);

  const onSubmit = () => {
    props.submit({
      ip: ip,
      model: model,
      label: label,
      pins: pins.current,
    });
  };

  return (
    <IonContent>
      <IonList>
        <IonListHeader color="primary">
          <IonCardTitle>Device</IonCardTitle>
        </IonListHeader>
        <IonItem>
          <IonLabel position="stacked">Label</IonLabel>
          <IonInput
            type="text"
            value={label}
            placeholder="enter a label for the device"
            onIonChange={(e) => setLabel(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Model</IonLabel>
          <IonInput
            type="text"
            value={model}
            placeholder="enter a model for the device"
            onIonChange={(e) => setModel(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">IP address</IonLabel>
          <IonInput
            type="text"
            value={ip}
            placeholder="enter an IP address for the device"
            onIonChange={(e) => setIP(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton
              type="button"
              color="primary"
              onClick={props.close}
            >
              Cancel
            </IonButton>
            <IonButton
              type="button"
              color="primary"
              onClick={onSubmit}
            >
              Submit
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <PinUi pins={pins.current}></PinUi>
      </IonList>
    </IonContent>
  );
};
export default DeviceForm;
