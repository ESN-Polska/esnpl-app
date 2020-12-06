import { IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonContent, IonList, IonRefresher, IonRefresherContent } from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import React, { useState, useEffect } from "react";
import { chevronDownCircleOutline } from "ionicons/icons";

import API from "../../utils/backend";

interface DocumentObject {
  name: string;
  url: string;
  key: string;
}

function Documents() {
  const [documentsData, setdocumentsData] = useState([]);

  useEffect(() => {
    getLatestDocs();
  }, []);

  const getLatestDocs = () =>
    API.getDocuments()
      .then(({ data: { values } }: { data: { values: string[] } }) =>
        values.map((rawRow: any, index: number) => ({
          name: rawRow[0],
          url: rawRow[1],
          key: `doc-item-${index}`,
        }))
      )
      .then((data: any) => {
        setdocumentsData(data);
      });

  const refreshDocs = (event: CustomEvent<RefresherEventDetail>) => {
    getLatestDocs().then(() => {
      event.detail.complete();
    });
  };

  const DocumentsItem = ({ documentObject }: { documentObject: DocumentObject }) => (
    <IonItem onClick={() => window.open(documentObject.url)}>
      <IonLabel>
        <h3>{documentObject.name}</h3>
      </IonLabel>
    </IonItem>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Documents</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonRefresher slot="fixed" onIonRefresh={refreshDocs}>
            <IonRefresherContent
              pullingIcon={chevronDownCircleOutline}
              pullingText="Pull to refresh"
              refreshingSpinner="circles"
              refreshingText="Refreshing..."
            />
          </IonRefresher>
          {documentsData.map((entry: DocumentObject) => (
            <DocumentsItem documentObject={entry} key={entry.key} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Documents;
