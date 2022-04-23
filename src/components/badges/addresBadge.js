import axios from 'axios';
import { Component } from 'react';

import { linkToFirebase } from '../../services/dbLinks';

class AddresBadge extends Component {
  state = {
    applications: [],
    addresCount: [],
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

        const addresCount = this.state.cities[this.props.city].reduce(
          (a, b) => {
            a[b.addres] = (a[b.addres] || 0) + 1;

            return a;
          },
          {}
        );

        const newArray2 = this.state.addresCount;
        newArray2.push(addresCount);
        this.setState({ addresCount: newArray2 });
      });
  }

  render() {
    return (
      <div>
        {this.state.addresCount.map((item) => item[this.props.addres])[0]}
      </div>
    );
  }
}

export default AddresBadge;
