import { styled } from 'linaria/react';
import React from 'react';

import soldOutUrl from './sold-out.png';

// ----- Styles ----------------------------------------------------------------

const Styled = {
  NotFound: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    padding-bottom: 64px;

    & img {
      margin-bottom: 64px;
      width: 60%;
      max-width: 420px;
      opacity: 0.42;
    }
  `
};

// ----- Not Found -------------------------------------------------------------

export const NotFound = () => {
  return (
    <Styled.NotFound>
      <img src={soldOutUrl} alt="Sold Out" />
      <div className="text-secondary">
        Bummer, looks like we're sold-out of that.
      </div>
    </Styled.NotFound>
  );
};
