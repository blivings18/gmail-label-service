import { useEffect, useState } from 'react'

import { Label } from '@/types/Label'
import { createFileRoute } from '@tanstack/react-router'

function getLabels() {
  return fetch('http://localhost:8080/api/v1/label').then(
    (res) => res.json() as Promise<Label[]>,
  )
}

export const Route = createFileRoute('/app/label')({
  component: Home,
})

function Home() {
  const [labels, setLabels] = useState<Label[]>([])

  useEffect(() => {
    getLabels().then(setLabels)
  }, [])

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 text-white"
      style={{
        backgroundColor: '#000',
        backgroundImage:
          'radial-gradient(ellipse 60% 60% at 0% 100%, #444 0%, #222 60%, #000 100%)',
      }}
    >
      <div className="w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
        <h1 className="text-2xl mb-4">Labels</h1>
        <ul className="mb-4 space-y-2">
          {labels.map((label) => (
            <li
              key={label.id}
              className="bg-white/10 border border-white/20 rounded-lg p-3 backdrop-blur-sm shadow-md"
            >
              <span className="text-lg text-white">{label.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
