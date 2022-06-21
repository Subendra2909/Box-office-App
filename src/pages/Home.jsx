import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/shows/ShowGrid';
import ActorGrid from '../components/actors/ActorGrid';
import { apiUrl } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);

  const [searchOption, setSearchOption] = useState('shows');

  const isShowsSearch = searchOption === 'shows';

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onClickButton = () => {
    apiUrl(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onEnter = ev => {
    if (ev.keyCode === 13) {
      onClickButton();
    }
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const displayResults = () => {
    if (results && results.length === 0) {
      return <div>Nothing found</div>;
    }

    if (results && results.length > 0) {
      console.log(results);
      return results[0].show ? (
        <ShowGrid shows={results} />
      ) : (
        <ActorGrid actors={results} />
      );
    }

    return null;
  };

  console.log(searchOption);

  return (
    <MainPageLayout>
      <div>
        <input
          type="text"
          onChange={onInputChange}
          onKeyDown={onEnter}
          value={input}
        />
        <button type="button" onClick={onClickButton}>
          Search
        </button>

        <div>
          <label htmlFor="shows-search">
            Shows
            <input
              id="shows-search"
              type="radio"
              value="shows"
              checked={isShowsSearch}
              onChange={onRadioChange}
            />
          </label>

          <label htmlFor="actors-search">
            Actors
            <input
              id="actors-search"
              type="radio"
              value="people"
              checked={!isShowsSearch}
              onChange={onRadioChange}
            />
          </label>
        </div>
        {displayResults()}
      </div>
    </MainPageLayout>
  );
};

export default Home;
