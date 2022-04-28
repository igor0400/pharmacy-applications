import ListGroup from 'react-bootstrap/ListGroup';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useApplicationsService from '../../services/ApplicationsService';

import AddresBadge from '../badges/addresBadge';
import AppItemAddres from '../appItem/appItemAddres';

import greenPlus from '../../img/icons/green-plus.svg';
import bluePlus from '../../img/icons/blue-plus.svg';

const Addres = (props) => {
  const [addres, setAddres] = useState([]);
  const { getApplications } = useApplicationsService();

  useEffect(() => {
    getApplications(props.dbLink).then((response) => {
      const applications = [];

      for (let key in response) {
        applications.push({ ...response[key], id: key });
      }

      const cities = [];

      for (const cityInfo of applications) {
        if (cities.hasOwnProperty(cityInfo.city)) {
          cities[cityInfo.city].push(cityInfo);
        } else {
          cities[cityInfo.city] = [cityInfo];
        }
      }

      const newArray = [];
      for (let key in cities) {
        cities[key].reduce((acc, addres) => {
          if (acc[addres.addres]) return acc;

          acc[addres.addres] = true;

          newArray.push(addres);

          return acc;
        }, {});
      }
      setAddres(newArray);
    });
  }, []);

  const styles = (arr) => {
    switch (arr.substring(0, 2)) {
      case 'АД':
        return { color: 'rgb(0, 177, 31)' };
      case 'ФЗ':
        return { color: 'rgb(3, 123, 228)' };
      default:
        return { color: '#000000' };
    }
  };

  const img = (arr) => {
    switch (arr.substring(0, 2)) {
      case 'АД':
        return greenPlus;
      case 'ФЗ':
        return bluePlus;
      default:
        return null;
    }
  };

  return (
    <div>
      {addres.map((arr, i) => (
        <Route key={i} exact path={`/${props.pathLink}/${arr.city}`}>
          <ListGroup variant="flush">
            <Link
              to={`/${props.pathLink}/${arr.city}/${arr.addres}`}
              className="a"
            >
              <AppItemAddres
                text={arr.addres}
                stylesArr={styles(arr.addres)}
                img={img(arr.addres)}
                badge={
                  <AddresBadge
                    city={arr.city}
                    addres={arr.addres}
                    dbLink={props.dbLink}
                  />
                }
              />
            </Link>
          </ListGroup>
        </Route>
      ))}
    </div>
  );
};

export default Addres;
