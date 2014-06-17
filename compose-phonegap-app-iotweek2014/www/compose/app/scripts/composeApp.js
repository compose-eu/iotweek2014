'use strict';

var composeApp = angular.module('composeApp', [ 'ngRoute' ]);

//Routes configuration
composeApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        controller : 'NavigationController',
        templateUrl : 'compose/app/views/NavigationView.html'
    }).when('/product/:productId', {
        controller : 'ProductController',
        templateUrl : 'compose/app/views/ProductView.html'
    }).when('/notfound', {
        controller : 'NotfoundController',
        templateUrl : 'compose/app/views/NotfoundView.html'
    }).when('/login', {
        controller : 'LoginController',
        templateUrl : 'compose/app/views/LoginView.html'
    }).otherwise({
        redirectTo : '/'
    });
});