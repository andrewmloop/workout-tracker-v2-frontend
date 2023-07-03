import { useLocation, useNavigate } from "react-router-dom";
import "./Log.css";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/user-context";
import { ROUTES } from "../../utils/route-enums";
import { LogDto } from "../../entities/log";
import TopNav from "../../components/top-nav/TopNav";
import RestTimer from "../../components/rest-timer/RestTimer";

const FORM_VALUES = ["good", "okay", "poor"];

export default function Log() {
  const navigate = useNavigate();
  const location = useLocation();
  const exerciseId = location.state.exerciseId;
  const exerciseName = location.state.exerciseName;

  const { userStore } = useUserContext();

  const [logList, setLogList] = useState<LogDto[]>([]);
  const [dateList, setDateList] = useState<string[]>([]);

  const [weightInput, setWeightInput] = useState("");
  const [repsInput, setRepsInput] = useState("");
  const [formInput, setFormInput] = useState(FORM_VALUES[0]);

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    extractDates();
  }, [logList]);

  const fetchLogs = async () => {
    const getLogsUrl =
      import.meta.env.VITE_BACKEND_HOST + ROUTES.LOG_EXERCISE + exerciseId;
    const method = "GET";

    try {
      const response = await fetch(getLogsUrl, {
        method: method,
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setLogList(data);
      } else if (response.status === 401) {
        navigate("/auth/signin");
      } else {
        throw new Error(data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleFormInput = () => {
    setFormInput((prev) => {
      const index = FORM_VALUES.indexOf(prev);

      if (index === 2) {
        return FORM_VALUES[0];
      } else {
        return FORM_VALUES[index + 1];
      }
    });
  };

  const handleSubmit = async () => {
    if (weightInput === "" || repsInput === "") return;

    const addLogUrl = import.meta.env.VITE_BACKEND_HOST + ROUTES.LOG;
    const method = "POST";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      exerciseId: exerciseId,
      reps: +repsInput,
      weightImperial: userStore?.useMetric
        ? calcMetricToImperial(+weightInput)
        : +weightInput,
      weightMetric: userStore?.useMetric
        ? +weightInput
        : calcImperialToMetric(+weightInput),
      form: formInput,
    };

    try {
      const response = await fetch(addLogUrl, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setLogList((prev) => {
          const list = JSON.parse(JSON.stringify(prev));
          list.unshift(data);
          return list;
        });
      } else if (response.status === 401) {
        navigate("/auth/signin");
      } else {
        throw new Error(data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const extractDates = () => {
    let dateList: string[] = [];
    logList.map((log) => {
      let date = new Date(log.createdAt).toLocaleDateString();
      if (dateList.includes(date)) return;
      dateList.push(date);
    });
    setDateList(dateList);
  };

  return (
    <>
      <TopNav showBackButton={true} navText={exerciseName} />
      <div className="log-page page-container">
        <div className="log-buttons-container">
          <button>Edit</button>
          <button>Chart</button>
        </div>
        {/* Use userStore to determine if logging will show up on left for right */}
        <div className="column-container">
          <div className="log-column">
            {logList.length > 0 &&
              dateList.map((date, index) => {
                return (
                  <div key={index} className="log-date-container">
                    <label className="log-date-header">{date}</label>
                    {logList
                      .filter(
                        (log) =>
                          new Date(log.createdAt).toLocaleDateString() === date
                      )
                      .sort(
                        (a, b) =>
                          Date.parse(a.createdAt) - Date.parse(b.createdAt)
                      )
                      .map((log, index) => (
                        <LogItem
                          key={log._id}
                          index={index}
                          weight={
                            userStore?.useMetric
                              ? log.weightMetric
                              : log.weightImperial
                          }
                          isMetric={userStore?.useMetric as boolean}
                          reps={log.reps}
                          form={log.form}
                        />
                      ))}
                  </div>
                );
              })}
          </div>
          <div className="input-column">
            <div className="input-container">
              <label>Weight</label>
              <input
                type="number"
                min={0}
                maxLength={3}
                placeholder={userStore?.useMetric ? "kgs" : "lbs"}
                onChange={(e) => setWeightInput(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Reps</label>
              <input
                type="number"
                min={0}
                maxLength={3}
                placeholder="reps"
                onChange={(e) => setRepsInput(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Form</label>
              <input
                type="button"
                onClick={handleFormInput}
                value={formInput.slice(0, 1).toUpperCase() + formInput.slice(1)}
                className={
                  formInput === "good"
                    ? "good-input"
                    : formInput === "okay"
                    ? "okay-input"
                    : "poor-input"
                }
              />
            </div>
            <div className="input-container">
              <button onClick={handleSubmit}>Submit</button>
            </div>
            <RestTimer />
          </div>
        </div>
      </div>
    </>
  );
}

type LogItemPropType = {
  index: number;
  weight: number;
  isMetric: boolean;
  reps: number;
  form: string;
};
function LogItem(props: LogItemPropType) {
  const units = props.isMetric ? "kgs" : "lbs";
  return (
    <div className="log-item-container">
      <p className="log-text">{`${props.index + 1}: ${
        props.weight
      } ${units} x ${props.reps} reps`}</p>
      <p
        className={`form-text ${
          props.form === "Good"
            ? "good-input"
            : props.form === "Okay"
            ? "okay-input"
            : "poor-input"
        }`}
      >
        {props.form}
      </p>
    </div>
  );
}

function calcMetricToImperial(weight: number) {
  return Math.round(weight * 2.20462);
}

function calcImperialToMetric(weight: number) {
  return Math.round(weight / 2.20462);
}
