import { useState,useEffect } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause'
import { faMinus, faPlay, faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons'

function App() {
  let [timer,setTimer] = useState({
    sessionLength:25,
    breakLength: 5,
    timeRemaing:1500,
    onBreak:false,
    countingDown:true
  })

  const incrementBreak = () => {
    if(timer.breakLength<60)
    setTimer((prevTimer) => ({
      ...prevTimer,
      breakLength: prevTimer.breakLength + 1,
      timeRemaing: prevTimer.onBreak?(prevTimer.breakLength+1)*60:prevTimer.timeRemaing
    }));
  };
  const decrementBreak=()=>{
    if(timer.breakLength>1){
    setTimer((prevTimer)=>({
      ...prevTimer,
      breakLength:prevTimer.breakLength-1,
      
      timeRemaing: prevTimer.onBreak?(prevTimer.breakLength-1)*60:prevTimer.timeRemaing
    }))}
  }
  const incrementSession = ()=>{
    if(timer.sessionLength<60)
    setTimer((prevTimer)=>({
      ...prevTimer,
      sessionLength: prevTimer.sessionLength+1,
      timeRemaing: prevTimer.onBreak?prevTimer.timeRemaing:(prevTimer.sessionLength+1)*60
    }))
  }
  const decrementSession =()=>{
    if(timer.sessionLength>1){
    setTimer((prevTimer)=>({
      ...prevTimer,
      sessionLength: prevTimer.sessionLength-1,
      timeRemaing: prevTimer.onBreak?prevTimer.timeRemaing:(prevTimer.sessionLength-1)*60
    }))}
  }
  const getRemainingTime = ()=>{
    const minutes = Math.floor(timer.timeRemaing/60).toString();
    const seconds = (timer.timeRemaing%60).toString();
    return `${minutes.length===1? '0'+minutes:minutes}:${seconds.length===1?'0'+seconds:seconds}`
  }
  const getInitializedSession=()=>{
    return timer.onBreak?'Break':'Session'
  }
  const resetClick = () =>{
    setTimer({sessionLength:25,breakLength:5,timeRemaing:1500,onBreak:false,countingDown:false})
    document.getElementById("beep").load();
  }
  const startStopTimer = ()=>{
    setTimer((prevTimer)=>({...prevTimer,countingDown:!prevTimer.countingDown}))
  }
  useEffect(()=>{if(timer.countingDown&&timer.timeRemaing>=0){
    const clearedTimer =setTimeout(()=>
      setTimer((prevTimer)=>({...prevTimer,timeRemaing: prevTimer.timeRemaing-1}))
    ,1000);
    return () => clearTimeout(clearedTimer)
    }else if(timer.timeRemaing<0){
      setTimer((prevTimer)=>({...prevTimer,timeRemaing: prevTimer.onBreak?prevTimer.sessionLength*60:prevTimer.breakLength*60,onBreak:!prevTimer.onBreak}))
      document.getElementById("beep").play()
    }
  }
)
  return (
    <div id='container'>
      <div id='settings'>
    <div id="break-div">
      <div id="break-label" className='label'>Break Length</div>
      <button id="break-increment" onClick={incrementBreak}><FontAwesomeIcon icon={faPlus} /></button>
      <div id="break-length" className='label'>{timer.breakLength}</div>
      <button id="break-decrement" onClick={decrementBreak}><FontAwesomeIcon icon={faMinus} /></button>
    </div>
    <div id="session-div">
      <div id="session-label" className='label'>Session Length</div>
      <button id="session-increment" onClick={incrementSession}><FontAwesomeIcon icon={faPlus} /></button>
      <div id="session-length" className='label'>{timer.sessionLength}</div>
      <button id="session-decrement" onClick={decrementSession}><FontAwesomeIcon icon={faMinus} /></button>
    </div></div>
    <div id="timer">
      <div id="timer-label" >{getInitializedSession()}</div>
      <div id="time-left" >{getRemainingTime()}
        <audio src='https://cdn.pixabay.com/audio/2022/03/15/audio_32283e5329.mp3' id='beep'></audio>
      </div>
      <div id='button-controlls'>
        <button id="start_stop" onClick={startStopTimer}><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></button>
        <button id="reset" onClick={resetClick}><FontAwesomeIcon icon={faRefresh} /></button>
      </div>
    </div>
    </div>
  )
}

export default App
