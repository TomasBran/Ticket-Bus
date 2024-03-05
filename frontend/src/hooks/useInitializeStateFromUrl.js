import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQueryParams } from './useQueryParams';
import { useSelector } from 'react-redux';

export function useInitializeStateFromUrl(checkEnabledPages = true) {
  const dispatch = useDispatch();
  const queryParams = useQueryParams();
  const { enabledSeatPage } = useSelector((state) => state.enabledPages);

  useEffect(() => {
    if (!checkEnabledPages || enabledSeatPage) {
      dispatch({ type: 'SET_SEAT_QUANTITY', payload: queryParams.passengers });
      // Dispatch other actions as needed...
    }
  }, [dispatch, queryParams, enabledSeatPage, checkEnabledPages]);
}
