import { useEffect, useMemo, useState } from 'react';
import { getApiUrl } from '../baseUrl';

function getCollectionItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.workouts)) {
    return payload.workouts;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && payload.data && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(getApiUrl('/api/workouts/'));
        const payload = await response.json();
        setWorkouts(getCollectionItems(payload));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  const content = useMemo(() => {
    if (loading) {
      return <div className="alert alert-info">Loading workouts…</div>;
    }

    if (error) {
      return <div className="alert alert-danger">Unable to load workouts: {error}</div>;
    }

    return (
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {workouts.map((workout) => (
          <div className="col" key={workout._id || workout.id || workout.name}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h5">{workout.name}</h3>
                <p className="mb-1"><strong>Focus:</strong> {workout.focus}</p>
                <p className="mb-1"><strong>Duration:</strong> {workout.duration}</p>
                <p className="mb-0"><strong>Intensity:</strong> {workout.intensity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }, [error, loading, workouts]);

  return (
    <section className="container py-4">
      <h2 className="h3 mb-4">Workouts</h2>
      {content}
    </section>
  );
}
