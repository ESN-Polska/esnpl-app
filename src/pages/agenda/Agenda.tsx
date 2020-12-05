import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonList, IonLabel, IonItem } from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Agenda.scss";

import API from "../../utils/backend";

interface AgendaItem {
  startTime: string;
  duration: string;
  topic: string;
  type: string; //todo enum
  speaker: string;
  day: string; //todo: enum
}

const createAgendaItem = (rawEntry: any): AgendaItem | undefined => {
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

function Agenda() {
  const [agendaData, setAgendaData] = useState([]);

  useEffect(() => {
    let agendaSumData: any = [];

    API.getAgenda()
      .then((dataArr: { data: any }[]) =>
        dataArr.map(
          (arr) =>
            (agendaSumData = [
              ...agendaSumData,
              ...arr.data.values
                .map((rawItem: string[]) => {
                  if (rawItem[2] !== "PLANNED") return createAgendaItem(rawItem);
                })
                .filter((value: any) => value !== undefined),
            ])
        )
      )
      .then(() => {
        setAgendaData(agendaSumData);
      });
  }, []);

  const agendaItems = agendaData.map(
    (item: AgendaItem | undefined) =>
      item && (
        <IonItem>
          <IonLabel>
            <div className="agenda-item">
              <div className="time-slot">
                <p className="secondary-data-field">{item.day}</p>
                <h2 className="primary-data-field">{item.startTime}</h2>
                <p className="secondary-data-field">{item.duration}</p>
              </div>
              <div className="rest-slot">
                <h3 className="topic-field">{item.topic}</h3>
                <p className="speaker-field">Speaker: {item.speaker} </p>
              </div>
            </div>
          </IonLabel>
        </IonItem>
      )
  );

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
