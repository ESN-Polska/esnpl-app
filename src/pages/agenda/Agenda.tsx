import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonList, IonLabel, IonItem } from "@ionic/react";
import React, { useEffect, useState } from "react";

import API from "../../utils/backend";

interface AgendaItem {
  startTime: string;
  duration: string;
  topic: string;
  type: string; //todo enum
  speaker: string;
}

const createAgendaItem = (rawEntry: any): AgendaItem | undefined => {
  if (!(rawEntry[2] && rawEntry[3] && rawEntry[4] && rawEntry[5] && rawEntry[6])) return;

  return {
    startTime: rawEntry[2],
    duration: rawEntry[3],
    topic: rawEntry[4],
    type: rawEntry[5],
    speaker: rawEntry[6],
  };
};

function Agenda() {
  const [agendaData, setAgendaData] = useState([]);

  useEffect(() => {
    let agendaSumData: any = [];

    API.getAgenda()
      .then((dataArr: { data: any }[]) => dataArr.map((arr) => (agendaSumData = [...agendaSumData, ...arr.data.values.map(createAgendaItem)])))
      .then(() => {
        setAgendaData(agendaSumData);
      });
  }, []);

  const agendaItems = agendaData.map(
    (item: AgendaItem | undefined) =>
      item && (
        <IonItem>
          <IonLabel>{item.topic}</IonLabel>
        </IonItem>
      )
  );

  console.log(agendaData);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agenda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>{agendaItems}</IonList>
      </IonContent>
    </IonPage>
  );
}

export default Agenda;
