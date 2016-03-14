var gthealth = require('angular').module('gthealth');
var login = require('./login');

gthealth
    .controller('LoginViewController', login.LoginViewController)
    .controller('LoginFormController', login.LoginFormController);