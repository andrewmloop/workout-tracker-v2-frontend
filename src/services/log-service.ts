import { LogDto } from "../entities/log";
import { UnauthorizedError } from "../entities/unauthorized-error";
import { fetchApi } from "../utils/fetch-util";
import { ROUTES } from "../utils/route-enums";

export async function getLogsForExerciseId(
  exerciseId: string
): Promise<LogDto[] | Error> {
  const response = await fetchApi(ROUTES.LOG_EXERCISE + exerciseId, {
    credentials: "include",
  });

  const data = await response.json();

  if (response.ok) {
    return data as LogDto[];
  } else if (response.status === 401) {
    return new UnauthorizedError();
  } else {
    return new Error(data.message);
  }
}

export async function postNewLog(body: any): Promise<LogDto | Error> {
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetchApi(ROUTES.LOG, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
    credentials: "include",
  });

  const data = await response.json();

  if (response.ok) {
    return data as LogDto;
  } else if (response.status === 401) {
    return new UnauthorizedError();
  } else {
    return new Error(data.message);
  }
}
