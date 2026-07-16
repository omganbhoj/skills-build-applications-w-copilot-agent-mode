import { useEffect, useMemo, useState } from 'react';
import { getApiUrl } from '../baseUrl';

function getCollectionItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.users)) {
    return payload.users;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && payload.data && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(getApiUrl('-8000.app.github.dev/api/users/'));
        const payload = await response.json();
        setUsers(getCollectionItems(payload));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  const content = useMemo(() => {
    if (loading) {
      return <div className="alert alert-info">Loading users…</div>;
    }

    if (error) {
      return <div className="alert alert-danger">Unable to load users: {error}</div>;
    }

    return (
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {users.map((user) => (
          <div className="col" key={user._id || user.id || `${user.username}-${user.email}`}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h5">{user.fullName || user.username}</h3>
                <p className="mb-1"><strong>Username:</strong> {user.username}</p>
                <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                <p className="mb-0"><strong>Role:</strong> {user.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }, [error, loading, users]);

  return (
    <section className="container py-4">
      <h2 className="h3 mb-4">Users</h2>
      {content}
    </section>
  );
}
