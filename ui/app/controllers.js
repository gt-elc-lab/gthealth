var moment = require('moment');
exports.FeedViewController = FeedViewController;
exports.ReplyViewController = ReplyViewController;
exports.MainViewController = MainViewController;


FeedViewController.$inject = ['$state', '$http', 'Post', 'AuthenticationService', 'CurrentUserService'];
function FeedViewController($state, $http, Post, AuthenticationService, CurrentUserService) {
    this.posts = Post.query();
}

MainViewController.$inject = ['$state', 'AuthenticationService'];
function MainViewController($state, AuthenticationService) {

    this.logout = function() {
        AuthenticationService.logout();
        $state.go('home');
    };
}

ReplyViewController.$inject = ['$state', '$http','$timeout', 'Post', 'ResponseListModel', 'CurrentUserService'];
function ReplyViewController($state, $http, $timeout, Post, ResponseListModel, CurrentUserService) {
    var currentUser = CurrentUserService.getCurrentUser();
    this.vm = {};
    this.post = $state.params.post;
    if (!this.post) {
        this.post = Post.get({_id: $state.params._id})
        this.post.$promise.then(function(response) {
            this.vm.date = moment(this.post.created.$date)
                .format("dddd, MMMM Do, h:mm a");
            }.bind(this))
    }
    else {
        this.vm.date = this.vm.date = moment(this.post.created.$date)
                .format("dddd, MMMM Do, h:mm a");
    }

    this.responses = ResponseListModel;
    this.successMessage = {
        visible: false,
        text: "Reply sent!"
    };

    this.sendResponse = respond.bind(this);

    function respond(message) {
        this.successMessage.visible = true;
        $http.post('/api/respond/' + this.post._id, {message: message.content})
            .then(function(response) {
                $timeout(function() {
                    $state.go('main.feed');
                }, 2000);
            })
    }
}