/**
 * FinnHub Securities API client.
 *
 * See: https://finnhub.io/docs/api
 */
import axios from 'axios';


/**
 * Base URL for the FinnHub API.
 */
const BASE_URL = 'https://finnhub.io/api/v1';

/**
 * Our FinnHub API key.
 */
const API_KEY = 'bt6lpgf48v6oqmgq50ag';


/**
 * Base Axios client for communicating with FinnHub.
 */
const client = axios.create({
  baseURL: BASE_URL,
  params: {
    token: API_KEY
  }
});


/**
 * Fetching function for GET requests to the FinnHub API. Implemented as a
 * higher-order function to allow configuration on a per-query basis.
 */
export const createQueryFn = (path: string, params?: Record<string, any>) => {
  return async () => {
    try {
      const response = await client({
        method: 'GET',
        url: path,
        params
      });

      return response.data;
    } catch (err) {
      console.error(`[query] Error fetching ${path}:`, err);
      throw err;
    }
  };
};
