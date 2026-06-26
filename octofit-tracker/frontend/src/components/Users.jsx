import { useEffect, useState } from 'react'
// Codespaces endpoint:
// https://YOUR_CODESPACE_NAME-8000.app.github.dev/api/users

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

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${API_BASE}/users`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load users')
        }

        return response.json()
      })
      .then((payload) => {
        setUsers(normalizeItems(payload))
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
        <h2 className="h4 mb-0">Users</h2>
        <span className="text-muted small">{users.length} records</span>
      </div>

      {loading && <p className="text-muted">Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id || `${user.name}-${user.email}`}>
                  <td>{user.name || 'Unnamed user'}</td>
                  <td>{user.email || '—'}</td>
                  <td>{user.role || 'Member'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users
