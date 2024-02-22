'use client';

import { formatDistance } from 'date-fns';
import React from 'react';


export interface LiveTimestampProps {
  timestamp: number;
}


/**
 * Provided a UNIX timestamp, returns a formatted timestamp string that updates
 * each second.
 */
export const LiveTimestamp = ({ timestamp }: LiveTimestampProps) => {
  const [formattedTimestamp, setFormattedTimestamp] = React.useState<string>();

  const updateTimestamp = React.useCallback(() => {
    setFormattedTimestamp(formatDistance(new Date(timestamp), new Date(), {
      addSuffix: true,
      includeSeconds: true
    }).replace('less than ', ''));
  }, [timestamp, setFormattedTimestamp]);


  React.useEffect(() => {
    updateTimestamp();
    const intervalHandle = setInterval(updateTimestamp, 1000);

    return () => {
      clearInterval(intervalHandle);
    };
  }, [
    updateTimestamp
  ]);

  return (
    <span>{formattedTimestamp}</span>
  );
};
