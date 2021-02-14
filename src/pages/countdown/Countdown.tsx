import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import moment from "moment";
import React, { useEffect, useState } from "react";

import helpers from "./helpers";
import "./Countdown.scss";

const calculateTimeLeft = () => {
  const timeTillDate = "03 26 2021, 9:00 am";
  const timeFormat = "MM DD YYYY, h:mm a";

  const then = moment(timeTillDate, timeFormat);
  const now = moment();
  //@ts-ignore
  const countdown = moment(then - now);
  const months = (parseInt(countdown.format("M")) - 1).toString();
  const days = countdown.format("D");
  const hours = countdown.format("HH");
  const minutes = countdown.format("mm");
  const seconds = countdown.format("ss");

  return {
    months,
    days,
    hours,
    minutes,
    seconds,
  };
};

const SVGCircle = ({ radius }: any) => (
  <svg className="countdown-svg">
    <path fill="none" stroke="#333" strokeWidth="4" d={helpers.describeArc(50, 50, 48, 0, radius)} />
  </svg>
);

function Countdown() {
  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const { months, days, hours, minutes, seconds } = timeLeft;
  // Mapping the date values to radius values
  const monthsRadius = helpers.mapNumber(months, 12, 0, 0, 360);
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
          <h1>Spotkanie delegatów</h1>
          <div className="countdown-wrapper">
            {months && (
              <div className="countdown-item">
                <SVGCircle radius={monthsRadius} />
                {months}
                <span>{months === "1" ? "month" : "months"}</span>
              </div>
            )}
            {days && (
              <div className="countdown-item">
                <SVGCircle radius={daysRadius} />
                {days}
                <span>{days === "1" ? "day" : "days"}</span>
              </div>
            )}
            {hours && (
              <div className="countdown-item">
                <SVGCircle radius={hoursRadius} />
                {hours}
                <span>{hours === "1" ? "hour" : "hours"}</span>
              </div>
            )}
            {minutes && (
              <div className="countdown-item">
                <SVGCircle radius={minutesRadius} />
                {minutes}
                <span>{minutes === "1" ? "minute" : "minutes"}</span>
              </div>
            )}
            {seconds && (
              <div className="countdown-item">
                <SVGCircle radius={secondsRadius} />
                {seconds}
                <span>{seconds === "1" ? "second" : "seconds"}</span>
              </div>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Countdown;
