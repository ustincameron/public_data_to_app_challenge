import { useQuery } from 'react-query';
import { getLocations } from '../api/getLocations';

const useLocations = (requestParams) => {
  const result = useQuery('locationResults', () => getLocations(requestParams), {
    refetchOnWindowFocus: false,
  });
  return result;
};

export default useLocations;
