import { IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonContent, IonList } from "@ionic/react";
import React, { useState, useEffect } from "react";

import API from "../../utils/backend";

interface DocumentObject {
  name: string;
  url: string;
  key: string;
}

function Documents() {
  const [documentsData, setdocumentsData] = useState([]);

  useEffect(() => {
    //TODO: add feature to refresh data
    API.getDocuments()
      .then(({ data: { values } }: any) =>
        values.map((rawRow: any, index: number) => ({
          name: rawRow[0],
          url: rawRow[1],
          key: `doc-${index}`,
        }))
      )
      .then((data: any) => {
        console.log("data", data);
        setdocumentsData(data);
      });
  }, []);

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
          {documentsData.map((entry: DocumentObject) => (
            <DocumentsItem documentObject={entry} key={entry.key} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Documents;
