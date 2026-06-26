import { useEffect, useState } from 'react';
const API_BASE = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : "http://localhost:8000/api";
  

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(`${API_BASE}/teams`);
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? [];
        setTeams(data);
      } catch (error) {
        console.error('Failed to load teams', error);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  return (
    <section>
      <h2 className="mb-4">Teams</h2>
      {loading ? (
        <p>Loading teams...</p>
      ) : (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6" key={team._id || team.id || team.name}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text text-muted">{team.description}</p>
                  <p className="mb-1"><strong>Sport:</strong> {team.sport}</p>
                  <p className="mb-0"><strong>Members:</strong> {team.members?.length ?? 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Teams;
