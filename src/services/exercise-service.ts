import { ExerciseDto } from "../entities/exercise";
import { fetchApi } from "../utils/fetch-util";
import { ROUTES } from "../utils/route-enums";

/**
 * Fetches all exercises. GET /exercise
 */
export async function fetchAllExercises(): Promise<ExerciseDto[]> {
  const response = await fetchApi(ROUTES.EXERCISE, {
    credentials: "include",
  });
  return await response.json();
}
