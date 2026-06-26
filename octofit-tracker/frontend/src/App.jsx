import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-lg-5">
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                <div>
                  <h1 className="display-5 fw-bold mb-2">OctoFit Tracker</h1>
                  <p className="lead text-muted mb-0">
                    Monitor your team’s fitness journey across users, teams, activities,
                    leaderboard performance, and workout plans.
                  </p>
                </div>
                <span className="badge bg-primary-subtle text-primary fs-6">React 19 + Vite</span>
              </div>
              <p className="small text-muted mt-3 mb-4">
                For Codespaces, define VITE_CODESPACE_NAME in .env.local so the app points to the correct forwarded API URL.
              </p>

              <nav className="nav nav-pills flex-wrap gap-2 mb-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-primary'}`}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <Routes>
                <Route
                  path="/"
                  element={
                    <section className="row g-3">
                      <div className="col-md-6">
                        <div className="border rounded p-3 h-100">
                          <h2 className="h5">Live API endpoints</h2>
                          <p className="text-muted small mb-0">
                            The interface consumes the backend routes for users, teams,
                            activities, leaderboard entries, and workouts.
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="border rounded p-3 h-100">
                          <h2 className="h5">Environment-aware API base URL</h2>
                          <p className="text-muted small mb-0">
                            The frontend uses VITE_CODESPACE_NAME in Codespaces and falls back to localhost when it is not set.
                          </p>
                        </div>
                      </div>
                    </section>
                  }
                />
                <Route path="/users" element={<Users />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
