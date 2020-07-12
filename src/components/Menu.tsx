import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";

import React from "react";
import { useLocation } from "react-router-dom";
import {
  hardwareChipOutline,
  hardwareChipSharp,
  bookmarkOutline,
  funnelOutline,
  funnelSharp,
} from "ionicons/icons";

import "./Menu.css";

export interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

export const appPage: AppPage = {
  url: '',
  iosIcon: '',
  mdIcon: '',
  title: '',
}

const appPages: AppPage[] = [
  {
    title: "Devices",
    url: "/page/Devices",
    iosIcon: hardwareChipOutline,
    mdIcon: hardwareChipSharp,
  },
  {
    title: "Processes",
    url: "/page/Processes",
    iosIcon: funnelOutline,
    mdIcon: funnelSharp,
  },
];

const labels = ["Notes"];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="menu-list">
          <IonListHeader>Controller</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url
                      ? "selected"
                      : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Docs</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
