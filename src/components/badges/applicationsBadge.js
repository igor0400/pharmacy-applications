import axios from 'axios';
import { Component } from 'react';

class ApplicationsBadge extends Component {
   state = {
      applications: [],
   };

   componentDidMount() {
      axios
         .get(
            `${/*link to firebase*/}/${this.props.dbLink}.json`
         )
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
