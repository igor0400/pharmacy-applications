import ListGroup from 'react-bootstrap/ListGroup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Component } from 'react';

import Cards from '../cards/cards';

import './problems.css';

import clock from '../../img/icons/clock.svg';
import lightning from '../../img/icons/lightning.svg';
import lightningPrioritet from '../../img/icons/lightning-prioritet.svg';

class Problems extends Component {
   state = {
      applications: [],
      problems: [],
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

   problemText(arr) {
      let text;
      if (arr.length > 100) {
         text = `${arr.substring(0, 101)}...`;
      } else {
         text = arr;
      }
      return text;
   }

   render() {
      return (
         <div className="problemCards">
            {this.state.applications.map((arr, i) => (
               <Route
                  key={i}
                  exact
                  path={`/${this.props.pathLink}/${arr.city}/${arr.addres}`}
               >
                  <ListGroup variant="flush">
                     <Link
                        to={`/${this.props.pathLink}/${arr.city}/${arr.addres}/${arr.problem}`}
                        className="a"
                     >
                        <div className="problem-cards">
                           <Cards
                              title={arr.date}
                              imgTitle={clock}
                              text={this.problemText(arr.problem)}
                              imgText={lightning}
                              prioritet={arr.prioritet}
                              imgPrioritet={lightningPrioritet}
                              pathLink={this.props.pathLink}
                              city={arr.city}
                              addres={arr.addres}
                              problem={arr.problem}
                           />
                        </div>
                     </Link>
                  </ListGroup>
               </Route>
            ))}
         </div>
      );
   }
}

export default Problems;
