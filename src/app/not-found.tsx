'use server';

import Stack from 'react-bootstrap/Stack';

import classes from './not-found.css';


export default async function NotFound() {
  return (
    <Stack
      className="align-items-center justify-content-center"
      aria-label="Not Found"
    >
      <img
        src="/sold-out.png"
        alt="Sold Out"
        className={classes.soldOutImg}
      />
      <div className="text-secondary">
        Bummer, looks like we're sold-out of that.
      </div>
    </Stack>
  );
}
