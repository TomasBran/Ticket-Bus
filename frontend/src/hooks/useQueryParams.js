import { useSearchParams } from 'react-router-dom';

// reads from URL Params to make the fetch, this is a way of
// retaining the information through refreshes in a way that
// doesn't use redux or localStorage for server side things, which avoids data duplication and issues with sync

// reads from the searchParams then returns an object that i can use to fetch with
export function useQueryParams() {
  const [searchParams] = useSearchParams();
  return {
    origin: searchParams.get('origin'),
    destination: searchParams.get('destination'),
    date: searchParams.get('date'),
    scheduleId: searchParams.get('scheduleId'),
    returnDate: searchParams.has('returnDate')
      ? searchParams.get('returnDate') // Use get method to retrieve the value
      : '',
    searchParams: searchParams
  };
}
