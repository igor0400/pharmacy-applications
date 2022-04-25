import { linkToFirebase } from './dbLinks';
import { useHttp } from '../hooks/http.hook';

const useApplicationsService = () => {
  const { loading, request, error, clearError } = useHttp();

  const getApplications = async (dbLink) => {
    const res = await request(`${linkToFirebase}/${dbLink}.json`);
    return res;
  };

  return {
    loading,
    error,
    clearError,
    getApplications,
  };
};

export default useApplicationsService;
