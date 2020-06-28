import * as React from "react";

import {
  IonFabButton,
  IonIcon,
  IonFab,
  IonFabList,
} from "@ionic/react";

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
interface editProps {
  add?(): void;
  remove?(): void;
  edit?(): void;
  submit?(): void;
  cancel?(): void;
}

const dummy = () => {};

const EditMenu: React.FC<editProps> = (props) => {
  return (
    <IonFab vertical="top" horizontal="end" slot="fixed">
      {props.edit && (
        <IonFabButton
          size="small"
          translucent
          onClick={props.edit}
        >
          <IonIcon ios={pencilOutline} md={pencilSharp} />
        </IonFabButton>
      )}

      {props.add && (
        <IonFabButton
          size="small"
          translucent
          onClick={props.add}
        >
          <IonIcon ios={addOutline} md={addSharp} />
        </IonFabButton>
      )}

      {props.remove && (
        <IonFabButton
          size="small"
          translucent
          onClick={props.remove}
        >
          <IonIcon ios={removeOutline} md={removeSharp} />
        </IonFabButton>
      )}

      {props.cancel && (
        <IonFabButton
          size="small"
          translucent
          onClick={props.cancel}
        >
          <IonIcon ios={exitOutline} md={exitSharp} />
        </IonFabButton>
      )}

      {props.submit && (
        <IonFabButton
          size="small"
          translucent
          onClick={props.submit}
        >
          <IonIcon
            ios={checkmarkCircleOutline}
            md={checkmarkCircleSharp}
          />
        </IonFabButton>
      )}
    </IonFab>
  );
};
export default EditMenu;
