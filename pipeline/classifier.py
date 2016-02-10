import nltk

class Classifier(object):
    """ Interface """

    def classify(submission):
        raise NotImplementedError()

class SimpleClassifier(object):
    
    def classify(self, submission):
        checker = False;
        arrayWords = submission.split();
        for word in arrayWords:
            for x in word:
                if x in string:
                    checker = True;
        return checker;
            
