import { Outlet } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import "./App.css";

// Use Outlet here to render child elements for the current route.
// This maintains a static navbar that doesn't need to get reloaded
// on each route change.
export default function App() {
  return (
    <div className="app">
      <Outlet />
      <Navbar />
    </div>
  );
}
