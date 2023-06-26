import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import "./index.css";
import ExerciseList from "./pages/exercises/exercise-list/ExerciseList";
import ExerciseSearch from "./pages/exercises/exercise-search/ExerciseSearch";
import ExerciseDetail from "./pages/exercises/exercise-detail/ExerciseDetail";
import { ExerciseProvider } from "./context/exercise-context";
import RoutineList from "./pages/routines/routine-list/RoutineList";
import RoutineDetail from "./pages/routines/routine-detail/RoutineDetail";
import SignIn from "./pages/auth/sign-in/SignIn";
import { UserProvider } from "./context/user-context";

// Use child routes off "/" to render all child elements
// through App element
const router = createBrowserRouter([
  { path: "/auth/signin", element: <SignIn /> },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <RoutineList /> },
      { path: "/routines", element: <RoutineList /> },
      { path: "/routines/detail", element: <RoutineDetail /> },
      { path: "/exercises", element: <ExerciseList /> },
      { path: "/exercises/:muscle", element: <ExerciseSearch /> },
      { path: "/exercises/detail", element: <ExerciseDetail /> },
      { path: "/settings", element: <div>Settings</div> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ExerciseProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ExerciseProvider>
  </React.StrictMode>
);
