import { useEffect, useState } from 'react'

export default function TestPage() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/test')
      const json = await res.json()
      setData(json)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Test Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
