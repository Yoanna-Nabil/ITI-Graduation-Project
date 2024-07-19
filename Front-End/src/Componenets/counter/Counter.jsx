
import React, { useState, useEffect } from "react";
import "./Counter.css";

function Counter() {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2024-07-08T00:00:00");
    const newTarget = targetDate.setHours(targetDate.getHours() + 20);
    const now = +new Date();
    const difference = newTarget - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div id="hot-deal" className="section ">
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="hot-deal">
              <ul className="hot-deal-countdown list-inline">
                <li className="list-inline-item">
                  <div>
                    <h3>{timeLeft.days}</h3>
                    <span>Days</span>
                  </div>
                </li>
                <li className="list-inline-item">
                  <div>
                    <h3>{timeLeft.hours}</h3>
                    <span>Hours</span>
                  </div>
                </li>
                <li className="list-inline-item">
                  <div>
                    <h3>{timeLeft.minutes}</h3>
                    <span>Mins</span>
                  </div>
                </li>
                <li className="list-inline-item">
                  <div>
                    <h3>{timeLeft.seconds}</h3>
                    <span>Secs</span>
                  </div>
                </li>
              </ul>
              <h2 className="text-uppercase space-x-10">Cooming Soon</h2>
              <p>New Collection Up to 50% OFF</p>
       
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counter;
