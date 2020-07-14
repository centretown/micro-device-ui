import React, { useState, useRef } from "react";
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
import { TextInputItem, SegmentItem } from "./InputItem";

export interface DeviceFormProps {
  device: Device;
  submit: (p: Device) => void;
  close: () => void;
}

const DeviceForm: React.FC<DeviceFormProps> = (p) => {

  const [label, setLabel] = useState(p.device.label);
  const [model, setModel] = useState(p.device.model);
  const [ip, setIP] = useState(p.device.ip);
  const pins = useRef(p.device.pins);
  const [segment, setSegment] = useState("basic");

  const onSubmit = () => {
    p.submit({
      ip: ip,
      model: model,
      label: label,
      pins: pins.current,
    });
  };

  return (
    <IonContent>
      <FormHeading
        title="Device"
        onSubmit={onSubmit}
        onClose={p.close}
      />
      <SegmentItem
        segment={segment}
        setSegment={setSegment}
        options={[
          { value: "basic", label: "Basic" },
          { value: "pins", label: "Pin Use" }
        ]} />

      {segment === "basic" && (
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
      {segment === "pins" && (
        <PinState pins={pins.current}>
          <PinUi />
        </PinState>
      )}
    </IonContent>
  );
};
export default DeviceForm;
