import React from 'react';
import prettyMs from 'pretty-ms';


interface AutoCounterProps {
  time: string | number;
}

export const AutoCounter: React.FunctionComponent<AutoCounterProps> = ({ time }) => {
  const [internalTime, setInternalTime] = React.useState('');

  React.useEffect(() => {
    const updateTime = () => {
      const now = Date.now();
      const then = new Date(time).valueOf();
      setInternalTime(`${prettyMs(now - then)} ago`);
    };

    const interval = setInterval(updateTime, 1000);
    updateTime();

    return () => {
      clearInterval(interval);
    };
  });

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{internalTime}</>
  );
};
