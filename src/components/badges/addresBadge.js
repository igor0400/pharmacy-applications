import { useState, useEffect } from 'react';
import useApplicationsService from '../../services/ApplicationsService';

import LoadingSmall from '../loading/LoadingSmall';

const AddresBadge = (props) => {
  const [addresCount, setAddresCount] = useState([]);
  const { loading, getApplications } = useApplicationsService();

  useEffect(() => {
    getApplications(props.dbLink).then((res) => {
      const applications = [];

      for (let key in res) {
        applications.push({ ...res[key], id: key });
      }

      const citiesArr = {};

      for (const cityInfo of applications) {
        if (citiesArr.hasOwnProperty(cityInfo.city)) {
          citiesArr[cityInfo.city].push(cityInfo);
        } else {
          citiesArr[cityInfo.city] = [cityInfo];
        }
      }

      const addresCountObj = citiesArr[props.city].reduce((a, b) => {
        a[b.addres] = (a[b.addres] || 0) + 1;

        return a;
      }, {});

      const newArray2 = [];
      newArray2.push(addresCountObj);
      setAddresCount(newArray2);
    });
  }, []);

  const spinner = loading ? <LoadingSmall /> : null;

  return (
    <div>
      {spinner}
      {!loading ? addresCount.map((item) => item[props.addres])[0] : null}
    </div>
  );
};

export default AddresBadge;
