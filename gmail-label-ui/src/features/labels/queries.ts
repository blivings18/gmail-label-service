import { useQuery } from '@tanstack/react-query'
import { labelsQueryOptions } from './queryOptions'

export function useLabels() {
  return useQuery(labelsQueryOptions)
}
