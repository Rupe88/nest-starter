export async function globalFetch<T = any>(
  relativeURL: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(relativeURL, init);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP error! status: ${res.status}, message: ${text}`);
  }
  return res.json();
}
