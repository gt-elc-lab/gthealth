var gthealth = require('angular').module('gthealth');

var register = require('./register');

gthealth
    .controller('RegisterViewController', register.RegisterViewController)
    .controller('RegisterFormController', register.RegisterFormController);