// simple  code to show time on the screen using react


import { useEffect, useState } from "react";


function App(){
    const [time, setime] = useState({
        minutes: new Date().getMinutes(),
        hours: new Date().getHours(),
        seconds: new Date().getSeconds(),
      });
    
      useEffect(() => {
        const intervalId = setInterval(() => {
          const date = new Date();
          setime({
            minutes: date.getMinutes(),
            hours: date.getHours(),
            seconds: date.getSeconds(),
          });
        }, 1000);
        return () => clearInterval(intervalId);
      }, []);
    
      const convertToTwoDigit = (number) => {
        return number.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
        });
      };
    
    const time24Clock = time.hours - 12;
    
      return (
        <div className="clockContainer">
          <div className="clock">
            <span>
              {time.hours >= 12 ? `${time24Clock < 10 ? `0${time24Clock}`: time24Clock}` : convertToTwoDigit(time.hours)}
            </span>{" "}
            :<span>{convertToTwoDigit(time.minutes)}</span>:
            <span>{convertToTwoDigit(time.seconds)}</span>:
            <span className="meridiem">{time.hours >= 12 ? " PM" : " AM"}</span>
          </div>
        </div>
      );
}