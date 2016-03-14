exports.LoginViewController = LoginViewController;
exports.LoginFormController = LoginFormController;

LoginViewController.$inject = ['$state'];
function LoginViewController($state) {

}


LoginFormController.$inject = ['$state', 'AuthenticationService'];
function LoginFormController($state, AuthenticationService) {

    this.login = function() {
        if (this.Form.$valid) {
            AuthenticationService.login(this.Form.email, this.Form.password)
            .then(function(response) {
                $state.go('main.feed');
            }.bind(this), function(error) {
                this.Form.$error.authentication = true;
                this.Form.message = error.message;
            }.bind(this));
        }
    };
}