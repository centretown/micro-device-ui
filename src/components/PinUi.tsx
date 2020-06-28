import React, { useState, useEffect, useRef } from "react";
import { IonModal } from "@ionic/react";
import PinList from "./PinList";
import EditMenu from "./EditMenu";
import {
  Pin,
  PinSelectable,
} from "micro-device-modules/lib/pin";
import PinForm from "./PinForm";

const newPin: Pin = {
  id: 0,
  digital: true,
  label: "New Pin",
  purpose: "this pins function",
};

const protoToggle = (k: string) => false;
export const ToggleContext = React.createContext(protoToggle);

interface pinUiProps {
  pins?: PinSelectable;
}

const PinUi: React.FC<pinUiProps> = (p) => {
  const pinsRef = useRef<PinSelectable>(
    p.pins === undefined ? new PinSelectable() : p.pins
  );
  const pinRef = useRef<Pin>(newPin);
  const [modal, setModal] = useState(false);
  const [list, setList] = useState<Pin[]>([]);

  useEffect(() => {
    setList(pinsRef.current.sort());
  }, []);

  useEffect(() => {
    pinsRef.current.putList(list);
  }, [list]);

  const addClicked = () => {
    setModal(true);
  };

  const removeClicked = () => {
    pinsRef.current.removeSelected();
    setList(pinsRef.current.sort());
  };

  const editClicked = () => {
    const newPins = pinsRef.current.getSelected();
    if (newPins.length > 0) {
      const p = newPins[0];
      pinRef.current = {
        digital: p.digital,
        id: p.id,
        label: p.label,
        purpose: p.purpose,
      };
    }
    setModal(true);
    toggle(pinsRef.current.key(pinRef.current));
  };

  const close = () => {
    setModal(false);
  };

  const submit = (p: Pin) => {
    console.log("submitted: ", p);
    //pinsRef.current.put(p);
    setList([...list, p]);
    close();
  };

  const toggle = (key: string) => {
    return pinsRef.current.toggleSelect(key);
  };

  return (
    <ToggleContext.Provider value={toggle}>
      <IonModal
        isOpen={modal}
        swipeToClose={true}
        onDidDismiss={() => close()}
      >
        <PinForm
          pin={pinRef.current}
          close={close}
          submit={submit}
        />
      </IonModal>

      <EditMenu
        add={addClicked}
        remove={removeClicked}
        edit={editClicked}
      />
      <PinList keyf={pinsRef.current.key} list={list} />
    </ToggleContext.Provider>
  );
};

export default PinUi;
