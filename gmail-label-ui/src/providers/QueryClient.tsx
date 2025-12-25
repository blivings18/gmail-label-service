import { LabelsPage } from '@/features/labels/LabelsPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LabelsPage />
    </QueryClientProvider>
  )
}
