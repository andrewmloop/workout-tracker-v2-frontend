import { useEffect } from "react";
import { useTimerContext } from "../../context/timer-context";
import "./RestTimer.css";

/**
 * Rest timer that uses the TimerContext as a global
 * store to access the remaining rest time throughout
 * the app.
 */
export default function RestTimer() {
  const { timerStore, setTimeLeft, endTimer } = useTimerContext();

  useEffect(() => {
    const now = new Date().getTime();
    let remainingTime =
      timerStore.restTime - Math.floor((now - timerStore.startTime) / 1000);
    if (remainingTime < 0) remainingTime = 0;
    if (timerStore.timeLeft > 0) setTimeLeft(remainingTime);
  }, []);

  useEffect(() => {
    if (timerStore.startTimer) {
      let timerInterval = setInterval(() => {
        const now = new Date().getTime();
        let remainingTime =
          timerStore.restTime - Math.floor((now - timerStore.startTime) / 1000);
        if (remainingTime < 0) {
          clearInterval(timerInterval);
          endTimer();
        } else {
          setTimeLeft(remainingTime);
        }
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [timerStore.startTime, timerStore.timeLeft]);

  return (
    <div className="rest-timer-container">
      <RestTimerSelect />
      <RestTimerButton />
    </div>
  );
}

/**
 * The dropdown component that controls how long the rest timer
 * should be.
 */
function RestTimerSelect() {
  const { timerStore, setRestTime, endTimer } = useTimerContext();

  const handleSelect = (value: number) => {
    setRestTime(value);
    endTimer();
  };

  return (
    <div className="rest-timer-dropdown-container">
      <label>Rest Time</label>
      <select
        value={timerStore.restTime}
        onChange={(e) => handleSelect(+e.target.value)}
      >
        <option value={30}>30 sec</option>
        <option value={60}>1 min</option>
        <option value={90}>90 sec</option>
        <option value={120}>2 min</option>
        <option value={150}>150 sec</option>
        <option value={180}>3 min</option>
      </select>
    </div>
  );
}

/**
 * The button component that starts, stops, and displays how much time
 * remains on the rest timer.
 */
function RestTimerButton() {
  const { timerStore, setStartTime, setTimeLeft, toggleTimer } =
    useTimerContext();

  const formatTime = (secs: number) => {
    let time = new Date(0);
    time.setSeconds(secs);
    return time.toISOString().slice(14, 19);
  };

  const handleStart = () => {
    toggleTimer();
    setStartTime();
    setTimeLeft(timerStore.restTime);
  };

  return (
    <div className="rest-timer-button-container">
      <button onClick={handleStart}>
        {timerStore.startTimer ? formatTime(timerStore.timeLeft) : "Start"}
      </button>
    </div>
  );
}
