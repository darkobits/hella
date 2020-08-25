import { styled } from 'linaria/react';
import React from 'react';
import { Spinner } from 'react-bootstrap';

const Styled = {
  Suspense: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;

    & .spinner-border {
      width: 128px;
      height: 128px;
      color: var(--gray);
    }
  `
};

export const SuspenseFallback = () => {
  return (
    <Styled.Suspense>
      <Spinner animation="border" />
    </Styled.Suspense>
  );
};
