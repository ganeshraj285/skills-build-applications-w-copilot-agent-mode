import { useEffect, useState } from 'react'
// Codespaces endpoint:
// https://YOUR_CODESPACE_NAME-8000.app.github.dev/api/workouts

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

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${API_BASE}/workouts`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load workouts')
        }

        return response.json()
      })
      .then((payload) => {
        setWorkouts(normalizeItems(payload))
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
        <h2 className="h4 mb-0">Workouts</h2>
        <span className="text-muted small">{workouts.length} records</span>
      </div>

      {loading && <p className="text-muted">Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id || workout.name} className="col-md-6">
              <div className="border rounded p-3 h-100">
                <h3 className="h6">{workout.name || 'Workout plan'}</h3>
                <p className="text-muted small mb-2">{workout.description || 'No description provided.'}</p>
                <div className="small text-muted">Focus: {workout.focus || 'General fitness'}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts
