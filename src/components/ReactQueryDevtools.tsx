import { ReactQueryDevtools as Devtools } from '@tanstack/react-query-devtools';
import { useSearchParams } from 'next/navigation';


/**
 * Wraps the React Query Devtools component, only showing it if the `devtools`
 * query param is present.
 */
export const ReactQueryDevtools = () => {
  const searchParams = useSearchParams();
  const showDevtools = searchParams.get('devtools');

  if (showDevtools === null) return null;

  return (
    <Devtools />
  );
};
