import React, { useContext } from "react";
import { IonList } from "@ionic/react";

import { ActionContext } from '../context/ActionState'
import { ActionItem } from "./ActionItem";

export const ActionList: React.FC = () => {
    const context = useContext(ActionContext);
    return (
        <IonList>
            {context.list.map((action) => (
                <ActionItem
                    key={context.select.key(action)} action={action} />
            ))}
        </IonList>
    );
};

export default ActionList;