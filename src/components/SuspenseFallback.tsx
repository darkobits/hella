'use client';

import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';


export const SuspenseFallback = () => {
  const [hidden, setHidden] = React.useState(true);

  React.useEffect(() => {
    const timeoutHandle = setTimeout(() => {
      setHidden(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutHandle);
    };
  }, []);

  return (
    <Stack className="align-items-center justify-content-center">
      <Spinner
        animation="border"
        hidden={hidden}
        style={{
          width: '128px',
          height: '128px',
          color: 'var(--bs-gray)'
        }}
      />
    </Stack>
  );
};
