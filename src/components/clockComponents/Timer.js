import React, { useState, useEffect, useRef } from "react";
import { sessionBreakStore } from "./states";
import theSound from "../../alarm.wav";

export default function Timer() {
  const { breakTimer, session, reset, seconds, setSeconds, setSession } =
    sessionBreakStore();
  const [onBreak, setOnBreak] = useState(false);
  const [timerOn, setTimerOn] = useState(false);
  const [minutes, setMinutes] = useState(session);
  const intervalRef = useRef(null);

  function resetAll() {
    clearInterval(intervalRef.current);
    setTimerOn(false);
    setOnBreak(false);
    setMinutes(session);
    reset();
    instancesOfSound("stop");
  }

  function activate() {
    setTimerOn(!timerOn);
  }

  function instancesOfSound(answer) {
    const audio = document.getElementById("beep");
    if (answer === "play") {
      audio.currentTime = 0;
      audio.play();
    } else if (answer === "stop") {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  useEffect(() => {
    function counter() {
      if (timerOn === true) {
        intervalRef.current = setInterval(() => {
          clearInterval(intervalRef.current);
          if (seconds === 0) {
            if (minutes !== 0) {
              setSeconds(59);
              setMinutes(minutes - 1);
            } else {
              instancesOfSound("play");
              let thisMinutes= onBreak ? session:breakTimer ;


              console.log('minutes',thisMinutes)
              setMinutes(thisMinutes);
              setOnBreak(!onBreak)
            }
          } else {
            setSeconds(seconds - 1);
          }
        }, 1000);
      }
      
      else {
        clearInterval(intervalRef.current);
      }
    }

    counter();
  }, [seconds, timerOn,onBreak]);

  useEffect(() => {
    function setting() {
      setMinutes(session);
    }
    setting();
  }, [session]);

  return (
    <div className="container col">
      <h1 id="timer-label" className="text-center">
        {onBreak === true ? "Break has begun, new session in: " : "Session"}
      </h1>
      <h3 id="time-left" className="text-center">
        {`${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`}
      </h3>

      <audio src={theSound} id="beep"></audio>
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
