import React, { useState } from "react";
import {
  IonInput,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonTextarea,
} from "@ionic/react";
import { Pin } from "micro-device-modules/lib/pin";
import FormHeading from "./FormHeading";
import { TextInputItem, InputItem } from "./InputItem";

export interface PinFormProps {
  pin: Pin;
  submit: (p: Pin) => void;
  close: () => void;
}

const PinForm: React.FC<PinFormProps> = (props) => {
  const [id, setId] = useState(props.pin.id);
  const [label, setLabel] = useState(props.pin.label);
  const [purpose, setPurpose] = useState(props.pin.purpose);

  const onSubmit = () => {
    props.submit({
      id: id,
      label: label,
      purpose: purpose,
    });
  };

  return (
    <IonContent>
      <FormHeading
        title="Pin"
        onSubmit={onSubmit}
        onClose={props.close}
      />
      <IonGrid>
        <IonRow>
          <IonCol size="4">
            <InputItem label="Pin #">
              <IonInput
                value={id}
                type="number"
                placeholder="enter the device pin number"
                onIonChange={(e) => setId(+e.detail.value!)}
              />
            </InputItem>
          </IonCol>
          <IonCol size="6">
            <TextInputItem
              type="text"
              label="Label"
              value={label}
              place="label the pin"
              set={setLabel}
            />
          </IonCol>
          <IonCol size="12">
            <InputItem label="Purpose">
              <IonTextarea
                rows={2}
                value={purpose}
                placeholder="describe the pin's function"
                onIonChange={(e) => setPurpose(e.detail.value!)}
              />
            </InputItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
export default PinForm;
