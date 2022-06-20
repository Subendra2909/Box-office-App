import React from 'react';
import ShowCard from './ShowCard';

import IMAGE_NOT_FOUND from '../../images/not-found.png';
import { FlexGrid } from '../styled';

const ShowGrid = ({ shows }) => {
  return (
    <FlexGrid>
      {shows.map(({ show }) => {
        return (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
            summary={show.summary}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;