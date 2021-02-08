import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import { UserProvider } from "./context/Auth";
import { ServerProvider } from "./context/Server";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Pinger from "./components/Pinger";
import CreateServer from "./components/Helpers/CreateServer";

function App() {
  return (
    <div className="app">
      <UserProvider>
        <ServerProvider>
          <Router>
            <div className="App"></div>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/signup" exact>
                <Signup />
              </Route>
              <Route path="/create/server" exact>
                <CreateServer />
              </Route>
              <Route path="/phoenix/secretpath" exact>
                <Pinger />
              </Route>
            </Switch>
          </Router>
        </ServerProvider>
      </UserProvider>
    </div>
  );
}

export default App;
