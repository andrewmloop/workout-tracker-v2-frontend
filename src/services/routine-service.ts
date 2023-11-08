import { RoutineDTO } from "../entities/routine";
import { fetchApi } from "../utils/fetch-util";
import { UnauthorizedError } from "../entities/unauthorized-error";

const DELETE_ROUTINE = "routine/:id";
const DELETE_ROUTINE_EXERCISE = "routine/:id/remove/:exerciseId";
const ROUTINE = "routine/";
const ROUTINE_ID_ADD = "routine/:id/add";

export async function getAllRoutines(): Promise<RoutineDTO[] | Error> {
  const response = await fetchApi(ROUTINE, {
    credentials: "include",
  });

  const data = await response.json();

  if (response.ok) {
    return data as RoutineDTO[];
  } else if (response.status === 401) {
    return new UnauthorizedError();
  } else {
    return new Error(data.message);
  }
}

export async function patchRoutine(
  id: string,
  name: string
): Promise<RoutineDTO | Error> {
  const method = "PATCH";
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    name: name,
  });

  const response = await fetchApi(ROUTINE + id, {
    method: method,
    headers: headers,
    body: body,
    credentials: "include",
  });

  const data = await response.json();

  if (response.ok) {
    return data as RoutineDTO;
  } else if (response.status === 401) {
    return new UnauthorizedError();
  } else {
    return new Error(data.message);
  }
}

export async function postRoutine(name: string): Promise<RoutineDTO | Error> {
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    name: name,
  });

  const response = await fetchApi(ROUTINE, {
    method: method,
    headers: headers,
    body: body,
    credentials: "include",
  });

  const data = await response.json();

  if (response.ok) {
    return data as RoutineDTO;
  } else if (response.status === 401) {
    return new UnauthorizedError();
  } else {
    return new Error(data.message);
  }
}

export async function postNewExercisesForRoutine(
  routineId: string,
  exerciseIdsToAdd: string[]
): Promise<RoutineDTO | Error> {
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    exerciseIds: exerciseIdsToAdd,
  });

  const response = await fetchApi(ROUTINE_ID_ADD.replace(":id", routineId), {
    method: method,
    headers: headers,
    body: body,
    credentials: "include",
  });

  const data = await response.json();

  if (response.ok) {
    return data as RoutineDTO;
  } else if (response.status === 401) {
    return new UnauthorizedError();
  } else {
    return new Error(data.message);
  }
}

export async function deleteRoutine(
  routineId: string
): Promise<boolean | Error> {
  const method = "DELETE";
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetchApi(DELETE_ROUTINE.replace(":id", routineId), {
    method: method,
    headers: headers,
    credentials: "include",
  });

  const data = await response.json();

  if (response.ok) {
    return data as boolean;
  } else if (response.status === 401) {
    return new UnauthorizedError();
  } else {
    return new Error(data.message);
  }
}

export async function deleteExerciseFromRoutine(
  routineId: string,
  exerciseId: string
): Promise<RoutineDTO | Error> {
  const method = "DELETE";
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetchApi(
    DELETE_ROUTINE_EXERCISE.replace(":id", routineId).replace(
      ":exerciseId",
      exerciseId
    ),
    {
      method: method,
      headers: headers,
      credentials: "include",
    }
  );

  const data = await response.json();

  if (response.ok) {
    return data as RoutineDTO;
  } else if (response.status === 401) {
    return new UnauthorizedError();
  } else {
    return new Error(data.message);
  }
}
