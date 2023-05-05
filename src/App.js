import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Profile from './components/Profile';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/profile" component={ Profile } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
