import React, { useState } from "react";
import { IonContent, IonSegment, IonSegmentButton, IonLabel, IonList, IonTextarea } from "@ionic/react";
import FormHeading from "./FormHeading";
import { TextInputItem, InputItem } from "./InputItem";
import { Process, ActionSelectable } from "micro-device-modules";
import { ActionState } from "../context/ActionState";
import { ActionUi } from "./ActionUi";

interface ProcessFormProps {
    process: Process;
    submit: (p: Process) => void;
    close: () => void;
}

export const ProcessForm: React.FC<ProcessFormProps> = (p) => {

    const setupActions: ActionSelectable = new ActionSelectable();
    setupActions.putList(p.process.setup.getAll());
    const loopActions: ActionSelectable = new ActionSelectable();
    loopActions.putList(p.process.loop.getAll());

    const [deviceKey, setDeviceKey] = useState(p.process.deviceKey);
    const [label, setLabel] = useState(p.process.label);
    const [purpose, setPurpose] = useState(p.process.purpose);

    const [segment, setSegment] = useState("basic");

    const onSubmit = () => {
        p.process.setup.replace(setupActions.sort());
        p.process.loop.replace(loopActions.sort());
        p.submit({
            deviceKey: deviceKey,
            label: label,
            purpose: purpose,
            setup: p.process.setup,
            loop: p.process.loop,
        });
    }
    return (
        <IonContent>
            <FormHeading
                title="Process"
                onSubmit={onSubmit}
                onClose={p.close}
            ></FormHeading>
            <IonSegment
                className="ion-padding-horizontal"
                value={segment}
                onIonChange={(e) => setSegment(e.detail.value!)}
            >
                <IonSegmentButton value="basic" color="white">
                    <IonLabel>Basic</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="setup">
                    <IonLabel>Setup</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="loop">
                    <IonLabel>Loop</IonLabel>
                </IonSegmentButton>
            </IonSegment>
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
                        label="Device"
                        value={deviceKey}
                        place="the model type"
                        set={setDeviceKey}
                    />
                    <InputItem label="Purpose">
                        <IonTextarea
                            rows={2}
                            value={purpose}
                            placeholder="describe the process goals."
                            onIonChange={(e) => setPurpose(e.detail.value!)}
                        />
                    </InputItem>
                </IonList>
            )}
            {segment === "setup" && (
                <ActionState actions={setupActions}>
                    <ActionUi />
                </ActionState>
            )}
            {segment === "loop" && (
                <ActionState actions={loopActions}>
                    <ActionUi />
                </ActionState>
            )}
        </IonContent>
    );
}