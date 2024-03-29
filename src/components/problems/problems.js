import ListGroup from 'react-bootstrap/ListGroup';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useApplicationsService from '../../services/ApplicationsService';

import Cards from '../cards/cards';

import './problems.css';

import clock from '../../img/icons/clock.svg';
import lightning from '../../img/icons/lightning.svg';
import lightningPrioritet from '../../img/icons/lightning-prioritet.svg';

const Problems = (props) => {
  const [applications, setApplications] = useState([]);
  const { getApplications } = useApplicationsService();

  useEffect(() => {
    getApplications(props.dbLink).then((response) => {
      const data = [];

      for (let key in response) {
        data.push({ ...response[key], id: key });
      }

      setApplications(data);
    });
  }, []);

  const problemText = (arr) => {
    let text;
    if (arr.length > 100) {
      text = `${arr.substring(0, 90)}...`;
    } else {
      text = arr;
    }
    return text;
  };

  return (
    <div className="problemCards">
      {applications.map((arr, i) => (
        <Route
          key={i}
          exact
          path={`/${props.pathLink}/${arr.city}/${arr.address}`}
        >
          <ListGroup variant="flush">
            <Link
              to={`/${props.pathLink}/${arr.city}/${arr.address}/${arr.id}`}
              className="a"
            >
              <div className="problem-cards">
                <Cards
                  imageLink={`${arr.city} ${arr.address} ${arr.id2}`}
                  title={arr.date}
                  imgTitle={clock}
                  text={problemText(arr.problem)}
                  imgText={lightning}
                  prioritet={arr.prioritet}
                  imgPrioritet={lightningPrioritet}
                  pathLink={props.pathLink}
                  city={arr.city}
                  address={arr.address}
                  problem={arr.problem}
                />
              </div>
            </Link>
          </ListGroup>
        </Route>
      ))}
    </div>
  );
};

export default Problems;
