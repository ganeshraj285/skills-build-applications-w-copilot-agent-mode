import { useEffect, useState } from 'react';
import { API_BASE } from '../config/api';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(`${API_BASE}/leaderboard`);
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? [];
        setEntries(data);
      } catch (error) {
        console.error('Failed to load leaderboard', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2 className="mb-4">Leaderboard</h2>
      {loading ? (
        <p>Loading leaderboard...</p>
      ) : (
        <div className="list-group">
          {entries.map((entry) => (
            <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.rank}>
              <div>
                <h5 className="mb-1">#{entry.rank} {entry.user?.name || entry.name}</h5>
                <small className="text-muted">Streak: {entry.streak ?? 0}</small>
              </div>
              <span className="badge bg-primary rounded-pill">{entry.score ?? entry.points ?? 0}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Leaderboard;
