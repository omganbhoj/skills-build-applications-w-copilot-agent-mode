import { useEffect, useMemo, useState } from 'react';
import { getApiUrl } from '../baseUrl';

function getCollectionItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.activities)) {
    return payload.activities;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && payload.data && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(getApiUrl('/api/activities/'));
        const payload = await response.json();
        setActivities(getCollectionItems(payload));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  const content = useMemo(() => {
    if (loading) {
      return <div className="alert alert-info">Loading activities…</div>;
    }

    if (error) {
      return <div className="alert alert-danger">Unable to load activities: {error}</div>;
    }

    return (
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {activities.map((activity) => (
          <div className="col" key={activity._id || activity.id || `${activity.type}-${activity.date}`}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h5">{activity.type}</h3>
                <p className="mb-1"><strong>Duration:</strong> {activity.duration}</p>
                <p className="mb-1"><strong>Date:</strong> {activity.date}</p>
                <p className="mb-0"><strong>Distance:</strong> {activity.distance}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }, [activities, error, loading]);

  return (
    <section className="container py-4">
      <h2 className="h3 mb-4">Activities</h2>
      {content}
    </section>
  );
}
