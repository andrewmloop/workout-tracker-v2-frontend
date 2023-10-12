import { useNavigate } from "react-router-dom";

/**
 * Fetch a specified resource from the API server.
 *
 * @param path The resource URL (e.g. /api/resource)
 * @param options Options for the fetch call.
 * @returns A promise for the HTTP response.
 */
export async function fetchApi(
  path: string,
  options: RequestInit
): Promise<Response> {
  const apiHost =
    import.meta.env.VITE_API_HOST + ":" + import.meta.env.VITE_API_PORT + "/";
  const fullURL = apiHost + path;

  return await fetch(fullURL, options);
}

/**
 * Handles a response. Invokes passed in callback for
 * a 200. Navigates back to /signin page for a 401. Throws
 * an error for all other cases.
 *
 * @param response The response to handle
 * @param callback The callback to invoke for a
 * successful response
 */
export async function handleResponse(
  response: Response,
  callback: any
): Promise<void> {
  const data = await response.json();
  if (response.ok) {
    callback(data);
  } else if (response.status === 401) {
    const navigate = useNavigate();
    navigate("/auth/signin");
  } else {
    throw new Error(data.message);
  }
}
