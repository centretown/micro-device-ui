import React, { useState, useEffect } from "react";
import { IonContent, IonLabel, IonList, IonTextarea, IonInput, IonSelect, IonSelectOption, IonItem } from "@ionic/react";
import FormHeading from "./FormHeading";
import { TextInputItem, InputItem, SelectItem } from "./InputItem";

import {
    Action,
    DELAY_COMMAND,
    PIN_COMMAND,
    MODE_COMMAND,
    pinAction,
    modeAction,
    delayAction,
    DIGITAL_HIGH,
    DIGITAL_LOW,
    ANALOG_HIGH,
    ANALOG_LOW,
    DelayCommand,
    PinCommand,
    ModeCommand,
} from 'micro-device-modules';
import { DelaySnippet, ModeSnippet, PinSnippet } from "./Commands";


interface ActionFormProps {
    deviceKey: string,
    action: Action;
    submit: (p: Action) => void;
    close: () => void;
}

export const ActionForm: React.FC<ActionFormProps> = (p) => {
    const [sequence, setSequence] = useState(p.action.sequence);
    const [type, setType] = useState(p.action.type);

    const [id, setId] = useState(0);
    const [signal, setSignal] = useState("");
    const [mode, setMode] = useState("");
    const [value, setValue] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        switch (p.action.type) {
            case DELAY_COMMAND:
                const delayCmd = p.action.command as DelayCommand;
                setDuration(delayCmd.duration);
                break;
            case PIN_COMMAND:
                const pinCmd = p.action.command as PinCommand;
                setId(pinCmd.id);
                setSignal(pinCmd.signal);
                setMode(pinCmd.mode);
                setValue(pinCmd.value);
                break;
            case MODE_COMMAND:
                const modeCmd = p.action.command as ModeCommand;
                setId(modeCmd.id);
                setSignal(modeCmd.signal);
                setMode(modeCmd.mode);
                break;
        }
    }, [p])

    const onSubmit = () => {
        let newAction = {} as Action;
        switch (type) {
            case DELAY_COMMAND:
                newAction = delayAction(sequence, duration);
                break;
            case PIN_COMMAND:
                newAction = pinAction(sequence, id, signal, mode, value);
                break;
            case MODE_COMMAND:
                newAction = modeAction(sequence, id, signal, mode);
                break;
            default:
                break;
        }
        p.submit(newAction);
    }
    return (
        <IonContent>
            <FormHeading
                title="Action"
                onSubmit={onSubmit}
                onClose={p.close}
            ></FormHeading>
            <IonList className="ion-padding-horizontal">
                <InputItem label="Sequence">
                    <IonInput
                        type="number"
                        value={sequence}
                        placeholder="sequence"
                        onIonChange={(e) => setSequence(+e.detail.value!)}
                    />
                </InputItem>
                <SelectItem
                    label="Type"
                    value={type}
                    setValue={setType}
                    options={[
                        { label: "Delay", value: DELAY_COMMAND },
                        { label: "Pin I/O", value: PIN_COMMAND },
                        { label: "Pin Mode", value: MODE_COMMAND },
                    ]}
                />
                {type === DELAY_COMMAND &&
                    <DelaySnippet
                        duration={duration}
                        setDuration={setDuration}
                    />}
                {type === MODE_COMMAND &&
                    <ModeSnippet
                        deviceKey={p.deviceKey}
                        id={id}
                        signal={signal}
                        mode={mode}
                        setId={setId}
                        setSignal={setSignal}
                        setMode={setMode}
                    />}
                {type === PIN_COMMAND &&
                    <PinSnippet
                        deviceKey={p.deviceKey}
                        id={id}
                        signal={signal}
                        mode={mode}
                        value={value}
                        setId={setId}
                        setSignal={setSignal}
                        setMode={setMode}
                        setValue={setValue}
                    />}
            </IonList>
        </IonContent >
    );
};