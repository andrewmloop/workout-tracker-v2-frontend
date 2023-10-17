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
