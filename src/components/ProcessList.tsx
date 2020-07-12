import React, { useContext } from "react";
import { IonList } from "@ionic/react";

import ProcessItem from "./ProcessItem";
import { ProcessContext } from "../context/ProcessState";

export const ProcessList: React.FC = () => {
    const context = useContext(ProcessContext);
    return (
        <IonList>
            {context.list.map((process) => (
                <ProcessItem
                    key={context.select.key(process)} process={process} />
            ))}
        </IonList>
    );
};

export default ProcessList;