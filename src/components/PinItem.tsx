import React, { useContext } from "react";

import {
    IonLabel,
    IonCheckbox,
    IonCol,
    IonGrid,
    IonNote,
} from "@ionic/react";

import { Pin, pinKey, signalText } from "micro-device-modules/lib/pin";

import { ToggleContext } from "./PinUi"

interface pinProps {
    pin: Pin;
}

const PinItem: React.FC<pinProps> = (p) => {
    const toggle = useContext(ToggleContext);

    const onToggle = () => {
        // console.log("toggle Pin");
        toggle(pinKey(p.pin));
    };

    return (
        <>
            <IonGrid slot="start">
                <IonCol>
                    <IonLabel position="stacked" color="primary">
                        {signalText(p.pin.digital)}: {p.pin.id}
                    </IonLabel>
                    <IonCheckbox
                        // checked={p.selected}
                        onIonChange={() => onToggle()}
                    />
                </IonCol>
            </IonGrid>
            <IonGrid slot="start">
                <IonCol>
                    <IonLabel position="stacked" color="primary">
                        {p.pin.label}
                    </IonLabel>
                    <IonNote>{p.pin.purpose}</IonNote>
                </IonCol>
            </IonGrid>
        </>
    );
};
export default PinItem;
