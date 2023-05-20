import React, { useState, useEffect } from "react";
import { sessionBreakStore } from "./states";
import theSound from '../../alarm.wav'

export default function Timer() {
  const { breakTimer, session, reset } = sessionBreakStore();
  const [timeLeft, setTimeLeft] = useState();
  const [onBreak, setOnBreak] = useState(false);
  const [timerOn, setTimerOn] = useState(false);

  function settingTime(session) {
    const minutos = Math.floor(session / 60000);
    const segundos = Math.floor((session % 60000) / 1000);
    return `${minutos < 10 ? '0':''}${minutos}:${(segundos < 10 ? "0" : "")}${segundos}`
  }

  function resetAll() {
    reset();
    setTimeLeft(settingTime(session * 60000));
    clearInterval(localStorage.getItem("interval-id"));
    setTimerOn(false);
    setOnBreak(false);
    instancesOfSound('stop')
    localStorage.clear();
  }

  function activate() {
    setTimerOn(!timerOn);
  }

  function instancesOfSound(answer){
    const audio=document.getElementById('beep')
    if(answer==='play'){
      audio.currentTime=0
      audio.play()
    } else if (answer==='stop'){
      audio.pause()
      audio.currentTime=0
    }

  }


  //session control

  useEffect(() => {
    const controlTime = () => {
      let pendingTime = (session * 60000);

      if (
        timerOn === true &&
        onBreak === false &&
        localStorage.getItem("pendingTime")
      ) {
        let pendingTime = localStorage.getItem("pendingTime");
        localStorage.clear();
        const intervalo = setInterval(() => {
          pendingTime = pendingTime -= 1000;
          setTimeLeft(settingTime(pendingTime));
          localStorage.setItem("pendingTime", pendingTime);
          if (pendingTime < 1000) {
            setOnBreak(true);
            clearInterval(intervalo);
            instancesOfSound('play')
            localStorage.clear();
            console.log('TimeLEft done')
          }
        }, 1000);
        localStorage.clear();
        localStorage.setItem("interval-id", intervalo);
      } else if (timerOn === true && onBreak === false) {
        const intervalo = setInterval(() => {
          pendingTime = pendingTime -= 1000;
          setTimeLeft(settingTime(pendingTime));
          localStorage.setItem("pendingTime", pendingTime);
          if (pendingTime < 1000) {
            setOnBreak(true);
            clearInterval(intervalo);
            instancesOfSound('play')
            localStorage.clear();
            console.log('TimeLEft done')

          }
        }, 1000);
        localStorage.clear();
        localStorage.setItem("interval-id", intervalo);
      }
      if (timerOn === false) {
        clearInterval(localStorage.getItem("interval-id"));
      }
    };

    controlTime();
  }, [timerOn]);



  //Break control

  useEffect(() => {
    const controlBreak = () => {
      let pendingTime = (breakTimer * 60000 );

      if (
        onBreak === true &&
        localStorage.getItem("pendingTime")
      ) {
        let pendingTime = localStorage.getItem("pendingTime");
        localStorage.clear();
        const intervalo = setInterval(() => {
          setTimeLeft(settingTime(pendingTime));
          pendingTime = pendingTime -= 1000;
          localStorage.setItem("pendingTime", pendingTime);
          if (pendingTime < 1000 ) {
            setOnBreak(false);
            clearInterval(intervalo);
            instancesOfSound('play')
            localStorage.clear();
            console.log('done',timeLeft)
          }
        }, 1000);
        localStorage.clear();
        localStorage.setItem("interval-id", intervalo);
      } else if ( onBreak === true) {
        const intervalo = setInterval(() => {
          setTimeLeft(settingTime(pendingTime));
          pendingTime = pendingTime -= 1000;
          localStorage.setItem("pendingTime", pendingTime);
          if (pendingTime < 1000) {
            setOnBreak(false);
            clearInterval(intervalo);
            instancesOfSound('play')
            localStorage.clear();
            console.log('done',timeLeft)
          }
        }, 1000);
        localStorage.clear();
        localStorage.setItem("interval-id", intervalo);
      }
      
      if (timerOn === false) {
        clearInterval(localStorage.getItem("interval-id"));
      }
    };
    controlBreak();
  }, [onBreak]);

  useEffect(() => {
    function update(){ 
    localStorage.clear()
    setTimeLeft(settingTime(session * 60000));}

    update()
  }, [session]);

  return (
    <div className="container col">
      <h1 id="timer-label" className="text-center">
        {onBreak===true ? 'Break' : 'Session'}
      </h1>
      <h3 id="time-left" className="text-center">
        {timeLeft}
      </h3>

      <audio src={theSound} id='beep'></audio>
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
