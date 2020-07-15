import React, { useContext } from "react";
import {
    IonCol,
    IonLabel,
} from "@ionic/react";

import { GlobalContext } from "../context/GlobalState";
import { Process } from "micro-device-modules";
import { ItemTemplate } from "./ItemTemplate";

interface processProps {
    process: Process;
}

export const ProcessItem: React.FC<processProps> = (p) => {
    const context = useContext(GlobalContext);
    const keyValue = context.process.select.key(p.process);
    return (
        <ItemTemplate
            keyValue={keyValue}
            toggle={context.process.select.toggle}
            toggled={context.process.select.isSelected(keyValue)}
        >

            <IonCol size="4">
                <IonLabel>{p.process.label}</IonLabel>
            </IonCol>
            <IonCol size="5">
                <IonLabel>{p.process.deviceKey}</IonLabel>
            </IonCol>
            <IonCol size="12">
                <IonLabel>{p.process.purpose}</IonLabel>
            </IonCol>
        </ItemTemplate>
    );
}

export default ProcessItem;