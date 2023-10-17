import { useNavigate } from "react-router-dom";
import { RoutineDTO } from "../entities/routine";
import { fetchApi } from "../utils/fetch-util";
import { ROUTES } from "../utils/route-enums";

export async function getAllRoutines(): Promise<RoutineDTO[] | undefined> {
  const response = await fetchApi(ROUTES.ROUTINE, {
    credentials: "include",
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  } else if (response.status === 401) {
    const navigate = useNavigate();
    navigate("/auth/signin");
  } else {
    throw new Error(data.message);
  }
}
