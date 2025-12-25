import { LabelsTable } from './LabelsTable'
import { useLabels } from './queries'

export function LabelsPage() {
  const { data = [], isLoading, error } = useLabels()

  if (isLoading) return <p>Loading…</p>
  if (error) return <p>Error loading labels</p>

  return <LabelsTable data={data} />
}
