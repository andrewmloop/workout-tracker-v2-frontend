import "./ExerciseList.css";
import { Link } from "react-router-dom";

export default function ExerciseList() {
  return (
    <div className="exercise-list-container">
      <ul>
        <ListItem itemName="All Exercises" />
        <ListItem itemName="Abdominals" />
        <ListItem itemName="Arms" />
        <ListItem itemName="Back" />
        <ListItem itemName="Cardio" />
        <ListItem itemName="Chest" />
        <ListItem itemName="Legs" />
        <ListItem itemName="Shoulders" />
        <ListItem itemName="Stretching" />
      </ul>
    </div>
  );
}

type ListItemProps = { itemName: string };

function ListItem(props: ListItemProps) {
  const { itemName } = props;
  return (
    <Link to="/exercises/search" className="list-item-container">
      <p className="item-text">{itemName}</p>
      <div className="nav-arrow">--&gt;</div>
    </Link>
  );
}
