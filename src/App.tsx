import { IonApp, IonTabBar, IonTabButton, IonIcon, IonLabel, IonTabs, IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import {
  calendarOutline as calendarIcon,
  wifiOutline as wifiIcon,
  documentAttachOutline as docIcon,
  peopleOutline as peopleIcon,
  mapOutline as mapIcon,
} from "ionicons/icons";
import React from "react";
import Agenda from "./pages/Agenda";
import Stream from "./pages/Stream";
import Documents from "./pages/Documents";
import OC from "./pages/OC";
import Map from "./pages/Map";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/agenda" component={Agenda} exact={true} />
            <Route path="/stream" component={Stream} exact={true} />
            <Route path="/documents" component={Documents} exact={true} />
            <Route path="/OC" component={OC} exact={true} />
            <Route path="/map" component={Map} exact={true} />
            <Route path="/" render={() => <Redirect to="/agenda" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="agenda" href="/agenda">
              <IonIcon icon={calendarIcon} />
              <IonLabel>Agenda</IonLabel>
            </IonTabButton>
            <IonTabButton tab="stream" href="/stream">
              <IonIcon icon={wifiIcon} />
              <IonLabel>Stream</IonLabel>
            </IonTabButton>
            <IonTabButton tab="docs" href="/documents">
              <IonIcon icon={docIcon} />
              <IonLabel>Documents</IonLabel>
            </IonTabButton>
            <IonTabButton tab="oc" href="/OC">
              <IonIcon icon={peopleIcon} />
              <IonLabel>OC</IonLabel>
            </IonTabButton>
            <IonTabButton tab="map" href="/map">
              <IonIcon icon={mapIcon} />
              <IonLabel>Map</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
