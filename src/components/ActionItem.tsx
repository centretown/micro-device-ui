import React, { useContext } from "react";
import {
    IonCol,
    IonLabel,
} from "@ionic/react";
import { Action, PIN_COMMAND, MODE_COMMAND, DELAY_COMMAND, DelayCommand, ModeCommand, PinCommand } from "micro-device-modules";
import { ActionContext } from "../context/ActionState";
import { ItemTemplate } from "./ItemTemplate";

interface actionProps {
    action: Action;
}

export const ActionItem: React.FC<actionProps> = (p) => {
    const context = useContext(ActionContext);
    const cmd = p.action.command;
    let actionText = ""
    switch (p.action.type) {
        case DELAY_COMMAND:
            const dc = cmd as DelayCommand;
            actionText =
                `delay for ${dc.duration} ms`;
            break;
        case MODE_COMMAND:
            const mc = cmd as ModeCommand;
            actionText =
                `prepare pin ${mc.id} for ${mc.signal}/${mc.mode}`;
            break;
        case PIN_COMMAND:
            const pc = cmd as PinCommand;
            if (pc.mode === 'output') {
                actionText =
                    `set pin ${pc.id} to ${pc.signal} ${pc.value}`;
            } else if (pc.mode === 'input') {
                actionText =
                    `get ${pc.signal} value from pin ${pc.id}`;
            }
            break;
    }
    const keyValue = context.select.key(p.action);
    return (
        <ItemTemplate
            keyValue={keyValue}
            toggle={context.select.toggle}
            toggled={context.select.isSelected(keyValue)}
        >

            <IonCol size="4">
                <IonLabel>{p.action.sequence}</IonLabel>
            </IonCol>
            <IonCol size="5">
                <IonLabel>{p.action.type}</IonLabel>
            </IonCol>
            <IonCol size="12">
                <IonLabel>{actionText}</IonLabel>
            </IonCol>
        </ItemTemplate>
    );
};
