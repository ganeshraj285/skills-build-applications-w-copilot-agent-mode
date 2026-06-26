import { useEffect, useState } from 'react'
// Codespaces endpoint:
// https://YOUR_CODESPACE_NAME-8000.app.github.dev/api/leaderboard

const API_BASE = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items
  }

  return []
}

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${API_BASE}/leaderboard`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load leaderboard')
        }

        return response.json()
      })
      .then((payload) => {
        setEntries(normalizeItems(payload))
        setError('')
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Leaderboard</h2>
        <span className="text-muted small">{entries.length} entries</span>
      </div>

      {loading && <p className="text-muted">Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry._id || entry.id || `${entry.user?.name}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{entry.user?.name || 'Unknown'}</td>
                  <td>{entry.score || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
