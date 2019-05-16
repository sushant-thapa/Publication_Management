import React from 'react';
import Homepage from './components/homepage_component/homepage';
import AddNewPage from './components/addnewpage_component/addnewpage';
import Edit from './components/edit_component/edit';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import addPublication from './database/insert';

function App() {
  return (
    <div>
      <Router>
        <Route path = "/" exact component = {Homepage} />
        <Route path = "/add" component = {AddNewPage} />
        <Route path = "/edit" component = {Edit} />
      </Router>
    </div>
  );
}

export default App;
