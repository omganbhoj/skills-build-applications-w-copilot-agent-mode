import { useEffect, useMemo, useState } from 'react';
import { getApiUrl } from '../baseUrl';

function getCollectionItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.teams)) {
    return payload.teams;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && payload.data && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(getApiUrl('/api/teams/'));
        const payload = await response.json();
        setTeams(getCollectionItems(payload));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  const content = useMemo(() => {
    if (loading) {
      return <div className="alert alert-info">Loading teams…</div>;
    }

    if (error) {
      return <div className="alert alert-danger">Unable to load teams: {error}</div>;
    }

    return (
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {teams.map((team) => (
          <div className="col" key={team._id || team.id || team.name}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h5">{team.name}</h3>
                <p className="mb-1"><strong>Captain:</strong> {team.captain}</p>
                <p className="mb-0"><strong>Members:</strong> {team.members?.length || 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }, [error, loading, teams]);

  return (
    <section className="container py-4">
      <h2 className="h3 mb-4">Teams</h2>
      {content}
    </section>
  );
}
