import React, { useState } from "react";
import {
  IonLabel,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonList,
} from "@ionic/react";
import { Device, PinSelectable } from "micro-device-modules";
import PinUi from "./PinUi";
import PinState from "../context/PinState";
import FormHeading from "./FormHeading";
import { TextInputItem } from "./InputItem";

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

  return (
    <IonContent>
      <FormHeading
        title="Device"
        onSubmit={onSubmit}
        onClose={props.close}
      ></FormHeading>

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
          <TextInputItem
            type="text"
            label="Label"
            value={label}
            place="enter a label"
            set={setLabel}
          />
          <TextInputItem
            type="text"
            label="Model"
            value={model}
            place="the model type"
            set={setModel}
          />
          <TextInputItem
            type="url"
            label="URL"
            value={ip}
            place="URL/IP Address"
            set={setIP}
          />
        </IonList>
      )}
    </IonContent>
  );
};
export default DeviceForm;
