import React,{useState} from 'react'
import {sessionBreakStore} from './states'


export default function Break() {

    const rest=sessionBreakStore((state)=>state.breakTimer)
    const restPlus=sessionBreakStore((state)=>state.increaseBreak)
    const restMinus=sessionBreakStore((state)=>state.decreaseBreak)


  return (
    <div className="container col">
    <h1 id="break-label" className="text-center">Break Length</h1>
    <button id="break-increment" className="btn btn-primary" onClick={restPlus}><i className="fa-solid fa-arrow-up fa-2xl"></i></button>

    <h5 id="break-length" className="text-center">{rest}</h5>
    <button id="break-decrement" className="btn btn-primary" onClick={restMinus}><i className="fa-solid fa-arrow-down fa-2xl"></i></button>

  </div>
  )
}
