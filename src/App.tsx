import { IonApp, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { calendarOutline as calendarIcon, documentAttachOutline as docIcon, peopleOutline as peopleIcon, wifiOutline as wifiIcon } from "ionicons/icons";
import React from "react";
import { Route, Redirect } from "react-router-dom";

import Agenda from "./pages/agenda/Agenda";
import Documents from "./pages/documents/Documents";
import OC from "./pages/oc/OC";
import Stream from "./pages/stream/Stream";

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
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
