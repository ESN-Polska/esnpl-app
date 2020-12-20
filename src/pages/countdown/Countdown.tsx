import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import moment from "moment";
import React, { useEffect, useState } from "react";

import helpers from "./helpers";
import "./Countdown.scss";

const calculateTimeLeft = () => {
  const timeTillDate = "12 25 2020, 9:00 am";
  const timeFormat = "MM DD YYYY, h:mm a";

  const then = moment(timeTillDate, timeFormat);
  const now = moment();
  //@ts-ignore
  const countdown = moment(then - now);
  const days = countdown.format("D");
  const hours = countdown.format("HH");
  const minutes = countdown.format("mm");
  const seconds = countdown.format("ss");

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const SVGCircle = ({ radius }: any) => (
  <svg className="countdown-svg">
    <path fill="none" stroke="#333" stroke-width="4" d={helpers.describeArc(50, 50, 48, 0, radius)} />
  </svg>
);

function Countdown() {
  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      // setYear(new Date().getFullYear());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const { days, hours, minutes, seconds } = timeLeft;

  // Mapping the date values to radius values
  const daysRadius = helpers.mapNumber(days, 30, 0, 0, 360);
  const hoursRadius = helpers.mapNumber(hours, 24, 0, 0, 360);
  const minutesRadius = helpers.mapNumber(minutes, 60, 0, 0, 360);
  const secondsRadius = helpers.mapNumber(seconds, 60, 0, 0, 360);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Countdown</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <h1>X-mas</h1>
          <div className="countdown-wrapper">
            {days && (
              <div className="countdown-item">
                <SVGCircle radius={daysRadius} />
                {days}
                <span>days</span>
              </div>
            )}
            {hours && (
              <div className="countdown-item">
                <SVGCircle radius={hoursRadius} />
                {hours}
                <span>hours</span>
              </div>
            )}
            {minutes && (
              <div className="countdown-item">
                <SVGCircle radius={minutesRadius} />
                {minutes}
                <span>minutes</span>
              </div>
            )}
            {seconds && (
              <div className="countdown-item">
                <SVGCircle radius={secondsRadius} />
                {seconds}
                <span>seconds</span>
              </div>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Countdown;
