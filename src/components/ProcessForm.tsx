import React, { useState, useRef } from "react";
import { IonContent, IonList, IonTextarea } from "@ionic/react";
import { Process, ActionSelectable } from "micro-device-modules";

import FormHeading from "./FormHeading";
import { TextInputItem, InputItem, SegmentItem } from "./InputItem";
import { ActionState } from "../context/ActionState";
import { ActionUi } from "./ActionUi";
import { DeviceLookup } from "./DeviceLookup";

interface ProcessFormProps {
    process: Process;
    submit: (p: Process) => void;
    close: () => void;
}

export const ProcessForm: React.FC<ProcessFormProps> = (p) => {

    const [deviceKey, setDeviceKey] = useState(p.process.deviceKey);
    const [label, setLabel] = useState(p.process.label);
    const [purpose, setPurpose] = useState(p.process.purpose);
    const setup = useRef(p.process.setup);
    const loop = useRef(p.process.loop);

    const [segment, setSegment] = useState("basic");

    const onSubmit = () => {
        console.log(setup.current);
        const process: Process = {
            deviceKey: deviceKey,
            label: label,
            purpose: purpose,
            setup: new ActionSelectable(),
            loop: new ActionSelectable(),
        }
        process.setup.replace(setup.current.getAll());
        process.loop.replace(loop.current.getAll());
        console.log(process);
        p.submit(process);
    }
    return (
        <IonContent>
            <FormHeading
                title="Process"
                onSubmit={onSubmit}
                onClose={p.close}
            />
            <SegmentItem
                segment={segment}
                setSegment={setSegment}
                options={[
                    { value: "basic", label: "Basic" },
                    { value: "setup", label: "Setup" },
                    { value: "loop", label: "Loop" },
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
                    <DeviceLookup
                        label="Device"
                        value={deviceKey}
                        setValue={setDeviceKey}
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
                <ActionState actions={setup.current}>
                    <ActionUi deviceKey={deviceKey} />
                </ActionState>
            )}
            {segment === "loop" && (
                <ActionState actions={loop.current}>
                    <ActionUi deviceKey={deviceKey} />
                </ActionState>
            )}
        </IonContent>
    );
}