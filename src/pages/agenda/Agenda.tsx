import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonList, IonLabel, IonItem } from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Agenda.scss";

import API from "../../utils/backend";

interface AgendaEntry {
  startTime: string;
  duration: string;
  topic: string;
  type: string; //TODO: change to enum
  speaker: string;
  day: string; //TODO: change to enum
}

enum dayName {
  FRI = "Friday",
  SAT = "Saturday",
  SUN = "Sunday",
}

//TODO: improve after 8hrs of good sleep....
const getDayName = (name: string) => {
  if (name === "FRI") return dayName.FRI;

  if (name === "SAT") return dayName.SAT;

  if (name === "SUN") return dayName.SUN;
};

const createAgendaItem = (rawEntry: any): AgendaEntry | undefined => {
  if (!(rawEntry[2] && rawEntry[3] && rawEntry[4] && rawEntry[5] && rawEntry[6])) return;

  return {
    startTime: rawEntry[2],
    duration: rawEntry[3],
    topic: rawEntry[4],
    type: rawEntry[5],
    speaker: rawEntry[6],
    day: rawEntry[11],
  };
};

const AgendaItemsList = ({ agendaData }: { agendaData: AgendaEntry[] }) => (
  <IonList>
    {agendaData.map((item: AgendaEntry | string) => {
      if (!item) return undefined;

      return typeof item === "string" ? <AgendaDividerItem dayName={item} /> : <AgendaEntryItem itemData={item} />;
    })}
  </IonList>
);

const AgendaEntryItem = ({ itemData }: { itemData: AgendaEntry }) => (
  <IonItem>
    <IonLabel>
      <div className="agenda-item">
        <div className="time-slot">
          <p className="secondary-data-field">{itemData.day}</p>
          <h2 className="primary-data-field">{itemData.startTime}</h2>
          <p className="secondary-data-field">{itemData.duration}</p>
        </div>
        <div className="rest-slot">
          <h3 className="topic-field">{itemData.topic}</h3>
          <p className="speaker-field">Speaker: {itemData.speaker} </p>
        </div>
      </div>
    </IonLabel>
  </IonItem>
);

const AgendaDividerItem = ({ dayName }: { dayName: string }) => (
  <IonItem>
    <IonLabel>
      <h1>{dayName}</h1>
    </IonLabel>
  </IonItem>
);

function Agenda() {
  const [agendaData, setAgendaData] = useState([]);

  useEffect(() => {
    let agendaSumData: any = [];

    //TODO: add feature to refresh agenda
    API.getAgenda()
      .then((dataArr: { data: any }[]) =>
        dataArr.map(
          (arr) =>
            (agendaSumData = [
              ...agendaSumData,
              getDayName(arr.data.values[1][11]),
              ...arr.data.values
                .map((rawItem: string[]) => {
                  if (rawItem[2] === "PLANNED") return undefined;
                  return createAgendaItem(rawItem);
                })
                .filter((value: any) => value !== undefined),
            ])
        )
      )
      .then(() => {
        setAgendaData(agendaSumData);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agenda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AgendaItemsList agendaData={agendaData} />
      </IonContent>
    </IonPage>
  );
}

export default Agenda;
