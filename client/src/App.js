import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Address from "./pages/Address";

const App = () => {
  return (
    <Router>
      <Container>
        <MenuBar />
        <h1>Local market app</h1>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/address" component={Address} />
      </Container>
    </Router>
  );
};

export default App;
