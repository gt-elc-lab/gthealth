require('angular');
require('angular-ui-router');

var gthealth = angular.module('gthealth', ['ui.router']);
gthealth.service('CurrentUserService', CurrentUserService);
gthealth.service('AuthenticationService', AuthenticationService);
gthealth.controller('LoginStateController', LoginStateController);
gthealth.controller('RegisterStateController', RegisterStateController);
gthealth.controller('FeedStateController', FeedStateController);

gthealth.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push(function() {
        var baseUrl = 'http://localhost:5000';
        return {
            request: function(config) {
                if (config.headers['Content-Type'] == 'application/json;charset=utf-8') {
                    config.url = baseUrl + config.url;
                }
                return config;
            }
        };
    });

    $urlRouterProvider.otherwise("/home/login");
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
        .state('feed', {
            url: 'feed',
            templateUrl: 'partials/feed.html'
        });
});

LoginStateController.$inject = ['$state', 'AuthenticationService'];
function LoginStateController($state, AuthenticationService) {
    this.error = null;
    this.login = function() {
        this.error = null;
        AuthenticationService.login(this.email, this.password).then(function(response) {
            $state.go('feed');
        }.bind(this), function(error) {
            this.error = error;
        }.bind(this));
    };
}

RegisterStateController.$inject = ['$state', 'AuthenticationService'];
function RegisterStateController($state, AuthenticationService) {
    this.error = null;
    this.register = function() {
        this.error = null;
        AuthenticationService.register(this.email, this.password)
            .then(function(response) {
            $state.go('feed');
        }.bind(this), function(error) {
            this.error = error;
        }.bind(this));
    };
}

FeedStateController.$inject = ['$state', '$http', 'AuthenticationService', 'CurrentUserService'];
function FeedStateController($state, $http, AuthenticationService, CurrentUserService) {

}

function CurrentUserService() {
    var currentUser = null;

    this.getCurrentUser = function() {
        return currentUser;
    };

    this.setCurrentUser = function(user) {
        this.currentUser = user;
    };
}

AuthenticationService.$inject = ['$http', '$q', 'CurrentUserService'];
function AuthenticationService($http, $q, CurrentUserService) {

    this.login = function(email, password) {
        var deferred = $q.defer();
        $http.post('/login', {email: email, password: password})
            .then(function(response) {
            CurrentUserService.setCurrentUser(response.data);
            deferred.resolve(response.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    this.logout = function() {

    };

    this.register = function(email, password) {
        var deferred = $q.defer();
        $http.post('/register', {email: email, password: password})
            .then(function(response) {
            CurrentUserService.setCurrentUser(response.data);
            deferred.resolve(response.data);
        }, function(error) {
            deferred.reject(error.data);
        });
        return deferred.promise;
    };
}