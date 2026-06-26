import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted mb-4">
                A modern multi-tier fitness tracking experience for teams, activities,
                and progress.
              </p>
              <p className="small text-muted mb-4">
                Set VITE_CODESPACE_NAME in .env.local when running in Codespaces so the
                frontend uses the correct public API URL.
              </p>
              <nav className="nav nav-pills flex-wrap gap-2 mb-4">
                <NavLink className="nav-link" to="/">Home</NavLink>
                <NavLink className="nav-link" to="/users">Users</NavLink>
                <NavLink className="nav-link" to="/teams">Teams</NavLink>
                <NavLink className="nav-link" to="/activities">Activities</NavLink>
                <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
                <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
              </nav>
              <Routes>
                <Route path="/" element={<section><h2 className="mb-3">Overview</h2><p>Explore the OctoFit tracker data across users, teams, activities, leaderboard, and workouts.</p></section>} />
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
