import React, { useState, useContext } from "react";
import { IonModal } from "@ionic/react";
import PinList from "./PinList";
import EditMenu from "./EditMenu";
import { Pin } from "micro-device-modules/lib/pin";
import PinForm from "./PinForm";

import { PinContext } from "../context/pin-context";

const PinUi: React.FC = () => {
  const context = useContext(PinContext);
  const [modal, setModal] = useState(false);

  const close = () => {
    setModal(false);
  };

  const submit = (p: Pin) => {
    close();
    context.put(p);
  };

  const addClicked = () => {
    context.newPin();
    setModal(true);
  };

  const removeClicked = () => {
    context.removeSelected();
  };

  const editClicked = () => {
    context.getFirstSelection();
    setModal(true);
  };

  return (
    <>
      <IonModal
        isOpen={modal}
        swipeToClose={true}
        onDidDismiss={() => close()}
      >
        <PinForm
          pin={context.item}
          close={() => close()}
          submit={submit}
        />
      </IonModal>
      <EditMenu
        add={addClicked}
        remove={removeClicked}
        edit={editClicked}
        vertical="bottom"
        horizontal="end"
      />
      <PinList keyf={context.key} list={context.list} />
    </>
  );
};

export default PinUi;
