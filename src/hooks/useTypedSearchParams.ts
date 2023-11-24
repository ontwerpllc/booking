import { useMemo } from 'react';
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

  const query = useMemo(() => {
    return `?${searchParams}`;
  }, [searchParams]);

  return { query, get, set };
};
