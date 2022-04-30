import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useApplicationsService from '../../services/ApplicationsService';

import AppItemIcon from '../appItem/AppItem';
import Loading from '../loading/Loading';
import ErrorMessage from '../errorMessage/ErrorMessage';

import city from '../../img/icons/city.svg';
import './Cities.css';

const Cities = (props) => {
  const [citiesCount, setCitiesCount] = useState([]);
  const [cities, setCities] = useState([]);
  const { loading, error, getApplications } = useApplicationsService();

  useEffect(() => {
    getApplications(props.dbLink).then((res) => {
      const applications = [];

      for (let key in res) {
        applications.push({ ...res[key], id: key });
      }

      const newArray = [];
      applications.reduce(
        (acc, city) => {
          if (acc.map[city.city]) return acc;

          acc.map[city.city] = true;

          newArray.push(city);

          return acc;
        },
        { map: {}, cities: [] }
      );

      setCities(newArray);
      const citiesCount = applications.reduce((a, b) => {
        a[b.city] = (a[b.city] || 0) + 1;

        return a;
      }, {});

      const newArray2 = [];
      newArray2.push(citiesCount);
      setCitiesCount(newArray2);
    });

    return () => {
      setCities(null);
      setCitiesCount(null);
    };
  }, []);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Loading /> : null;

  return (
    <>
      {spinner}
      {errorMessage}
      {!(loading || error) ? (
        cities.length === 0 ? (
          <h4 className="length-null">Нет заявок по выбранному разделу</h4>
        ) : (
          cities.map((arr, i) => (
            <ListGroup variant="flush" key={i}>
              <Link to={`/${props.pathLink}/${arr.city}`} className="a">
                <AppItemIcon
                  text={arr.city}
                  badge={citiesCount.map((item) => item[arr.city])}
                  img={city}
                  altImg="city"
                />
              </Link>
            </ListGroup>
          ))
        )
      ) : null}
    </>
  );
};

export default Cities;
