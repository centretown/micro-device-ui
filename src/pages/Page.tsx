import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import "./Page.css";
import { DeviceUi } from "../components/DeviceUi";
import { ProcessUi } from "../components/ProcessUi";
// import { AppPage } from '../components/Menu'

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonText color="primary">
            <h1>{name}</h1>
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {name === "Devices" && <DeviceUi />}
        {name === "Processes" && <ProcessUi />}
      </IonContent>
    </IonPage>
  );
};

export default Page;
