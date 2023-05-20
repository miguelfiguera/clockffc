import React, {useState,useEffect} from "react";
import Timer from "./clockComponents/Timer";
import Break from "./clockComponents/Break";
import Session from "./clockComponents/Session";

export default function Clock() { 
  return (
    <div className="container border border-secondary rounded-3 py-5 my-5">
      <div className="row align-items-star">

    <Break/>
    <Timer/> 
    <Session/>


    </div>
    </div>
  );
}


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
    const segundos = ((session % 60000) / 1000).toFixed(0);
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

  useEffect(() => {
    const controlTime = () => {
      let pendingTime = (session * 100);

      if (
        timerOn === true &&
        onBreak === false &&
        localStorage.getItem("pendingTime")
      ) {
        let pendingTime = localStorage.getItem("pendingTime");
        localStorage.clear();
        const intervalo = setInterval(() => {
          pendingTime = pendingTime -= 1000;
          localStorage.setItem("pendingTime", pendingTime);
          setTimeLeft(settingTime(pendingTime));
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
          localStorage.setItem("pendingTime", pendingTime);
          setTimeLeft(settingTime(pendingTime));
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


  useEffect(() => {
    const controlTime = () => {
      let pendingTime = (breakTimer * 1000 );

      if (
        onBreak === true &&
        localStorage.getItem("pendingTime")
      ) {
        let pendingTime = localStorage.getItem("pendingTime");
        localStorage.clear();
        const intervalo = setInterval(() => {
          pendingTime = pendingTime -= 1000;
          localStorage.setItem("pendingTime", pendingTime);
          setTimeLeft(settingTime(pendingTime));
          if (pendingTime < 1000 ) {
            setOnBreak(false);
            setTimerOn(false)
            instancesOfSound('play')
            clearInterval(intervalo);
            localStorage.clear();
            console.log('lol')
          }
        }, 1000);
        localStorage.clear();
        localStorage.setItem("interval-id", intervalo);
      } else if ( onBreak === true) {
        const intervalo = setInterval(() => {
          pendingTime = pendingTime -= 1000;
          localStorage.setItem("pendingTime", pendingTime);
          setTimeLeft(settingTime(pendingTime));
          if (pendingTime < 1000) {
            setOnBreak(false);
            clearInterval(intervalo);
            setTimerOn(false)
            instancesOfSound('play')
            localStorage.clear();
            console.log('lol')
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
  }, [onBreak]);

  useEffect(() => {
    setTimeLeft(settingTime(session * 60000));
    localStorage.clear()
  }, [session]);

  return (
    <div className="container col">
      <h1 id="timer-label" className="text-center">
        Session
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

import React from 'react'
import {sessionBreakStore} from './states'

export default function Session() {
const session = sessionBreakStore((state)=>state.session)

const setSessionPlus= sessionBreakStore((state)=>state.increaseSession)
const setSessionMinus= sessionBreakStore((state)=>state.decreaseSession)

const conditionalUp=()=>{
  return session < 60 ? setSessionPlus() : 60;
}


const conditionalDown=()=>{
  return session > 1 ? setSessionMinus() : 1;
}


  return (
    <div className="container col">
    <h1 id="session-label" className="text-center">Session Length</h1>
    <button id="session-increment" className="btn btn-primary" onClick={conditionalUp}><i className="fa-solid fa-arrow-up fa-2xl"></i></button>

    <h5 id="session-length" className="text-center">{session}</h5>
    <button id="session-decrement" className="btn btn-primary" onClick={conditionalDown}><i className="fa-solid fa-arrow-down fa-2xl"></i></button>

  </div>  )
}




import React,{useState} from 'react'
import {sessionBreakStore} from './states'


export default function Break() {

    const rest=sessionBreakStore((state)=>state.breakTimer)
    const restPlus=sessionBreakStore((state)=>state.increaseBreak)
    const restMinus=sessionBreakStore((state)=>state.decreaseBreak)

    const conditionalUp=()=>{
      return rest < 60 ? restPlus() : 60  
    }

    const conditionalDown=()=>{
      return rest > 1 ? restMinus() :1
    }


  return (
    <div className="container col">
    <h1 id="break-label" className="text-center">Break Length</h1>
    <button id="break-increment" className="btn btn-primary" onClick={conditionalUp}><i className="fa-solid fa-arrow-up fa-2xl"></i></button>

    <h5 id="break-length" className="text-center">{rest}</h5>
    <button id="break-decrement" className="btn btn-primary" onClick={conditionalDown}><i className="fa-solid fa-arrow-down fa-2xl"></i></button>

  </div>
  )
}
import {create} from 'zustand'

export const sessionBreakStore= create((set)=>({
breakTimer:5,
session:25,
increaseSession:()=> set((state)=>({session: state.session + 1})),
decreaseSession:()=> set((state)=>({session: state.session - 1})),
increaseBreak:()=> set((state)=>({breakTimer: state.breakTimer + 1})),
decreaseBreak:()=> set((state)=>({breakTimer: state.breakTimer - 1})),
reset:()=>set({breakTimer:5,session:25})
}))