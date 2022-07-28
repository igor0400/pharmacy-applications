import { Route } from 'react-router-dom';

import Cities from '../cities/Cities';
import Address from '../address/address';
import Problems from '../problems/problems';
import ProblemId from '../problemId/problemId';

const dbLinkAll = 'all';
const dbLinkRejected = 'rejected';
const dbLinkUnaccepted = 'unaccepted';
const dbLinkInProgress = 'inProgress';
const dbLinkDone = 'done';

const elementsData = [
   {
      dbLink: 'all',
      pathLink: 'citiesAll',
   },
   {
      dbLink: 'rejected',
      pathLink: 'citiesRejected',
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

function GetElement({ pathLink, dbLink }) {
   return (
      <div>
         <Route exact path={`/${pathLink}`}>
            <Cities dbLink={dbLink} pathLink={pathLink} />
         </Route>
         <Address dbLink={dbLink} pathLink={pathLink} />
         <Problems dbLink={dbLink} pathLink={pathLink} />
         <ProblemId dbLink={dbLink} pathLink={pathLink} />
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
   dbLinkRejected,
   dbLinkUnaccepted,
   dbLinkInProgress,
   dbLinkDone,
   GetElements,
};
