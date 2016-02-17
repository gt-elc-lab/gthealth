from datetime import datetime
import praw
import config
import classifier
import model

class Crawler(object):

    def __init__(self, classifier):
        self.classifier = classifier

    def run(self, subreddit='depression'):
        r = praw.Reddit(user_agent='gthealth')
        posts = map(self.post_from_praw_submission,
            r.get_subreddit(subreddit).get_new(limit=20))
        for post in filter(self.classifier.classify, posts):
            post.save()

    def runSample(self, subreddit='depression'):
        r = praw.Reddit(user_agent='gthealth')
        posts = map(self.sample_from_praw_submission,
            r.get_subreddit(subreddit).get_new(limit=20))
        for post in filter(self.classifier.classify, posts):
            post.save()

    def sample_from_praw_submission(self, submission):
        return model.Sample(content=submission.selftext)

    def post_from_praw_submission(self, submission):
        return model.Post(r_id=submission.id,
                          content=submission.selftext,
                          title=submission.title,
                          created=datetime.utcfromtimestamp(
                            submission.created_utc))

def download_corpus():
    """ Performs a search for depression related posts on all of our subreddits"""
    for school in config.SUBREDDITS:
        print 'Fetching classified posts from %s' % (school['name'])
        Crawler(classifier.SimpleClassifier()).runSample(
          subreddit = school['subreddit'])
        

if __name__ == '__main__':
    #Crawler(classifier.SimpleClassifier()).run()
    download_corpus()
