import { useSearchParams } from 'react-router-dom';
import { type PathParamValues, type PathParam } from '~/constants/paths';

export const useTypedSearchParams = <P extends PathParam>() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const get = (key: PathParamValues<P>) => {
    return searchParams.get(key);
  };

  const set = (key: PathParamValues<P>, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return { get, set };
};
