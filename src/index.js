import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { reduxStore } from './redux';
import SearchContainer from './containers/TicketsContainer';

import styles from './styles.module.css';

ReactDOM.render((
  <Provider store={reduxStore}>
    <div className={styles.layout}>
      <SearchContainer />
    </div>
  </Provider>
), document.getElementById('root'));
