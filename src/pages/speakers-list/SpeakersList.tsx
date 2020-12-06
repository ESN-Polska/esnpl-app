import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

//TODO: use real id
const gId = "2PACX-1vTPE6tVWFXpJp21mGb9q99dXoMpMrWqskNvXu8rJrzpieVNexFB5tcbcyRKVKf_MmIfaq1vlQPIZhQn";
const sheetId = "944840956";

const speakersListUrl = `https://docs.google.com/spreadsheets/d/e/${gId}/pubhtml?gid=${sheetId}&range=a1:s45&single=true&widget=true&headers=false`;

function SpeakersList() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SpeakersList</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <iframe src={speakersListUrl} width="100%" height="100%" title="Speakers List"></iframe>
      </IonContent>
    </IonPage>
  );
}

export default SpeakersList;
