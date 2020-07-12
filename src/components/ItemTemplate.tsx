import React from "react";
import {
    IonGrid,
    IonRow,
    IonCheckbox,
    IonItem,
} from "@ionic/react";

interface itemProps {
    keyValue: string;
    toggle: (key: string) => void;
    children: JSX.Element | JSX.Element[];
}

export const ItemTemplate: React.FC<itemProps> = (p) => {
    return (
        < IonItem lines="full" >
            <IonGrid>
                <IonRow className="ion-align-items-center">
                    <IonCheckbox
                        className="ion-margin-end"
                        onIonChange={() => p.toggle(p.keyValue)}
                    />
                    {p.children}
                </IonRow>
            </IonGrid>
        </IonItem>
    );
};