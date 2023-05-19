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
