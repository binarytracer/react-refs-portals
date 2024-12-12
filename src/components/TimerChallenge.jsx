import { useRef, useState } from "react";

export default function TimerChallenge(props) {
  const { title, targetTime } = props;

  const timer = useRef();

  const [timerExpired, setTimerExpired] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      clearTimeout(timer.current);
      setTimerStarted(false);
    }, targetTime * 1000);

    setTimerStarted(true);
    setTimerExpired(false);
  }

  function handleStop() {
    clearTimeout(timer.current);
    setTimerStarted(false);
  }

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>Your lost!</p>}
      <p className="challenge-time">
        {targetTime} sec{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={timerStarted ? handleStop : handleStart}>
          {timerStarted ? "Stop" : "Start"} Challenge
        </button>
      </p>
      <p className={timerStarted ? "active" : undefined}>
        Timer {timerStarted ? "is running" : "inactive"}
      </p>
    </section>
  );
}
