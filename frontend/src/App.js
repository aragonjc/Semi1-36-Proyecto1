import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignUp from './components/SignUp'
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/signup' exact component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
