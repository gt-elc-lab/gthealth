exports.CurrentUserService = CurrentUserService;
exports.AuthenticationService = AuthenticationService;

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
        CurrentUserService.setCurrentUser(null);
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
