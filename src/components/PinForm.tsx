import React, { useState } from "react";
import {
    IonItem,
    IonLabel,
    IonInput,
    IonToggle,
    IonCard,
    IonCardContent,
    IonButton,
    IonButtons,
    IonToolbar,
    IonCardHeader,
    IonCardTitle,
} from "@ionic/react";
import { Pin, signalText } from "micro-device-modules/lib/pin";

export interface PinFormProps {
    pin: Pin;
    submit: (p: Pin) => void;
    close: () => void;
}

const PinForm: React.FC<PinFormProps> = (props) => {
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
        <IonCard>
            <IonCardHeader color="primary">
                <IonCardTitle>Pin</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonItem>
                    <IonLabel position="stacked">Signal Type</IonLabel>
                    <IonLabel position="stacked" color={"primary"}>
                        {signalText(digital)}
                    </IonLabel>
                    <IonToggle
                        checked={digital}
                        onIonChange={(e) => setDigital(e.detail.checked)}
                    ></IonToggle>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Pin Number</IonLabel>
                    <IonInput
                        value={id}
                        type="number"
                        placeholder="enter the device pin number"
                        onIonChange={(e) => setId(+e.detail.value!)}
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Label</IonLabel>
                    <IonInput
                        type="text"
                        value={label}
                        placeholder="enter a label for the pin"
                        onIonChange={(e) => setLabel(e.detail.value!)}
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Purpose</IonLabel>
                    <IonInput
                        type="text"
                        value={purpose}
                        placeholder="describe the pin's function"
                        onIonChange={(e) => setPurpose(e.detail.value!)}
                    ></IonInput>
                </IonItem>
                <IonToolbar>
                    <IonButtons slot="end">
                        <IonButton
                            type="button"
                            color="primary"
                            onClick={props.close}
                        >Cancel</IonButton>
                        <IonButton
                            type="button"
                            color="primary"
                            onClick={onSubmit}
                        >Submit</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonCardContent>
        </IonCard>
    );
};
export default PinForm;
