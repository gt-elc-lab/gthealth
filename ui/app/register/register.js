exports.RegisterViewController = RegisterViewController;
exports.RegisterFormController = RegisterFormController;

RegisterViewController.$inject = ['$state', 'AuthenticationService'];
function RegisterViewController($state, AuthenticationService) {

}

RegisterFormController.$inject = ['$state', 'AuthenticationService'];
function RegisterFormController($state, AuthenticationService) {

    this.register = function() {
        if (this.Form.$valid) {
            AuthenticationService.register(this.Form.email, this.Form.password)
                .then(function(response) {
                $state.go('main');
            }.bind(this), function(error) {
                this.Form.$error.authentication = true;
                this.Form.message = error.message;
            }.bind(this));
        }
    };
}