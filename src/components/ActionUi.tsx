import React, { useState, useContext } from "react";

import { ActionContext } from '../context/ActionState';
import { itemUi } from "./item-ui";
import EditMenu from "./EditMenu";
import { IonModal } from "@ionic/react";
import { Action } from "micro-device-modules";
import ActionList from "./ActionList";
import { ActionForm } from "./ActionForm";

export const ActionUi: React.FC = () => {
    const [modal, setModal] = useState(false);
    const context = useContext(ActionContext);
    const p = itemUi<Action>(context, setModal);

    return (<>
        <IonModal
            isOpen={modal}
            swipeToClose={true}
            onDidDismiss={() => p.close()}
        >
            <ActionForm
                action={context.item}
                close={() => p.close()}
                submit={p.submit}
            />
        </IonModal>
        <EditMenu
            add={p.addClicked}
            remove={p.removeClicked}
            edit={p.editClicked}
            vertical="bottom"
            horizontal="end"
        />
        <ActionList />
    </>);
}