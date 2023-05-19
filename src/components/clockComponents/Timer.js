import React, { useState, useEffect } from "react";
import { sessionBreakStore } from "./states";

export default function Timer() {
  const { session, noMoreIncrement, noMoreDecrement } = sessionBreakStore();
  const { breakTimer, noMoreDBreak, noMoreIBreak } = sessionBreakStore();
  const [timeLeft,setTimeLeft]=useState(settingTime(session))

  /*const dateToMMSS = (date) => {
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };*/

  function settingTime(session) {
    const milisegundos = session * 60000;
    const minutos = Math.floor(milisegundos / 60000);
    const segundos = ((milisegundos % 60000) / 1000).toFixed(0);
    return minutos + ":" + (segundos < 10 ? '0' : '') + segundos;
  }




  return (
  <div className="container col">
      <h1 id="timer-label" className="text-center">
        Session
      </h1>
      <h3 id="time-left" className="text-center">{timeLeft}</h3>
      <button id="start_stop" className="btn btn-primary">
        <i className="fa-solid fa-play fa-2xl"></i>
      </button>
      <button id="reset" className="btn btn-primary mx-5">
        {" "}
        <i className="fa-solid fa-repeat fa-2xl"></i>
      </button>
    </div>
  );
}
