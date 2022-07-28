import ListGroup from 'react-bootstrap/ListGroup';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useApplicationsService from '../../services/ApplicationsService';

import AddressBadge from '../badges/addressBadge';
import AppItemAddress from '../appItem/appItemAddress';

import greenPlus from '../../img/icons/green-plus.svg';
import bluePlus from '../../img/icons/blue-plus.svg';

const Address = (props) => {
   const [address, setAddress] = useState([]);
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
            cities[key].reduce((acc, address) => {
               if (acc[address.address]) return acc;

               acc[address.address] = true;

               newArray.push(address);

               return acc;
            }, {});
         }
         setAddress(newArray);
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
      <>
         {address.map((arr, i) => (
            <Route key={i} exact path={`/${props.pathLink}/${arr.city}`}>
               <ListGroup variant="flush">
                  <Link
                     to={`/${props.pathLink}/${arr.city}/${arr.address}`}
                     className="a"
                  >
                     <AppItemAddress
                        text={arr.address}
                        stylesArr={styles(arr.address)}
                        img={img(arr.address)}
                        badge={
                           <AddressBadge
                              city={arr.city}
                              address={arr.address}
                              dbLink={props.dbLink}
                           />
                        }
                     />
                  </Link>
               </ListGroup>
            </Route>
         ))}
      </>
   );
};

export default Address;
