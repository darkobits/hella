import { formatDistance } from 'date-fns';
import React from 'react';
import getBuildTime from 'virtual:build-time';


/**
 * Returns a human-readable label (ie: "1 hour ago") describing how long ago the
 * last build took place. The label updates every second.
 */
export const useBuildTimestamp = () => {
  const [buildTime, setBuildTime] = React.useState<string | undefined>();

  /**
   * Reads the value from the virtual module provided by the build-time-plugin,
   * formats it, and returns a human-readable string.
   */
  const getFormattedBuildTime = React.useCallback(() => {
    try {
      if (typeof getBuildTime !== 'function') return;

      const time: number = getBuildTime();
      if (!time) return;

      return formatDistance(new Date(time), new Date(), {
        addSuffix: true,
        includeSeconds: true
      });
    } catch {
      return;
    }
  }, []);

  React.useEffect(() => {
    setBuildTime(getFormattedBuildTime());

    const intervalHandle = setInterval(() => {
      setBuildTime(getFormattedBuildTime());
    }, 500);

    return () => {
      clearInterval(intervalHandle);
    };
  }, [setBuildTime]);

  return buildTime?.replace('less than', '').trim();
};
