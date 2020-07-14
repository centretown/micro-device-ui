import React, { useContext } from "react";
import { IonList } from "@ionic/react";

import ProcessItem from "./ProcessItem";
import { GlobalContext } from "../context/GlobalState";

export const ProcessList: React.FC = () => {
    const context = useContext(GlobalContext);
    return (
        <IonList>
            {context.process.list.map((process) => (
                <ProcessItem
                    key={context.process.select.key(process)} process={process} />
            ))}
        </IonList>
    );
};

export default ProcessList;