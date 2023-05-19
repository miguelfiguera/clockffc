import React from 'react'
import {sessionBreakStore} from './states'

export default function Session() {
const session = sessionBreakStore((state)=>state.session)

const setSessionPlus= sessionBreakStore((state)=>state.increaseSession)

const setSessionMinus= sessionBreakStore((state)=>state.decreaseSession)

  return (
    <div className="container col">
    <h1 id="session-label" className="text-center">Session Length</h1>
    <button id="session-increment" className="btn btn-primary" onClick={setSessionPlus}><i className="fa-solid fa-arrow-up fa-2xl"></i></button>

    <h5 id="session-length" className="text-center">{session}</h5>
    <button id="session-decrement" className="btn btn-primary" onClick={setSessionMinus}><i className="fa-solid fa-arrow-down fa-2xl"></i></button>

  </div>  )
}
