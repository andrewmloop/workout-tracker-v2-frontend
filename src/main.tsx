import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AddExerciseProvider } from "./context/add-exercise-context";
import { ExerciseProvider } from "./context/exercise-context";
import { RoutineProvider } from "./context/routine-context";
import { TimerProvider } from "./context/timer-context";
import { UserProvider } from "./context/user-context";

import AddRoutine from "./pages/routines/add-routine/AddRoutine";
import App from "./App";
import EditRoutine from "./pages/routines/edit-routine/EditRoutine";
import ExerciseDetail from "./pages/exercises/exercise-detail/ExerciseDetail";
import ExerciseList from "./pages/exercises/exercise-list/ExerciseList";
import ExerciseSearch from "./pages/exercises/exercise-search/ExerciseSearch";
import Log from "./pages/log/Log";
import RoutineList from "./pages/routines/routine-list/RoutineList";
import RoutineDetail from "./pages/routines/routine-detail/RoutineDetail";
import SignIn from "./pages/auth/sign-in/SignIn";
import SignUp from "./pages/auth/sign-up/SignUp";
import Settings from "./pages/settings/Settings";

import "./index.css";

// Use child routes off "/" to render all child elements
// through App element
const router = createBrowserRouter([
  { path: "/auth/signin", element: <SignIn /> },
  { path: "/auth/signup", element: <SignUp /> },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <RoutineList /> },
      { path: "/routines", element: <RoutineList /> },
      { path: "/routines/add", element: <AddRoutine /> },
      { path: "/routines/detail/:routineId", element: <RoutineDetail /> },
      { path: "/routines/edit", element: <EditRoutine /> },
      { path: "/exercises", element: <ExerciseList /> },
      { path: "/exercises/:muscle", element: <ExerciseSearch /> },
      { path: "/exercises/detail/:exerciseId", element: <ExerciseDetail /> },
      { path: "/log", element: <Log /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RoutineProvider>
      <ExerciseProvider>
        <UserProvider>
          <TimerProvider>
            <AddExerciseProvider>
              <RouterProvider router={router} />
            </AddExerciseProvider>
          </TimerProvider>
        </UserProvider>
      </ExerciseProvider>
    </RoutineProvider>
  </React.StrictMode>
);
