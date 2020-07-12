import React, { useContext } from "react";
import {
    IonCol,
    IonLabel,
} from "@ionic/react";

import { ProcessContext } from "../context/ProcessState";
import { Process } from "micro-device-modules";
import { ItemTemplate } from "./ItemTemplate";

interface processProps {
    process: Process;
}

export const ProcessItem: React.FC<processProps> = (p) => {
    const context = useContext(ProcessContext);
    return (
        <ItemTemplate
            keyValue={context.select.key(p.process)}
            toggle={context.select.toggle}>

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