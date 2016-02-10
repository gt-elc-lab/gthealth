import nltk

class Classifier(object):
    """ Interface """

    def classify(submission):
        raise NotImplementedError()

class SimpleClassifier(object):
    
    def classify(self, submission):
        checker = False;
        keyWords = set(['depressed', 'depression', 'suicide', 'suicidal', 'kill', 'sad', 'unhappy',
                    'fuck', 'fucking', 'hate', 'counseling', 'counselor', 'psychiatrist',
                    'hate', 'death', 'die', 'heartbroken', 'lonely', 'hopeless', 'scared',
                    'suffer', 'failure', 'therapy', 'cry', 'alone', 'loser']);
        arrayWords = submission.split();
        for word in arrayWords:
            if word in keyWords:
                checker = True;
        return checker;
            
