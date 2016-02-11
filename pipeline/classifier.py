import nltk

class Classifier(object):
    """ Interface """

    def classify(submission):
        raise NotImplementedError()

class SimpleClassifier(object):

    def classify(self, submission):
        keywords = set(['depressed', 'depression', 'suicide', 'suicidal', 'kill', 'sad', 'unhappy',
                    'fuck', 'fucking', 'hate', 'counseling', 'counselor', 'psychiatrist',
                    'hate', 'death', 'die', 'heartbroken', 'lonely', 'hopeless', 'scared',
                    'suffer', 'failure', 'therapy', 'cry', 'alone', 'loser']);
        tokens = nltk.tokenize.word_tokenize(submission.content)
        for word in tokens:
            if word in keywords:
                return True
        return False

