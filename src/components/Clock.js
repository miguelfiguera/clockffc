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
