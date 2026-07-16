import { useEffect, useMemo, useState } from 'react';
import { getApiUrl } from '../baseUrl';

function getCollectionItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.leaderboard)) {
    return payload.leaderboard;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && payload.data && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiUrl('/api/leaderboard/'));
        const payload = await response.json();
        setLeaderboard(getCollectionItems(payload));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  const content = useMemo(() => {
    if (loading) {
      return <div className="alert alert-info">Loading leaderboard…</div>;
    }

    if (error) {
      return <div className="alert alert-danger">Unable to load leaderboard: {error}</div>;
    }

    return (
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry._id || entry.id || `${entry.team}-${entry.points}`}>
                <td>{entry.rank}</td>
                <td>{entry.team}</td>
                <td>{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }, [error, loading, leaderboard]);

  return (
    <section className="container py-4">
      <h2 className="h3 mb-4">Leaderboard</h2>
      {content}
    </section>
  );
}
