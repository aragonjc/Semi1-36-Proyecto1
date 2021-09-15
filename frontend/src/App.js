import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignUp from './components/SignUp'
import SignIn from './components/SignIn';
import Main from './components/Main';
import Upload from './components/Upload';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/signin' exact component={SignIn} />
        <Route path='/upload' exact component={Upload} />
      </Switch>
    </Router>
  );
}

export default App;
