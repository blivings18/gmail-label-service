import { fetchLabels } from './api'

export const labelsQueryOptions = {
  queryKey: ['labels'],
  queryFn: fetchLabels,
}
