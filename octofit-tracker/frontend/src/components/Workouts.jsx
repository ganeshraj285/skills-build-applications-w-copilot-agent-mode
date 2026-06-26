import { useEffect, useState } from 'react';
const API_BASE = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : "http://localhost:8000/api";
  

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(`${API_BASE}/workouts`);
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? [];
        setWorkouts(data);
      } catch (error) {
        console.error('Failed to load workouts', error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2 className="mb-4">Workouts</h2>
      {loading ? (
        <p>Loading workouts...</p>
      ) : (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-md-6" key={workout._id || workout.id || workout.name}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text text-muted">Focus: {workout.focus}</p>
                  <p className="mb-1"><strong>Duration:</strong> {workout.durationMinutes} min</p>
                  <p className="mb-0"><strong>Difficulty:</strong> {workout.difficulty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Workouts;
