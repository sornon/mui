var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;
var Master = require('./components/master.jsx');


var AppRoutes = (
    <Route name = "root" path = "/" handler={Master}>
    </Route>
);

module.exports = AppRoutes;