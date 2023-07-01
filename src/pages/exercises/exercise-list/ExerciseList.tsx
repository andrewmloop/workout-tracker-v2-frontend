import TopNav from "../../../components/top-nav/TopNav";
import "./ExerciseList.css";
import { Link } from "react-router-dom";

export default function ExerciseList() {
  return (
    <>
      <TopNav showBackButton={false} navText="Exercises" />
      <div className="exercise-list-page page-container">
        <ul>
          <ListItem itemName="All Exercises" muscle="all" />
          <ListItem itemName="Abdominals" muscle="abdominals" />
          <ListItem itemName="Abductors" muscle="abductors" />
          <ListItem itemName="Adductors" muscle="adductors" />
          <ListItem itemName="Biceps" muscle="biceps" />
          <ListItem itemName="Calves" muscle="calves" />
          <ListItem itemName="Chest" muscle="chest" />
          <ListItem itemName="Forearms" muscle="forearms" />
          <ListItem itemName="Glutes" muscle="glutes" />
          <ListItem itemName="Hamstrings" muscle="hamstrings" />
          <ListItem itemName="Lats" muscle="lats" />
          <ListItem itemName="Lowerback" muscle="lowerback" />
          <ListItem itemName="Middleback" muscle="middleback" />
          <ListItem itemName="Neck" muscle="neck" />
          <ListItem itemName="Quadriceps" muscle="quadriceps" />
          <ListItem itemName="Shoulders" muscle="shoulders" />
          <ListItem itemName="Traps" muscle="traps" />
          <ListItem itemName="Triceps" muscle="triceps" />
        </ul>
      </div>
    </>
  );
}

type ListItemProps = { itemName: string; muscle: string };

function ListItem(props: ListItemProps) {
  const { itemName, muscle } = props;
  return (
    <Link to={"/exercises/" + muscle} className="list-item-container">
      <p className="item-text">{itemName}</p>
      <div className="nav-arrow">--&gt;</div>
    </Link>
  );
}
