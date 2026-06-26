import { useEffect, useState } from 'react';
import { API_BASE } from '../config/api';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(`${API_BASE}/activities`);
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? [];
        setActivities(data);
      } catch (error) {
        console.error('Failed to load activities', error);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <section>
      <h2 className="mb-4">Activities</h2>
      {loading ? (
        <p>Loading activities...</p>
      ) : (
        <div className="list-group">
          {activities.map((activity) => (
            <div className="list-group-item" key={activity._id || activity.id || activity.type}>
              <h5 className="mb-1">{activity.type}</h5>
              <p className="mb-1 text-muted">
                {activity.durationMinutes} min • {activity.distanceKm ?? 0} km
              </p>
              <small>{activity.user?.name || 'Unknown user'}</small>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Activities;
