import { useEffect, useState } from 'react'
// Codespaces endpoint:
// https://YOUR_CODESPACE_NAME-8000.app.github.dev/api/teams

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

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${API_BASE}/teams`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load teams')
        }

        return response.json()
      })
      .then((payload) => {
        setTeams(normalizeItems(payload))
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
        <h2 className="h4 mb-0">Teams</h2>
        <span className="text-muted small">{teams.length} records</span>
      </div>

      {loading && <p className="text-muted">Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team) => (
            <div key={team._id || team.id || team.name} className="col-md-6">
              <div className="border rounded p-3 h-100">
                <h3 className="h6">{team.name || 'Untitled team'}</h3>
                <p className="text-muted small mb-2">{team.description || 'No description provided.'}</p>
                <div className="small text-muted">
                  Members: {Array.isArray(team.members) ? team.members.length : '—'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
