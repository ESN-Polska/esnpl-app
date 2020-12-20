import { IonApp, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { calendarOutline as calendarIcon, documentAttachOutline as docIcon, peopleOutline as peopleIcon } from "ionicons/icons";
import React from "react";
import { Route, Redirect } from "react-router-dom";

import Agenda from "./pages/agenda/Agenda";
import Documents from "./pages/documents/Documents";
import SpeakersList from "./pages/speakers-list/SpeakersList";
import Countdown from "./pages/countdown/Countdown";

const isAppDisabled = true;

const App: React.FC = () => {
  if (isAppDisabled)
    return (
      <IonApp>
        <Countdown />
      </IonApp>
    );

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/agenda" component={Agenda} exact={true} />
            <Route path="/speakersList" component={SpeakersList} exact={true} />
            <Route path="/documents" component={Documents} exact={true} />
            <Route path="/" render={() => <Redirect to="/agenda" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="agenda" href="/agenda">
              <IonIcon icon={calendarIcon} />
              <IonLabel>Agenda</IonLabel>
            </IonTabButton>
            <IonTabButton tab="speakersList" href="/speakersList">
              <IonIcon icon={peopleIcon} />
              <IonLabel>SpeakersList</IonLabel>
            </IonTabButton>
            <IonTabButton tab="docs" href="/documents">
              <IonIcon icon={docIcon} />
              <IonLabel>Documents</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
