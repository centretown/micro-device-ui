import React from "react";
import {
  IonToolbar,
  IonText,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import {
  checkmarkOutline,
  checkmarkSharp,
  closeOutline,
  closeSharp,
} from "ionicons/icons";

interface props {
  title: string;
  onClose: () => void;
  onSubmit: () => void;
}

const FormHeading: React.FC<props> = (p) => {
  return (
    <IonToolbar className="ion-padding-start">
      <IonText
        className="ion-align-items-start"
        color="primary"
      >
        <h2>{p.title}</h2>
      </IonText>
      <IonButtons
        className="ion-align-items-end"
        slot="primary"
      >
        <IonButton type="button" onClick={p.onSubmit}>
          <IonIcon ios={checkmarkOutline} md={checkmarkSharp} />
        </IonButton>
        <IonButton onClick={p.onClose}>
          <IonIcon ios={closeOutline} md={closeSharp} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

export default FormHeading;
