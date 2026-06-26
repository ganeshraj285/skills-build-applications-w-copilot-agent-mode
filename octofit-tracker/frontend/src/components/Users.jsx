import { useEffect, useState } from 'react';
import { API_BASE } from '../config/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(`${API_BASE}/users`);
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? [];
        setUsers(data);
      } catch (error) {
        console.error('Failed to load users', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <section>
      <h2 className="mb-4">Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="list-group">
          {users.map((user) => (
            <div className="list-group-item" key={user._id || user.id || user.email}>
              <h5 className="mb-1">{user.name}</h5>
              <p className="mb-1 text-muted">{user.email}</p>
              <small>{user.city} • {user.fitnessGoal}</small>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Users;
