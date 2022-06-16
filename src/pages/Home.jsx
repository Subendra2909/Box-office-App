import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiUrl } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onClickButton = () => {
    apiUrl(`/search/shows?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onEnter = ev => {
    if (ev.keyCode === 13) {
      onClickButton();
    }
  };

  const displayResults = () => {
    if (results && results.length === 0) {
      return <div>Nothing found</div>;
    }

    if (results && results.length > 0) {
      return (
        <div>
          {results.map(ele => {
            return <div key={ele.show.id}>{ele.show.name}</div>;
          })}
        </div>
      );
    }

    return null;
  };

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
        {displayResults()}
      </div>
    </MainPageLayout>
  );
};

export default Home;
