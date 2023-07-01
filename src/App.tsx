import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { useExerciseContext } from "./context/exercise-context";
import { useEffect } from "react";
import { ExerciseDto } from "./entities/exercise";
import { ROUTES } from "./utils/route-enums";

export default function App() {
  // Fetch exercise list on app open and store in context
  // Prevents multiple fetches to API when user moves around
  // the exercise pages
  const { setExerciseList } = useExerciseContext();

  useEffect(() => {
    fetchExercises();
  }, []);

  async function fetchExercises(): Promise<void> {
    let exerciseUrl = import.meta.env.VITE_BACKEND_HOST + ROUTES.EXERCISE;
    try {
      const response = await fetch(exerciseUrl, {
        credentials: "include",
      });
      const data: ExerciseDto[] = await response.json();

      setExerciseList(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Use Outlet here to render child elements for the current route.
  // This maintains a static navbar that doesn't need to get reloaded
  // on each route change.
  return (
    <div className="app">
      <div className="content-container">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
}
