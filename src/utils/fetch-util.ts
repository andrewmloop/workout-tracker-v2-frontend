export async function fetchApi(
  path: string,
  options: RequestInit
): Promise<Response> {
  const apiHost =
    import.meta.env.VITE_API_HOST + ":" + import.meta.env.VITE_API_PORT + "/";
  const fullURL = apiHost + path;

  return await fetch(fullURL, options);
}
