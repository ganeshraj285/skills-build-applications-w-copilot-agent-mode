import { useEffect, useState } from 'react'
// Codespaces endpoint:
// https://YOUR_CODESPACE_NAME-8000.app.github.dev/api/activities

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

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${API_BASE}/activities`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load activities')
        }

        return response.json()
      })
      .then((payload) => {
        setActivities(normalizeItems(payload))
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
        <h2 className="h4 mb-0">Activities</h2>
        <span className="text-muted small">{activities.length} records</span>
      </div>

      {loading && <p className="text-muted">Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="list-group">
          {activities.map((activity) => (
            <div key={activity._id || activity.id || activity.type} className="list-group-item">
              <div className="d-flex justify-content-between gap-3">
                <div>
                  <h3 className="h6 mb-1">{activity.type || 'Activity'}</h3>
                  <p className="text-muted small mb-0">{activity.description || 'No description provided.'}</p>
                </div>
                <span className="text-muted small">{activity.duration || '—'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Activities
