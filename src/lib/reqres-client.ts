import sleep from '@darkobits/sleep';
import axios from 'axios';

export interface FetchConfig {
  delay?: number;
}

export interface RequestParams {
  page?: number;
}

/**
 * React Query data-fetching function that will query a path according to the
 * provided key.
 */
export default (config: FetchConfig = {}) => {
  return async (key: string, fetchOptions: RequestParams = {}) => {
    console.debug('[fetch] Key:', key, 'Fetch options:', fetchOptions, 'Config:', config);

    // const shouldItWork = Math.random();

    // if (shouldItWork > 0.1) {
    //   throw new Error('Unable to fetch users.');
    // }

    const response = await axios({
      method: 'GET',
      url: `https://reqres.in/api/${key}`,
      params: {
        page: fetchOptions?.page
      }
    });

    await sleep(config.delay ?? 0);

    return response.data;
  };
};
