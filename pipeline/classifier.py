import nltk

class Classifier(object):
    """ Interface """

    def classify(submission):
        raise NotImplementedError()

class SimpleClassifier(object):

    def classify(self, submission):
        return True