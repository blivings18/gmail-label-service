import { queryClient } from '@/client'
import { createFileRoute } from '@tanstack/react-router'
import { LabelsTable } from '../features/labels/LabelsTable'
import { labelsQueryOptions } from '../features/labels/queryOptions'

export const Route = createFileRoute('/labels')({
  loader: () => queryClient.ensureQueryData(labelsQueryOptions),
  component: LabelsRoute,
})

function LabelsRoute() {
  return <LabelsTable data={queryClient.getQueryData(['labels']) ?? []} />
}
