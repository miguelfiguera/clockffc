import React, { useState, useEffect } from "react";
import { sessionBreakStore } from "./states";

export default function Timer() {
  const { breakTimer, session, reset } = sessionBreakStore();
  const [timeLeft, setTimeLeft] = useState();
  const [onBreak, setOnBreak] = useState(false);
  const [timerOn, setTimerOn] = useState(false);

  function settingTime(session) {
    const minutos = Math.floor(session / 60000);
    const segundos = ((session % 60000) / 1000).toFixed(0);
    return minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
  }

  function resetAll() {
    reset();
    setTimeLeft(settingTime(session*60000));
    clearInterval(localStorage.getItem('interval-id'))
    localStorage.clear()
  }

  function activate() {
    setTimerOn(!timerOn);
  }

  useEffect(() => {
    const controlTime = () => {
      let pendingTime =  onBreak === false ? session * 60000 : breakTimer * 60000;

      if(timerOn===true && localStorage.getItem('pendingTime')){
        let pendingTime=localStorage.getItem('pendingTime')
        localStorage.clear()
        const intervalo = setInterval(() => {
          pendingTime = pendingTime -= 1000
          localStorage.setItem('pendingTime',pendingTime)
          setTimeLeft(settingTime(pendingTime));
          if (pendingTime <= 0) {
            setOnBreak(true);
          }
        }, 1000);
        localStorage.clear()
        localStorage.setItem('interval-id',intervalo)
      }
      else if (timerOn === true) {
        const intervalo = setInterval(() => {
          pendingTime = pendingTime -= 1000
          localStorage.setItem('pendingTime',pendingTime)
          setTimeLeft(settingTime(pendingTime));
          if (pendingTime <= 0) {
            setOnBreak(true);
          }
        }, 1000);
        localStorage.clear()
        localStorage.setItem('interval-id',intervalo)
      }

      if(timerOn===false){
        clearInterval(localStorage.getItem('interval-id'))
      }

    };

    controlTime()
  }, [timerOn]);

  

  useEffect(() => {
    setTimeLeft(settingTime(session * 60000));
  }, [session]);

  return (
    <div className="container col">
      <h1 id="timer-label" className="text-center">
        Session
      </h1>
      <h3 id="time-left" className="text-center">
        {timeLeft}
      </h3>
      <button id="start_stop" className="btn btn-primary" onClick={activate}>
        <i className="fa-solid fa-play fa-2xl"></i>
      </button>
      <button id="reset" className="btn btn-primary mx-5" onClick={resetAll}>
        {" "}
        <i className="fa-solid fa-repeat fa-2xl"></i>
      </button>
    </div>
  );
}
