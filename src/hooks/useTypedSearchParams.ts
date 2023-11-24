import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type PathParamValues, type PathParam } from '~/constants/paths';

export const useTypedSearchParams = <P extends PathParam>() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const get = (key: PathParamValues<P>) => {
    return searchParams.get(key);
  };

  const set = (key: PathParamValues<P>, value: string) => {
    setSearchParams({ [key]: value });
  };

  const query: string = useMemo(() => {
    return `?${searchParams}`;
  }, [searchParams]);

  const queryWith = useCallback(
    (key: PathParamValues<P>, extra: string) => {
      return `${query}&${key}=${extra}`;
    },
    [query],
  );

  return { query, get, set, queryWith };
};
