import { Route } from 'react-router-dom';

import Cities from '../cities/Cities';
import Addres from '../addres/addres';
import Problems from '../problems/problems';
import ProblemId from '../problemId/problemId';

const dbLinkAll = 'all';
const dbLinkUnaccepted = 'unaccepted';
const dbLinkInProgress = 'inProgress';
const dbLinkDone = 'done';

const elementsData = [
  {
    dbLink: 'all',
    pathLink: 'citiesAll',
  },
  {
    dbLink: 'unaccepted',
    pathLink: 'citiesUnaccepted',
  },
  {
    dbLink: 'inProgress',
    pathLink: 'citiesInProgress',
  },
  {
    dbLink: 'done',
    pathLink: 'citiesDone',
  },
];

function GetElement(props) {
  return (
    <div>
      <Route exact path={`/${props.pathLink}`}>
        <Cities dbLink={props.dbLink} pathLink={props.pathLink} />
      </Route>
      <Addres dbLink={props.dbLink} pathLink={props.pathLink} />
      <Problems dbLink={props.dbLink} pathLink={props.pathLink} />
      <ProblemId dbLink={props.dbLink} pathLink={props.pathLink} />
    </div>
  );
}

function GetElements() {
  return (
    <div>
      {elementsData.map((item, i) => (
        <GetElement key={i} dbLink={item.dbLink} pathLink={item.pathLink} />
      ))}
    </div>
  );
}

export {
  dbLinkAll,
  dbLinkUnaccepted,
  dbLinkInProgress,
  dbLinkDone,
  GetElements,
};
