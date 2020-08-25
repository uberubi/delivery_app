import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Address from "./pages/Address";
import Orders from "./pages/Orders";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <h1>Local market app</h1>
          <AuthRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <AuthRoute exact path="/products" component={Products} />
          <AuthRoute exact path="/address" component={Address} />
          <AuthRoute exact path="/orders" component={Orders} />
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
