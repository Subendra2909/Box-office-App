import React, { useEffect, useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/shows/ShowGrid';
import { apiUrl } from '../misc/config';
import { useShows } from '../misc/custom-hooks';

const Starred = () => {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiUrl(`/shows/${showId}`));
      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(results => {
          console.log(results);
          setShows(results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <div>shows are still loading</div>}
      {error && <div>Error ocuured: {error}</div>}
      {!isLoading && !shows && <div>No shows were added</div>}
      {!isLoading && !error && shows && <ShowGrid shows={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
