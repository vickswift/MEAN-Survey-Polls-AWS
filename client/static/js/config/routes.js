var pollsApp = angular.module('pollsApp', ['ngRoute', 'ngStorage']);

//CONFIG
    pollsApp.config(function($routeProvider){
    $routeProvider

    .when('/', {
        templateUrl: 'partials/login.html'
    })
    .when('/login', {
        templateUrl: 'partials/login.html'
        })
    .when('/home', {
        templateUrl: 'partials/pollsdashboard.html'
        })
    .when('/show/:id', {
        templateUrl: 'partials/showpoll.html',
        controller: 'pollsController as PC'
    })
    .when('/newpoll', {
        templateUrl: '/partials/newpoll.html'
    })

    .when('/logout', {
        redirectTo: '/login'
    })
    .otherwise({
        redirectTo: '/login'
    })
})
