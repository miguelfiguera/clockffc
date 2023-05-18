import React, {useState,useEffect} from "react";

export default function Clock() {
    const [rest, setRest]=useState(5)
    const [session,setSession]=useState(25)
    const [time,setTime]=useState()


    




  return (
    <div className="container">
      <div className="break">
        <h1 id="break-label">Break Length</h1>
        <button id="break-decrement"></button>
        <h5 id="break-length">{rest}</h5>
        <button id="break-increment"></button>
      </div>

      <div className="container">
        <div id="timer-label">Session</div>
        <div id="time-left"></div>
        <button id="start_stop"></button>
        <button id="reset"></button>
      </div>

      <div className="container">
        <h1 id="session-label">Session Length</h1>
        <button id="session-decrement"></button>
        <h5 id="session-length">{session}</h5>
        <button id="session-increment"></button>
      </div>
    </div>
  );
}
