import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignUp from './components/SignUp'
import SignIn from './components/SignIn';
import Main from './components/Main';
import Upload from './components/Upload';
import Edit from './components/Edit';
import Delete from './components/Delete';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/signin' exact component={SignIn} />
        <Route path='/upload' exact component={Upload} />
        <Route path="/edit/:id" exact component={Edit}/>
        <Route path="/delete/:id" exact component={Delete}/>
      </Switch>
    </Router>
  );
}

export default App;
