import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Characters from './components/Characters';
import CharacterProfile from './components/CharacterProfile';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/characters' component={Characters} />
    <Route path='/characters/:apikey' component={Characters} />
    <Route path='/profilepage/:characterName' component={CharacterProfile} />
  </Route>
);