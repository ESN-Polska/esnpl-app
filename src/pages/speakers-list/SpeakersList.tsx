import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonRefresher,
  IonFooter,
  IonRefresherContent,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import React, { useEffect, useState } from "react";
import { chevronDownCircleOutline } from "ionicons/icons";

import API from "../../utils/backend";

const sheetId = "2092075977";
const editSpeakersListUrl = `https://docs.google.com/spreadsheets/d/1ti9NVlr9dIpEn6_zEBsoeE1qsrSq7k_c_e4umP0Lv3Y/edit#gid=${sheetId}&single=true&amp;widget=true&amp;headers=false`;

interface SpeakerListEntryObject {
  id: string;
  name: string;
  isDone: string;
}

const createSpeakersListDataObject = (rawEntry: string[]) => ({
  id: rawEntry[0],
  name: rawEntry[1],
  isDone: rawEntry[2],
});
const SpeakersListItem = ({ itemData }: { itemData: SpeakerListEntryObject }) => (
  <IonItem>
    <IonLabel>{itemData.name}</IonLabel>
  </IonItem>
);

const SpeakersListListContent = ({ speakersListData }: { speakersListData: SpeakerListEntryObject[] }) => (
  <>
    {speakersListData.map((entry) => (
      <SpeakersListItem itemData={entry} />
    ))}
  </>
);

function SpeakersList() {
  const [speakersListData, setSpeakersListData] = useState([]);

  useEffect(() => {
    getLatestSpeakersListData();
  }, []);

  const getLatestSpeakersListData = () => {
    return API.getSpeakersList()
      .then(({ data: { values } }: any) => values.map((rawEntry: string[]) => rawEntry[2] && createSpeakersListDataObject(rawEntry)))
      .then((objectData: SpeakerListEntryObject[]) => objectData.filter((value: SpeakerListEntryObject) => value && value.name && value.isDone === "FALSE"))
      .then(setSpeakersListData);
  };

  const refreshAgenda = (event: CustomEvent<RefresherEventDetail>) => {
    getLatestSpeakersListData().then(() => {
      event.detail.complete();
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SpeakersList</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonRefresher slot="fixed" onIonRefresh={refreshAgenda}>
            <IonRefresherContent
              pullingIcon={chevronDownCircleOutline}
              pullingText="Pull to refresh"
              refreshingSpinner="circles"
              refreshingText="Refreshing..."
            />
          </IonRefresher>
          <SpeakersListListContent speakersListData={speakersListData} />
        </IonList>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonButton expand="full" onClick={() => window.open(editSpeakersListUrl)}>
          {" "}
          Sign up for the speakers list
        </IonButton>
      </IonFooter>
    </IonPage>
  );
}

export default SpeakersList;
