import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ITimerStore {
  restTime: number;
  startTime: number;
  timeLeft: number;
  startTimer: boolean;
}

interface ITimerContext {
  timerStore: ITimerStore;
  setTimerStore: Dispatch<SetStateAction<ITimerStore>>;
}

const TimerContext = createContext<ITimerContext>({
  timerStore: { restTime: 30, startTime: 0, timeLeft: 0, startTimer: false },
  setTimerStore: () => {},
});

export function TimerProvider({ children }: any) {
  const [timerStore, setTimerStore] = useState({
    restTime: 30,
    startTime: 0,
    timeLeft: 0,
    startTimer: false,
  });

  return (
    <TimerContext.Provider value={{ timerStore, setTimerStore }}>
      {children}
    </TimerContext.Provider>
  );
}

export const useTimerContext = () => {
  const { timerStore, setTimerStore } = useContext(TimerContext);

  const setRestTime = (time: number) => {
    setTimerStore((prev) => ({
      ...prev,
      restTime: time,
    }));
  };

  const setStartTime = () => {
    let now = new Date().getTime();
    setTimerStore((prev) => ({
      ...prev,
      startTime: now,
    }));
  };

  const setTimeLeft = (time: number) => {
    setTimerStore((prev) => ({
      ...prev,
      timeLeft: time,
    }));
  };

  const toggleTimer = () =>
    setTimerStore((prev) => ({
      ...prev,
      startTimer: !prev.startTimer,
    }));

  const endTimer = () =>
    setTimerStore((prev) => ({
      ...prev,
      startTimer: false,
    }));

  return {
    timerStore,
    setRestTime,
    setStartTime,
    setTimeLeft,
    toggleTimer,
    endTimer,
  };
};
