import React, { useState, useContext } from "react";
import { ProcessContext } from "../context/ProcessState";
import { itemUi } from "./item-ui";
import { Process } from "micro-device-modules";
import EditMenu from "./EditMenu";
import { IonModal } from "@ionic/react";
import { ProcessForm } from "./ProcessForm";
import ProcessList from "./ProcessList";

export const ProcessUi: React.FC = () => {
    const [modal, setModal] = useState(false);
    const context = useContext(ProcessContext);
    const p = itemUi<Process>(context, setModal);

    return (<>
        <IonModal
            isOpen={modal}
            swipeToClose={true}
            onDidDismiss={() => p.close()}
        >
            <ProcessForm
                process={context.item}
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
        <ProcessList />
    </>)
}