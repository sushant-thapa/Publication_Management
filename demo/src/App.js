import React, { Component } from 'react';
import './App.css';
import Navibar from './navbar';
import UserId from './components/userId';
import TableGen from './components/combined';
import Footer from './components/footer';

class App extends Component {
  render() {
    return (
      <div>
        <Navibar />
        <UserId />
        <TableGen type = "combined" />
        <br />
        <TableGen type = "books" />
        <br />
        <TableGen type = "research-papers" />
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
