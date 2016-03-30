require('angular');
// require('jquery');
// require('bootstrap');





var controllers = require('./controllers');
var directives = require('./directives');
var services = require('./services');
var utils = require('./utils');


var gthealth = angular.module('gthealth', [
        require('angular-ui-router'),
        require('angular-resource'),
        require('angular-animate'),
        require('angular-messages')

    ]);

gthealth
    .service('CurrentUserService', services.CurrentUserService)
    .service('AuthenticationService', services.AuthenticationService)
    .service('Post', utils.Post)
    .service('ResponseListModel', utils.ResponseListModel)

    .directive('feedPostCard', directives.FeedPostCard)
    .directive('responseCard', directives.ResponseCard)
    .directive('loadingIndicator', directives.DataLoadingIndicator)

    .controller('MainViewController', controllers.MainViewController)
    .controller('FeedViewController', controllers.FeedViewController)
    .controller('ReplyViewController', controllers.ReplyViewController);

require('./login');
require('./register');

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
            controller: 'LoginViewController',
            controllerAs: 'LoginView'
        })
        .state('home.register', {
            url: '/register',
            templateUrl: 'partials/register.html',
            controller: 'RegisterViewController',
            controllerAs: 'RegisterView'
        })
        .state('home.about', {
            url: '/about',
            templateUrl: 'partials/about.html'
        })
        .state('home.confirmation', {
            url: '/confirmation/:id/:token',
            templateUrl: 'partials/confirmation.html',
            controller: 'ConfirmationViewController',
            controllerAs: 'ConfirmationView',
        })
        .state('main', {
            url: '/main',
            templateUrl: 'partials/main.html',
        })
        .state('main.feed', {
            url: '/feed',
            templateUrl: 'partials/feed.html',
            controller: 'FeedViewController',
            controllerAs: 'FeedView'
        })
        .state('main.reply', {
            url: '/reply/:_id',
            templateUrl: 'partials/reply.html',
            controller: 'ReplyViewController',
            controllerAs: 'ReplyView',
            params: {
                post: null
            }
        })
        .state('main.settings', {
            url: '/settings',
            templateUrl: 'partials/settings.html'
        });
});

