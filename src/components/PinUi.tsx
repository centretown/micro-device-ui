import React, { useState, useContext } from "react";
import { IonModal } from "@ionic/react";

import { Pin } from "micro-device-modules/lib/pin";

import PinList from "./PinList";
import EditMenu from "./EditMenu";
import PinForm from "./PinForm";

import { PinContext } from "../context/PinState";
import { itemUi } from "./item-ui";

const PinUi: React.FC = () => {
  const context = useContext(PinContext);
  const [modal, setModal] = useState(false);
  const p = itemUi<Pin>(context, setModal);
  return (
    <>
      <IonModal
        isOpen={modal}
        swipeToClose={true}
        onDidDismiss={() => p.close()}
      >
        <PinForm
          pin={context.item}
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
      <PinList keyf={context.select.key} list={context.list} />
    </>
  );
};

export default PinUi;
