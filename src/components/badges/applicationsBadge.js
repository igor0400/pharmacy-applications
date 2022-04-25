import { useState, useEffect } from 'react';
import useApplicationsService from '../../services/ApplicationsService';

import LoadingSmall from '../loading/LoadingSmall';

const ApplicationsBadge = (props) => {
  const [applications, setApplications] = useState([]);
  const { loading, getApplications } = useApplicationsService();

  useEffect(() => {
    getApplications(props.dbLink).then((res) => {
      const applicationsRes = [];

      for (let key in res) {
        applicationsRes.push({ ...res[key], id: key });
      }

      setApplications(applicationsRes);
    });
  }, []);

  const spinner = loading ? <LoadingSmall /> : null;

  return (
    <div>
      {spinner}
      {!loading ? applications.length : null}
    </div>
  );
};

export default ApplicationsBadge;
