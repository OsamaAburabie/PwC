import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterAdmin from "./admin/RegisterAdmin";
import Dashboard from "./admin/Dashboard";
import Navbar from "./components/Navbar";
function Routes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin/register" component={RegisterAdmin} />
        <Route path="/admin/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
