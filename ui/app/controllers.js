
exports.FeedViewController = FeedViewController;
exports.ReplyViewController = ReplyViewController;


FeedViewController.$inject = ['$state', '$http', 'Post', 'AuthenticationService', 'CurrentUserService'];
function FeedViewController($state, $http, Post, AuthenticationService, CurrentUserService) {
    this.posts = Post.query();
}

ReplyViewController.$inject = ['$state', 'Post', '$timeout', 'ResponseListModel', 'CurrentUserService'];
function ReplyViewController($state, Post, $timeout, ResponseListModel, CurrentUserService) {
    var currentUser = CurrentUserService.getCurrentUser();
    this.post = $state.params.post ? $state.params.post : Post.get({_id: $state.params._id});
    this.responses = ResponseListModel;

    this.successMessage = {
        visible: false,
        text: "Reply sent!"
    };

    this.sendResponse = respond.bind(this);

    function respond(message) {
        this.successMessage.visible = true;
        $timeout(function() {
            $state.go('main');
        }, 1500);
    }
}