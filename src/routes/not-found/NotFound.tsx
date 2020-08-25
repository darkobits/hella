import React from 'react';
import Stack from 'react-bootstrap/Stack';
import { Img } from 'react-image';

import classes from './NotFound.css';
import soldOutUrl from './sold-out.png';


export const NotFound = () => {
  return (
    <Stack
      aria-label="Not Found"
      className="align-items-center justify-content-center"
    >
      <Img src={soldOutUrl} alt="Sold Out" className={classes.soldOutImg} />
      <div className="text-secondary">
        Bummer, looks like we're sold-out of that.
      </div>
    </Stack>
  );
};
