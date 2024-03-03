import { useSearchParams } from 'react-router-dom';

// reads from the searchParams then returns an object that i can use to fetch with
export function useQueryParams() {
  const [searchParams] = useSearchParams();
  return {
    origin: searchParams.get('origin'),
    destination: searchParams.get('destination'),
    date: searchParams.get('date'),
    scheduleId: searchParams.get('scheduleId')
  };
}
