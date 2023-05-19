import React,{useState, useEffect} from 'react'
import {sessionBreakStore} from './states'


export default function Timer() {
    const {session,noMoreIncrement,noMoreDecrement}= sessionBreakStore()
    const {breakTimer,noMoreDBreak,noMoreIBreak} = sessionBreakStore()

    const dateToMMSS = (date) => {
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
      };

useEffect(()=>{
function noMore(){
    if(session>=60){
        noMoreIncrement()
    }
    else if (session<1){
        noMoreDecrement()
    }
}

noMore()
},[session])

useEffect(()=>{
    function theBreak(){
        if(breakTimer>=60){
            noMoreIBreak()
        }
        else if (breakTimer<1){
noMoreDBreak()        }
    }

theBreak()

},[breakTimer])


  return (
    <div className="container col">
    <h1 id="timer-label" className="text-center">Session</h1>
    <div id="time-left" className="text-center"></div>
    <button id="start_stop"  className="btn btn-primary"><i className='fa-solid fa-play fa-2xl'></i></button>
    <button id="reset" className="btn btn-primary mx-5"> <i className="fa-solid fa-repeat fa-2xl"></i></button>
  </div>  )
}
