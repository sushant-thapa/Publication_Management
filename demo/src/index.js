import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Entry from './components/newentry';
import ListEditor from './components/listeditor';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/addnew/:type" exact component={Entry} />
        <Route exact path="/editlist/:item" component={ListEditor} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
