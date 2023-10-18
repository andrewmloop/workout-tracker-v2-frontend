import { ExerciseDto } from "../entities/exercise";
import { UnauthorizedError } from "../entities/unauthorized-error";
import { fetchApi } from "../utils/fetch-util";
import { ROUTES } from "../utils/route-enums";

/**
 * Fetches all exercises. GET /exercise
 */
export async function fetchAllExercises(): Promise<ExerciseDto[] | Error> {
  const response = await fetchApi(ROUTES.EXERCISE, {
    credentials: "include",
  });

  const data = await response.json();

  if (response.ok) {
    return data as ExerciseDto[];
  } else if (response.status === 401) {
    return new UnauthorizedError();
  } else {
    return new Error(data.message);
  }
}
