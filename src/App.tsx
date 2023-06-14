import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { useExerciseContext } from "./context/exercise-context";
import { useEffect } from "react";
import { ExerciseDto } from "./entities/exercise";
import { ROUTES } from "./utils/route-enums";
import TopNav from "./components/top-nav/TopNav";

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
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImUyZUBlbWFpbC5jb20iLCJzdWIiOiI2NDZkNjc4NDk1MzRmYzUxY2I0YjcxZWQiLCJpYXQiOjE2ODY2ODU2NzUsImV4cCI6MTY4NzI5MDQ3NX0.VwPfeFpHbyzVNYyPvFcPrgaSWiCUmaOt0kMh95dMHmg",
        },
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
      <TopNav />
      <div className="content-container">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
}
