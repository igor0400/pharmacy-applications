import axios from 'axios';
import { Component } from 'react';

import { linkToFirebase } from '../getElements/getElements';

class ApplicationsBadge extends Component {
   state = {
      applications: [],
   };

   componentDidMount() {
      axios
<<<<<<< HEAD
         .get(`${linkToFirebase}/${this.props.dbLink}.json`)
=======
         .get(
            `${/*link to firebase*/}/${this.props.dbLink}.json`
         )
>>>>>>> 8d7a130d2e4dbb94b18b9ee9d1a39b7d21248d92
         .then((response) => {
            const applications = this.state.applications;

            for (let key in response.data) {
               applications.push({ ...response.data[key], id: key });
            }

            this.setState({ applications });
         });
   }

   render() {
      return <div>{this.state.applications.length}</div>;
   }
}

export default ApplicationsBadge;
