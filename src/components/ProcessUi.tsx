import React, { useState, useContext } from "react";
import { Process } from "micro-device-modules";
import { GlobalContext } from "../context/GlobalState";
import { itemUi } from "./item-ui";
import EditMenu from "./EditMenu";
import { IonModal } from "@ionic/react";
import { ProcessForm } from "./ProcessForm";
import ProcessList from "./ProcessList";

export const ProcessUi: React.FC = () => {
    const [modal, setModal] = useState(false);
    const context = useContext(GlobalContext);
    const p = itemUi<Process>(context.process, setModal);

    return (<>
        <IonModal
            isOpen={modal}
            swipeToClose={true}
            onDidDismiss={() => p.close()}
        >
            <ProcessForm
                process={context.process.item}
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