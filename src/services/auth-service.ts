import { UnauthorizedError } from "../entities/unauthorized-error";
import { UserDto } from "../entities/user";
import { fetchApi } from "../utils/fetch-util";
import { ROUTES } from "../utils/route-enums";

export async function postSignIn(body: any): Promise<UserDto | Error> {
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetchApi(ROUTES.SIGN_IN, {
    method: method,
    headers: headers,
    body: body,
    credentials: "include",
  });

  const data = await response.json();

  if (response.ok) {
    return data as UserDto;
  } else if (response.status === 401) {
    return new UnauthorizedError();
  } else {
    return new Error(data.message);
  }
}

export async function getSignOut(): Promise<boolean> {
  const response = await fetchApi(ROUTES.SIGN_OUT, {
    credentials: "include",
  });

  if (response.ok) {
    return true;
  } else if (response.status === 401) {
    return true;
  } else {
    return false;
  }
}
