import { apiFetch } from '../../api/http'

export type Label = {
  id: number
  name: string
  color: string
}

export function fetchLabels() {
  return apiFetch<Array<Label>>('/api/v1/label')
}
