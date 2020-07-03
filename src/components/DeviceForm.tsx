import React, { useState } from "react";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonContent,
  IonButtons,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonToolbar,
  IonText,
  IonList,
} from "@ionic/react";
import { Device, PinSelectable } from "micro-device-modules";
import PinUi from "./PinUi";
import PinState from "../context/PinState";
import {
  checkmarkOutline,
  checkmarkSharp,
  closeOutline,
  closeSharp,
} from "ionicons/icons";

export interface DeviceFormProps {
  device: Device;
  submit: (p: Device) => void;
  close: () => void;
}

const DeviceForm: React.FC<DeviceFormProps> = (props) => {
  const localPins: PinSelectable = new PinSelectable();
  localPins.putList(props.device.pins.getAll());

  const [label, setLabel] = useState(props.device.label);
  const [model, setModel] = useState(props.device.model);
  const [ip, setIP] = useState(props.device.ip);
  const [segment, setSegment] = useState("device");

  const onSubmit = () => {
    props.device.pins.replace(localPins.sort());
    props.submit({
      ip: ip,
      model: model,
      label: label,
      pins: props.device.pins,
    });
  };

  const inputText = (
    label: string,
    val: string,
    place: string,
    setVal: (v: string) => void,
    type: "text" | "url"
  ) => {
    return (
      <IonItem>
        <IonLabel position="floating">{label}</IonLabel>
        <IonInput
          type={type}
          value={val}
          placeholder={place}
          onIonChange={(e) => setVal(e.detail.value!)}
        ></IonInput>
      </IonItem>
    );
  };

  return (
    <IonContent>
      <form>
        <IonToolbar className="ion-padding-start">
          <IonText
            className="ion-align-items-start"
            color="primary"
          >
            <h2>Device</h2>
          </IonText>
          <IonButtons
            className="ion-align-items-end"
            slot="primary"
          >
            <IonButton type="submit" onClick={onSubmit}>
              <IonIcon
                ios={checkmarkOutline}
                md={checkmarkSharp}
              />
            </IonButton>
            <IonButton onClick={props.close}>
              <IonIcon ios={closeOutline} md={closeSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonSegment
          className="ion-padding-horizontal"
          value={segment}
          onIonChange={(e) => setSegment(e.detail.value!)}
        >
          <IonSegmentButton value="device" color="white">
            <IonLabel>General</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="pins">
            <IonLabel>Pin Usage</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {segment === "pins" && (
          <PinState pins={localPins}>
            <PinUi />
          </PinState>
        )}
        {segment === "device" && (
          <IonList className="ion-padding-horizontal">
            {inputText(
              "Label",
              label,
              "enter a label",
              setLabel,
              "text"
            )}
            {inputText(
              "Model",
              model,
              "the model type",
              setModel,
              "text"
            )}
            {inputText(
              "URL",
              ip,
              "URL/IP Address",
              setIP,
              "url"
            )}
          </IonList>
        )}
      </form>
    </IonContent>
  );
};
export default DeviceForm;
