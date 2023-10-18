import { RoutineDTO } from "../entities/routine";
import { fetchApi } from "../utils/fetch-util";
import { ROUTES } from "../utils/route-enums";
import { UnauthorizedError } from "../entities/unauthorized-error";

export async function getAllRoutines(): Promise<RoutineDTO[] | Error> {
  const response = await fetchApi(ROUTES.ROUTINE, {
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

  const response = await fetchApi(ROUTES.ROUTINE + id, {
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

  const response = await fetchApi(ROUTES.ROUTINE, {
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
