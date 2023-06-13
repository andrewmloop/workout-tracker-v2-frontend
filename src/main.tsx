import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import "./index.css";
import ExerciseList from "./pages/exercises/exercise-list/ExerciseList";
import ExerciseSearch from "./pages/exercises/exercise-search/ExerciseSearch";
import ExerciseDetail from "./pages/exercises/exercise-detail/ExerciseDetail";

// Use child routes off "/" to render all child elements
// through App element
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <div>Routine List</div>,
      },
      {
        path: "/exercises",
        element: <ExerciseList />,
      },
      { path: "/exercises/:muscle", element: <ExerciseSearch /> },
      { path: "/exercises/detail", element: <ExerciseDetail /> },
      {
        path: "/settings",
        element: <div>Settings</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
