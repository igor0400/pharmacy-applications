import ListGroup from 'react-bootstrap/ListGroup';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import axios from 'axios';

import AddresBadge from '../badges/addresBadge';
import AppItemAddres from '../appItem/appItemAddres';
import { linkToFirebase } from '../../services/dbLinks';

import greenPlus from '../../img/icons/green-plus.svg';
import bluePlus from '../../img/icons/blue-plus.svg';

class Addres extends Component {
  state = {
    applications: [],
    addres: [],
    cities: {},
  };

  componentDidMount() {
    axios
      .get(`${linkToFirebase}/${this.props.dbLink}.json`)
      .then((response) => {
        const applications = this.state.applications;

        for (let key in response.data) {
          applications.push({ ...response.data[key], id: key });
        }

        this.setState({ applications });

        const cities = this.state.cities;

        for (const cityInfo of this.state.applications) {
          if (cities.hasOwnProperty(cityInfo.city)) {
            cities[cityInfo.city].push(cityInfo);
          } else {
            cities[cityInfo.city] = [cityInfo];
          }
        }

        this.setState({ cities });

        for (let key in cities) {
          cities[key].reduce((acc, addres) => {
            if (acc[addres.addres]) return acc;

            acc[addres.addres] = true;
            const newArray = this.state.addres;
            newArray.push(addres);
            this.setState({ addres: newArray });
            return acc;
          }, {});
        }
      });
  }

  styles(arr) {
    let style;

    if (arr.substring(0, 2) === 'АД') {
      style = { color: 'rgb(0, 177, 31)' };
    } else if (arr.substring(0, 2) === 'ФЗ') {
      style = { color: 'rgb(3, 123, 228)' };
    }

    return style;
  }

  img(arr) {
    let img;

    if (arr.substring(0, 2) === 'АД') {
      img = greenPlus;
    } else if (arr.substring(0, 2) === 'ФЗ') {
      img = bluePlus;
    }

    return img;
  }

  render() {
    return (
      <div>
        {this.state.addres.map((arr, i) => (
          <Route key={i} exact path={`/${this.props.pathLink}/${arr.city}`}>
            <ListGroup variant="flush">
              <Link
                to={`/${this.props.pathLink}/${arr.city}/${arr.addres}`}
                className="a"
              >
                <AppItemAddres
                  text={arr.addres}
                  stylesArr={this.styles(arr.addres)}
                  img={this.img(arr.addres)}
                  badge={
                    <AddresBadge
                      city={arr.city}
                      addres={arr.addres}
                      dbLink={this.props.dbLink}
                    />
                  }
                />
              </Link>
            </ListGroup>
          </Route>
        ))}
      </div>
    );
  }
}

export default Addres;
