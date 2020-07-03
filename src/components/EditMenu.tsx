import * as React from "react";

import { IonFabButton, IonIcon, IonFab } from "@ionic/react";

import {
  addOutline,
  addSharp,
  removeOutline,
  removeSharp,
  pencilOutline,
  pencilSharp,
  exitOutline,
  exitSharp,
  checkmarkCircleOutline,
  checkmarkCircleSharp,
} from "ionicons/icons";
import { useRef } from "react";

interface editProps {
  add?(): void;
  remove?(): void;
  edit?(): void;
  submit?(): void;
  close?(): void;
  vertical?: "top" | "bottom" | "center" | undefined;
  horizontal?: "center" | "end" | "start" | undefined;
}

const EditMenu: React.FC<editProps> = (props) => {
  const ref = useRef(props);
  const handleClose = () => {
    if (ref.current.close) {
      ref.current.close();
    }
  };
  return (
    <IonFab
      vertical={props.vertical}
      horizontal={props.horizontal}
      slot="fixed"
    >
      {ref.current.edit && (
        <IonFabButton
          size="small"
          translucent
          onClick={ref.current.edit}
        >
          <IonIcon ios={pencilOutline} md={pencilSharp} />
        </IonFabButton>
      )}
      {ref.current.add && (
        <IonFabButton
          size="small"
          translucent
          onClick={ref.current.add}
        >
          <IonIcon ios={addOutline} md={addSharp} />
        </IonFabButton>
      )}
      {ref.current.remove && (
        <IonFabButton
          size="small"
          translucent
          onClick={ref.current.remove}
        >
          <IonIcon ios={removeOutline} md={removeSharp} />
        </IonFabButton>
      )}
      {ref.current.submit && (
        <IonFabButton
          size="small"
          translucent
          onClick={ref.current.submit}
        >
          <IonIcon
            ios={checkmarkCircleOutline}
            md={checkmarkCircleSharp}
          />
        </IonFabButton>
      )}
      {ref.current.close && (
        <IonFabButton
          size="small"
          translucent
          onClick={handleClose}
        >
          <IonIcon ios={exitOutline} md={exitSharp} />
        </IonFabButton>
      )}
    </IonFab>
  );
};
export default EditMenu;
