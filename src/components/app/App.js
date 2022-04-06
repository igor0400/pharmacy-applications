import ListGroup from 'react-bootstrap/ListGroup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import AppItem from '../appItem/appItem';
import AppItemIcon from '../appItem/appItemIcon';
import Header from '../header/header';
import ApplicationsBadge from '../badges/applicationsBadge';
import Footer from '../footer/footer';
import {
   dbLinkAll,
   dbLinkUnaccepted,
   dbLinkInProgress,
   dbLinkDone,
   GetElementsAll,
   GetElementsUnaccepted,
   GetElementsInProgress,
   GetElementsDone,
} from '../getElements/getElements';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import problemred from '../../img/icons/red.svg';
import problemyellow from '../../img/icons/yellow.svg';
import problemgreen from '../../img/icons/green.svg';

function App() {
   function RenderElements() {
      return (
         <div>
            <GetElementsAll />
            <GetElementsUnaccepted />
            <GetElementsInProgress />
            <GetElementsDone />
         </div>
      );
   }

   return (
      <Router>
         <div className="app">
            <Header />
            <main>
               <Switch>
                  <Route exact path="/">
                     <div className="app">
                        <ListGroup variant="flush">
                           <Link to="/citiesAll" className="a">
                              <AppItem
                                 text="Все заявки"
                                 badge={
                                    <ApplicationsBadge dbLink={dbLinkAll} />
                                 }
                              />
                           </Link>

                           <Link to="/citiesUnaccepted" className="a">
                              <AppItemIcon
                                 text="Непринятые"
                                 badge={
                                    <ApplicationsBadge
                                       dbLink={dbLinkUnaccepted}
                                    />
                                 }
                                 img={problemred}
                                 altImg="problem"
                              />
                           </Link>

                           <Link to="/citiesInProgress" className="a">
                              <AppItemIcon
                                 text="В процессе"
                                 badge={
                                    <ApplicationsBadge
                                       dbLink={dbLinkInProgress}
                                    />
                                 }
                                 img={problemyellow}
                                 altImg="problem"
                              />
                           </Link>

                           <Link to="/citiesDone" className="a">
                              <AppItemIcon
                                 text="Выполнено"
                                 badge={
                                    <ApplicationsBadge dbLink={dbLinkDone} />
                                 }
                                 img={problemgreen}
                                 altImg="problem"
                              />
                           </Link>
                        </ListGroup>
                     </div>
                  </Route>
                  <RenderElements />
               </Switch>
            </main>
            <div className="under-footer"></div>
            <Footer />
         </div>
      </Router>
   );
}

export default App;
