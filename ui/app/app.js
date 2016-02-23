require('angular');
require('angular-ui-router');
require('angular-resource');


var gthealth = angular.module('gthealth', ['ui.router', 'ngResource']);
gthealth.service('CurrentUserService', CurrentUserService);
gthealth.service('AuthenticationService', AuthenticationService);
gthealth.service('Post', Post);

gthealth.directive('feedPostCard', FeedPostCard);
gthealth.controller('LoginStateController', LoginStateController);
gthealth.controller('RegisterStateController', RegisterStateController);
gthealth.controller('MainStateController', MainStateController);


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
        .state('main.settings', {
            url: '/settings',
            templateUrl: 'partials/settings.html'
        });
});

Post.$inject = ['$resource'];
function Post($resource) {
    return $resource('/api/post/:id', {id: '@id'}, {
        query: {
            method: 'GET',
            isArray: true
        }
    });
}

function FeedPostCard() {
    return {
        scope: {
            post: '='
        },
        restrict: 'AE',
        templateUrl: 'partials/feedpostcard.html',
        controller: function($scope) {
            var textLimit = 500;
            var showMoreText = 'show more';
            var showLessText = 'show less';

            $scope.textLimit = textLimit;
            $scope.textPrompt = showMoreText;
            $scope.shouldShowButton = $scope.post.content.length > textLimit;

            $scope.message = {
                visible: false,
                text: 'Are you sure you want to discard this message?'
            };

            $scope.showMessage = function() {
                $scope.message.visible =  !$scope.message.visible;
            };

            $scope.show = function() {
                var fn = $scope.textPrompt == showMoreText ? showMore : showLess;
                fn();
            };

            function showMore() {
                $scope.textLimit = Infinity;
                $scope.textPrompt = showLessText;
            }

            function showLess() {
                $scope.textLimit = textLimit;
                $scope.textPrompt = showMoreText;
            }

        }
    }
}

LoginStateController.$inject = ['$state', 'AuthenticationService'];
function LoginStateController($state, AuthenticationService) {
    this.error = null;
    this.login = function() {
        this.error = null;
        AuthenticationService.login(this.email, this.password).then(function(response) {
            $state.go('main');
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
            $state.go('main');
        }.bind(this), function(error) {
            this.error = error;
        }.bind(this));
    };
}

MainStateController.$inject = ['$state', '$http', 'Post', 'AuthenticationService', 'CurrentUserService'];
function MainStateController($state, $http, Post, AuthenticationService, CurrentUserService) {
    this.posts = Post.query();
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
        $http.post('/api/login', {email: email, password: password})
            .then(function(response) {
            CurrentUserService.setCurrentUser(response.data);
            deferred.resolve(response.data);
        }, function(error) {
            deferred.reject(error.data);
        });
        return deferred.promise;
    };

    this.logout = function() {

    };

    this.register = function(email, password) {
        var deferred = $q.defer();
        $http.post('/api/register', {email: email, password: password})
            .then(function(response) {
            CurrentUserService.setCurrentUser(response.data);
            deferred.resolve(response.data);
        }, function(error) {
            deferred.reject(error.data);
        });
        return deferred.promise;
    };
}