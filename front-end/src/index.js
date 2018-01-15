import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import {configureStore} from './configureStore';
import { BrowserRouter } from 'react-router-dom';
import {fetchCategories} from './actions/categoryActions';
import {fetchAllPosts} from './actions/postActions';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
const store = configureStore();
store.dispatch(fetchCategories());
store.dispatch(fetchAllPosts());
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
 document.getElementById('root'));
registerServiceWorker();
