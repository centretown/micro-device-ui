import React, { useState } from "react";
import {
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonToolbar,
  IonContent,
  IonText,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import { Pin } from "micro-device-modules/lib/pin";
import {
  checkmarkOutline,
  checkmarkSharp,
  closeOutline,
  closeSharp,
} from "ionicons/icons";
// import { PinContext } from "../context/pin-context";

export interface PinFormProps {
  pin: Pin;
  submit: (p: Pin) => void;
  close: () => void;
}

const PinForm: React.FC<PinFormProps> = (props) => {
  //const context = useContext(PinContext);

  const [id, setId] = useState(props.pin.id);
  const [label, setLabel] = useState(props.pin.label);
  const [purpose, setPurpose] = useState(props.pin.purpose);
  const [digital, setDigital] = useState(props.pin.digital);

  const onSubmit = () => {
    props.submit({
      digital: digital,
      id: id,
      label: label,
      purpose: purpose,
    });
  };

  return (
    <IonContent>
      <IonToolbar className="ion-padding-start">
        <IonText
          className="ion-align-items-start"
          color="primary"
        >
          <h2>Pin</h2>
        </IonText>
        <IonButtons
          className="ion-align-items-end"
          slot="primary"
        >
          <IonButton onClick={onSubmit}>
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
      <IonGrid>
        <IonRow>
          <IonCol size="4">
            <IonItem>
              <IonLabel position="stacked">Pin ID</IonLabel>
              <IonInput
                value={id}
                type="number"
                placeholder="enter the device pin number"
                onIonChange={(e) => setId(+e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCol>
          <IonCol size="6">
            <IonItem>
              <IonLabel position="stacked">Signal</IonLabel>
              <IonSelect
                interface="popover"
                value={digital ? "digital" : "analog"}
                onIonChange={(e) => {
                  if (e.detail.value === "digital")
                    setDigital(true);
                  else setDigital(false);
                }}
              >
                <IonSelectOption value="digital">
                  Digital
                </IonSelectOption>
                <IonSelectOption value="analog">
                  Analog
                </IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonCol>
          <IonCol size="6">
            <IonItem>
              <IonLabel position="stacked">Label</IonLabel>
              <IonInput
                type="text"
                value={label}
                placeholder="enter a label for the pin"
                onIonChange={(e) => setLabel(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCol>
          <IonCol size="12">
            <IonItem>
              <IonLabel position="stacked">Purpose</IonLabel>
              <IonTextarea
                rows={2}
                value={purpose}
                placeholder="describe the pin's function"
                onIonChange={(e) => setPurpose(e.detail.value!)}
              ></IonTextarea>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
export default PinForm;
