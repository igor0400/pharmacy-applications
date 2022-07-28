import { useState, useEffect } from 'react';
import useApplicationsService from '../../services/ApplicationsService';

import LoadingSmall from '../loading/LoadingSmall';

const AddressBadge = (props) => {
  const [addressCount, setAddressCount] = useState([]);
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

      const addressCountObj = citiesArr[props.city].reduce((a, b) => {
        a[b.address] = (a[b.address] || 0) + 1;

        return a;
      }, {});

      const newArray2 = [];
      newArray2.push(addressCountObj);
      setAddressCount(newArray2);
    });
  }, []);

  const spinner = loading ? <LoadingSmall /> : null;

  return (
    <div>
      {spinner}
      {!loading ? addressCount.map((item) => item[props.address])[0] : null}
    </div>
  );
};

export default AddressBadge;
