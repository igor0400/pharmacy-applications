import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/app/App';
// import store from './store';

import './index.css';

const defaultState = {
   all: {
      '-N0aTPjM1LRkjm2gZg1c': {
         address: 'АДБ №85 ул. Елькина, д. 3А',
         city: 'Заозёрск',
         comment: 'привет',
         date: '26.04.2022 17:26:24',
         dateDone: '26.04.2022 18:24:28',
         id: '-N0aG1a3H_evT19zMKvG',
         id2: '26.04.2022 17:26:24',
         name: 'Пупкин В. С.',
         phone: '+79110000000',
         position: 'зав',
         prioritet: 'Cрочно',
         problem: 'закрылась дверь и не открывается уже год',
         status: 'Выполнено',
      },
   },
};

const reduser = (state = defaultState, action) => {
   switch (action.type) {
      case 'MOVE':
         
      default:
         return state;
   }
};

const store = createStore(reduser);

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <App />
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
);
