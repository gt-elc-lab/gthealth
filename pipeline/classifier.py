import nltk

class Classifier(object):
    """ Interface """

    def classify(submission):
        raise NotImplementedError()

class SimpleClassifier(object):
    
    def classify(self, submission):
        checker = False;
        keyWords = ['depressed', 'depression', 'suicide', 'suicidal', 'kill', 'sad', 'unhappy',
                    'fuck', 'fucking', 'hate', 'counseling', 'counselor', 'psychiatrist',
                    'hate', 'death', 'die', 'heartbroken', 'lonely', 'hopeless', 'scared',
                    'suffer', 'failure', 'therapy', 'cry', 'alone', 'loser'];
        arrayWords = submission.split();
        for word in arrayWords:
            for x in keyWords:
                if x in string:
                    checker = True;
        return checker;
            
