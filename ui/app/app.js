require('angular');
require('angular-ui-router');
require('angular-resource');

var controllers = require('./controllers');
var directives = require('./directives');
var services = require('./services');
var utils = require('./utils');


var gthealth = angular.module('gthealth', ['ui.router', 'ngResource'])
    .service('CurrentUserService', services.CurrentUserService)
    .service('AuthenticationService', services.AuthenticationService)
    .service('Post', utils.Post)
    .service('ResponseListModel', utils.ResponseListModel)

    .directive('feedPostCard', directives.FeedPostCard)
    .directive('responseCard', directives.ResponseCard)

    .controller('LoginStateController', controllers.LoginStateController)
    .controller('RegisterStateController', controllers.RegisterStateController)
    .controller('MainStateController', controllers.MainStateController)
    .controller('ReplyStateController', controllers.ReplyStateController);


gthealth.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push(function() {
        var apiUrl = 'http://localhost:5000';
        return {
            request: function(config) {
                if (config.url.startsWith('/api')) {
                    config.url = apiUrl + config.url;
                }
                return config;
            }
        };
    });

    $urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html'
        })
        .state('home.login', {
             url: '/login',
            templateUrl: 'partials/login.html',
            controller: 'LoginStateController',
            controllerAs: 'Login'
        })
        .state('home.register', {
            url: '/register',
            templateUrl: 'partials/register.html',
            controller: 'RegisterStateController',
            controllerAs: 'Register'
        })
        .state('home.about', {
            url: '/about',
            templateUrl: 'partials/about.html'
        })
        .state('main', {
            url: '/main',
            templateUrl: 'partials/main.html',
            controller: 'MainStateController',
            controllerAs: 'Main'
        })
        .state('main.reply', {
            url: '/reply/:_id',
            templateUrl: 'partials/reply.html',
            controller: 'ReplyStateController',
            controllerAs: 'Reply',
            params: {
                post: null
            }
        })
        .state('main.settings', {
            url: '/settings',
            templateUrl: 'partials/settings.html'
        });
});

