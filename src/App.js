import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const interverRef = useRef(null);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
      interverRef.current = intervalId;
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    if (isRunning) {
      clearInterval(interverRef.current);
      setIsRunning(false);
    } else setIsRunning(true);
  };

  const reset = () => {
    setTime(0);
    setLaps([]);
    setIsRunning(false)
  };

  

  const getTime = () => {
    const time = `${hours}:${minutes.toString().padStart(2, "0")}: ${seconds
      .toString()
      .padStart(2, "0")}: ${milliseconds.toString().padStart(2, "0")}`;

    return time;
  };

  const recordlaps =()=>{
    setLaps([...laps,getTime()]);

  }
  console.log(laps);
  return (<>
    <div className="container">
      <h1>STOPWATCH</h1>
      <div className="stopwatch-time">{getTime()}</div>
      <div className="btnContainer">
        <button className="buttons" onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="stopwatch-button" onClick={reset}>
          Reset
        </button>
        <button className="lapBtn" onClick={recordlaps}>laps</button>
      </div>
      <div>
        <ul>
          {laps.map((lapTime,index)=>(
            <li key={index}>{(lapTime)}</li>
          ))}
        </ul>
      </div>
      
    </div>
  </>
  );
}

export default App;
