export async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(`http://localhost:8080${url}`)
  if (!res.ok) throw new Error('API error')
  return res.json()
}
