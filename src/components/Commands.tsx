import React from 'react';
import { InputItem, TextInputItem, SelectItem } from './InputItem';
import { IonInput } from '@ionic/react';
import { PinLookup } from './DeviceLookup';

interface delayCommandProps {
    duration: number,
    setDuration: (duration: number) => void,
}

export const DelaySnippet: React.FC<delayCommandProps> = (p) => {
    return (
        <InputItem label="Duration (ms)">
            <IonInput
                type="number"
                value={p.duration}
                placeholder="duration in milliseconds"
                onIonChange={(e) => p.setDuration(+e.detail.value!)}
            />
        </InputItem>
    )
}

interface modeCommandProps {
    deviceKey: string;
    id: number,
    signal: string,
    mode: string,
    setId: (id: number) => void;
    setSignal: (signal: string) => void;
    setMode: (mode: string) => void;
}

export const ModeSnippet: React.FC<modeCommandProps> = (p) => {
    return (<>
        <PinLookup
            deviceKey={p.deviceKey}
            label="Pin"
            value={p.id.toString()}
            setValue={p.setId}
        />
        <SelectItem
            label="Signal"
            value={p.signal}
            setValue={p.setSignal}
            options={[
                { label: "Analog", value: "analog" },
                { label: "Digital", value: "digital" },
            ]}
        />
        <SelectItem
            label="Mode"
            value={p.mode}
            setValue={p.setMode}
            options={[
                { label: "Input", value: "input" },
                { label: "Output", value: "output" },
            ]}
        />
    </>)
}

interface pinCommandProps {
    deviceKey: string,
    id: number,
    signal: string,
    mode: string,
    value: number,
    setId: (id: number) => void;
    setSignal: (signal: string) => void;
    setMode: (mode: string) => void;
    setValue: (value: number) => void;
}

export const PinSnippet: React.FC<pinCommandProps> = (p) => {
    return (<>
        <PinLookup
            deviceKey={p.deviceKey}
            label="Pin"
            value={p.id.toString()}
            setValue={p.setId}
        />
        <SelectItem
            label="Signal"
            value={p.signal}
            setValue={p.setSignal}
            options={[
                { label: "Analog", value: "analog" },
                { label: "Digital", value: "digital" },
            ]}
        />
        <SelectItem
            label="Mode"
            value={p.mode}
            setValue={p.setMode}
            options={[
                { label: "Input", value: "input" },
                { label: "Output", value: "output" },
            ]}
        />
        <InputItem label="Pin Value">
            <IonInput
                type="number"
                value={p.value}
                placeholder="pin value"
                onIonChange={(e) => p.setValue(+e.detail.value!)}
            />
        </InputItem>
    </>)
}