exports.Post = Post;
exports.ResponseListModel = ResponseListModel;

Post.$inject = ['$resource'];
function Post($resource) {
    return $resource('/api/post/:_id', {_id: '@_id'}, {
        query: {
            method: 'GET',
            isArray: true
        }
    });
}


function ResponseListModel() {
    // TODO(simplyfaisal): Create content
    var responses = [{
            title: 'Individual Counseling',
            content: 'The counseling center provides individual meetings with a counselor, often on a weekly or bi-weekly basis.  The individual counseling services are provided by intern counselors and by senior staff. To register for this service, you can stop by the counseling office on the second floor of the Student Services building (Flag Building) between 8:00 am and 4:00 pm, Monday through Friday, and allow about 30 minutes to complete the initial information forms.',
        }, {
            title: 'Peer Coaching',
            content: 'The counseling center provides a  Student Peer Coaching program.  The Student Peer Coaching program is a unique way for students to reach out to someone they can relate to and get support from. Students serving as Peer Coaches are para-professionals, trained to assist fellow students in identifying and accomplishing specific academic, social or other personal goals related to concerns commonly faced in college.  Peer Coaches are not trained counselors or therapists. Some problems peer coaching can help address include: Adjustment to College/Tech Culture, Academic Struggles, Career Uncertainty, Stress, and Relationship Concerns. To registerer the Peer Coaching program simply come by the counseling office on the second floor of the Student Services building (Flag Building) between 8:00 am and 4:00 pm, Monday through Friday, and allow about 30 minutes to complete the initial information forms',
        }];

    return responses;
}