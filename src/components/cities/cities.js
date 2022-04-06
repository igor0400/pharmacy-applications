import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Component } from 'react';

import AppItemIcon from '../appItem/appItemIcon';

import city from '../../img/icons/city.svg';
import './cities.css';

class Cities extends Component {
   state = {
      applications: [],
      citiesCount: [],
      cities: [],
   };

   componentDidMount() {
      axios
         .get(
            `https://pharmacy-applications-default-rtdb.firebaseio.com/${this.props.dbLink}.json`
         )
         .then((response) => {
            const applications = this.state.applications;

            for (let key in response.data) {
               applications.push({ ...response.data[key], id: key });
            }

            this.setState({ applications });

            this.state.applications.reduce(
               (acc, city) => {
                  if (acc.map[city.city]) return acc;

                  acc.map[city.city] = true;
                  const newArray = this.state.cities;
                  newArray.push(city);
                  this.setState({ cities: newArray });
                  return acc;
               },
               {
                  map: {},
                  cities: [],
               }
            );

            const citiesCount = this.state.applications.reduce((a, b) => {
               a[b.city] = (a[b.city] || 0) + 1;

               return a;
            }, {});

            const newArray2 = this.state.citiesCount;
            newArray2.push(citiesCount);
            this.setState({ citiesCount: newArray2 });
         });
   }

   render() {
      return (
         <>
            {this.state.cities.length === 0 ? (
               <h4 className="length-null">Нет заявок по выбранному разделу</h4>
            ) : (
               this.state.cities.map((arr, i) => (
                  <ListGroup variant="flush" key={i}>
                     <Link
                        to={`/${this.props.pathLink}/${arr.city}`}
                        className="a"
                     >
                        <AppItemIcon
                           text={arr.city}
                           badge={this.state.citiesCount.map(
                              (item) => item[arr.city]
                           )}
                           img={city}
                           altImg="city"
                        />
                     </Link>
                  </ListGroup>
               ))
            )}
         </>
      );
   }
}

export default Cities;
