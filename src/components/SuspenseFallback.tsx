import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';


export const SuspenseFallback = () => {
  return (
    <Stack className="align-items-center justify-content-center">
      <Spinner
        animation="border"
        style={{
          width: '128px',
          height: '128px',
          color: 'var(--bs-gray)'
        }}
      />
    </Stack>
  );
};
