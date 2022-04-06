import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Cities from '../cities/cities';
import Addres from '../addres/addres';
import Problems from '../problems/problems';
import ProblemId from '../problemId/problemId';

const dbLinkAll = 'all';
const dbLinkUnaccepted = 'unaccepted';
const dbLinkInProgress = 'inProgress';
const dbLinkDone = 'done';

function GetElementsAll() {
   return (
      <div>
         <Route exact path="/citiesAll">
            <Cities dbLink={dbLinkAll} pathLink="citiesAll" />
         </Route>
         <Addres dbLink={dbLinkAll} pathLink="citiesAll" />
         <Problems dbLink={dbLinkAll} pathLink="citiesAll" />
         <ProblemId dbLink={dbLinkAll} pathLink="citiesAll" />
      </div>
   );
}

function GetElementsUnaccepted() {
   return (
      <div>
         <Route exact path="/citiesUnaccepted">
            <Cities dbLink={dbLinkUnaccepted} pathLink="citiesUnaccepted" />
         </Route>
         <Addres dbLink={dbLinkUnaccepted} pathLink="citiesUnaccepted" />
         <Problems dbLink={dbLinkUnaccepted} pathLink="citiesUnaccepted" />
         <ProblemId dbLink={dbLinkUnaccepted} pathLink="citiesUnaccepted" />
      </div>
   );
}

function GetElementsInProgress() {
   return (
      <div>
         <Route exact path="/citiesInProgress">
            <Cities dbLink={dbLinkInProgress} pathLink="citiesInProgress" />
         </Route>
         <Addres dbLink={dbLinkInProgress} pathLink="citiesInProgress" />
         <Problems dbLink={dbLinkInProgress} pathLink="citiesInProgress" />
         <ProblemId dbLink={dbLinkInProgress} pathLink="citiesInProgress" />
      </div>
   );
}

function GetElementsDone() {
   return (
      <div>
         <Route exact path="/citiesDone">
            <Cities dbLink={dbLinkDone} pathLink="citiesDone" />
         </Route>
         <Addres dbLink={dbLinkDone} pathLink="citiesDone" />
         <Problems dbLink={dbLinkDone} pathLink="citiesDone" />
         <ProblemId dbLink={dbLinkDone} pathLink="citiesDone" />
      </div>
   );
}

export {
   dbLinkAll,
   dbLinkUnaccepted,
   dbLinkInProgress,
   dbLinkDone,
   GetElementsAll,
   GetElementsUnaccepted,
   GetElementsInProgress,
   GetElementsDone,
};
