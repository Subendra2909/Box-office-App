import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';

const Home = () => {
  const [input, setInput] = useState('');

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onClickButton = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(res => res.json())
      .then(result => {
        console.log(result);
      });
  };

  const onEnter = ev => {
    if (ev.keyCode === 13) {
      onClickButton();
    }
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
      </div>
    </MainPageLayout>
  );
};

export default Home;
