from datetime import datetime
import praw

import config
import classifier
import model

class Crawler(object):

    def __init__(self, classifier):
        self.classifier = classifier

    def run(self):
        r = praw.Reddit(user_agent='gthealth')
        submissions = filter(self.classifier.classify,
            r.get_subreddit('depression').get_new(limit=20))
        for post in map(self.post_from_praw_submission, submissions):
            post.save()

    def post_from_praw_submission(self, submission):
        return model.Post(r_id=submission.id,
                          content=submission.selftext,
                          title=submission.title,
                          created=datetime.utcfromtimestamp(
                            submission.created_utc))
if __name__ == '__main__':
    Crawler(classifier.SimpleClassifier()).run()