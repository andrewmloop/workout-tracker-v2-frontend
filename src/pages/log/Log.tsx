import { useLocation, useNavigate } from "react-router-dom";
import "./Log.css";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/user-context";
import { ROUTES } from "../../utils/route-enums";
import { LogDto } from "../../entities/log";
import TopNav from "../../components/top-nav/TopNav";

const FORM_VALUES = ["good", "okay", "poor"];

export default function Log() {
  const navigate = useNavigate();
  const location = useLocation();
  const exerciseId = location.state.exerciseId;
  const exerciseName = location.state.exerciseName;

  const { userStore } = useUserContext();

  const [logList, setLogList] = useState<LogDto[]>([]);

  const [weightInput, setWeightInput] = useState("");
  const [repsInput, setRepsInput] = useState("");
  const [formInput, setFormInput] = useState(FORM_VALUES[0]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const getLogsUrl = import.meta.env.VITE_BACKEND_HOST + ROUTES.LOG;
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
          list.push(data);
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

  return (
    <>
      <TopNav showBackButton={true} navText={exerciseName} />
      <div className="log-page page-container">
        <div className="buttons-container">
          <button className="edit-button">Edit</button>
          <button className="chart-button">Chart</button>
        </div>
        {/* Use userStore to determine if logging will show up on left for right */}
        <div className="column-container">
          <div className="log-column">
            {logList.length > 0 &&
              logList.map((log) => {
                return (
                  <LogItem
                    key={log._id}
                    weight={
                      userStore?.useMetric
                        ? log.weightMetric
                        : log.weightImperial
                    }
                    isMetric={userStore?.useMetric as boolean}
                    reps={log.reps}
                    form={log.form}
                  />
                );
              })}
          </div>
          <div className="input-column">
            <div className="weight-input-container">
              <label>Weight</label>
              <input
                type="number"
                min={0}
                maxLength={3}
                placeholder={userStore?.useMetric ? "kgs" : "lbs"}
                onChange={(e) => setWeightInput(e.target.value)}
              />
            </div>
            <div className="reps-input-container">
              <label>Reps</label>
              <input
                type="number"
                min={0}
                maxLength={3}
                placeholder="reps"
                onChange={(e) => setRepsInput(e.target.value)}
              />
            </div>
            <div className="form-input-container">
              <label>Form</label>
              <button onClick={handleFormInput}>
                {formInput.toUpperCase()}
              </button>
            </div>
            <div className="submit-input-container">
              <label>Log</label>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type LogItemPropType = {
  weight: number;
  isMetric: boolean;
  reps: number;
  form: string;
};
function LogItem(props: LogItemPropType) {
  const units = props.isMetric ? "kgs" : "lbs";
  return (
    <div className="log-item-container">
      <p className="log-text">{`${props.weight} ${units} x ${props.reps} reps`}</p>
      <p className="form-text">{props.form}</p>
    </div>
  );
}

function calcMetricToImperial(weight: number) {
  return Math.round(weight * 2.20462);
}

function calcImperialToMetric(weight: number) {
  return Math.round(weight / 2.20462);
}
