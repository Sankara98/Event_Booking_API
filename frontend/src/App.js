import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';

//Pages
import Authpage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Event';
import MainNavigation from './Components/Navigation/MainNavigation'



function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavigation />
          <main className= "main-content"> 
            <Switch>
              <Redirect from path= "/" to= "auth" exact />
              <Route path= "/auth" component= {Authpage}/>
              <Route path= "/events" component= {EventsPage}/>
              <Route path= "/bookings" component= { BookingsPage}/>
            </Switch>
          </main>
      </React.Fragment>
    </BrowserRouter>

  );
}

export default App;
