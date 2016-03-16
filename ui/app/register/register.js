exports.RegisterViewController = RegisterViewController;
exports.RegisterFormController = RegisterFormController;
exports.ConfirmationView = ConfirmationViewController;

RegisterViewController.$inject = ['$state', 'AuthenticationService'];
function RegisterViewController($state, AuthenticationService) {

}

ConfirmationViewController.$inject = ['$state', '$http', '$timeout'];
function ConfirmationViewController($state, $http, $timeout) {
    var id = $state.params.id;
    var token = $state.params.token;
    this.success = false;

    init.call(this);

    function init() {
        if (!id) {
            // show error message
            return
        }
        $http.post('/api/activate/' + id, {token: token}).then(
            function(response) {

            this.success = true;
            $timeout(function() {
                $state.go('home.login');
            }, 3000);

        }.bind(this), function(response) {

        }.bind(this));
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