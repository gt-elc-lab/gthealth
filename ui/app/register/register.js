exports.RegisterViewController = RegisterViewController;
exports.RegisterFormController = RegisterFormController;
exports.ConfirmationView = ConfirmationViewController;

RegisterViewController.$inject = ['$state', 'AuthenticationService'];
function RegisterViewController($state, AuthenticationService) {

}

ConfirmationViewController.$inject = ['$state', '$http', '$timeout'];
function ConfirmationViewController($state, $http, $timeout) {
    var email = $state.params.email;
    var token = $state.params.token;

    init.call(this);

    function init() {
        if (!email) {
            // show error message
            return
        }
        $http.post('/api/activate/' + email, {token: token}).then(
            function(response) {
            //show success message
            $timeout(function() {
                $state.go('home.login');
            }, 3000);

        }, function(response) {

        });
    }
}

RegisterFormController.$inject = ['$state', 'AuthenticationService'];
function RegisterFormController($state, AuthenticationService) {
    this.register = function() {
        if (this.Form.$valid) {
            AuthenticationService.register(this.Form.email, this.Form.password)
                .then(function(response) {
                this.Form.$success = {authentication: true};
            }.bind(this), function(error) {
                this.Form.$error.authentication = true;
                this.Form.errorMessage = error.message;
            }.bind(this));
        }
    };
}