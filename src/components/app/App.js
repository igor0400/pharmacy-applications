import ListGroup from 'react-bootstrap/ListGroup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';
import { GetElements } from '../getElements/getElements';
import MainPage from '../pages/MainPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fancyapps/ui/dist/fancybox.css';
import './App.css';

function App() {
   return (
      <Router>
         <div className="app">
            <Header />
            <main>
               <Switch>
                  <Route exact path="/">
                     <div className="app">
                        <ListGroup variant="flush">
                           <MainPage />
                        </ListGroup>
                     </div>
                  </Route>
                  <GetElements />
               </Switch>
            </main>
            <div className="under-footer"></div>
            <Footer />
         </div>
      </Router>
   );
}

export default App;
