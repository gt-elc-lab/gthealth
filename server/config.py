import os

BOT_CREDENTIALS = {
        'username':'gthealth',
        'password':'password'
    }

MAIL_SETTINGS = {
        'server': 'smtp.gmail.com',
        'port': 587,
        'username': 'gtgoodhealth@gmail.com',
        'password': 'GeorgeP@1927'
    }

TEST_DB_URI = 'mongodb://test:gthealthtest@ds015919.mlab.com:15919/gthealth_test'
ACTIVATION_LINK = 'localhost:4000/#/home/confirmation/{_id}/{token}'
PROD_ACTIVATION_LINK = 'www.george.gatech.edu/gthealth/#/home/confirmation/{_id}/{token}'

SUBREDDITS = [
            {'name': 'McGill University', 'subreddit': 'mcgill'},
            {'name': 'Georgia Tech', 'subreddit': 'gatech'},
            {'name': 'UT Austin', 'subreddit': 'UTAustin'},
            {'name': 'Penn State University', 'subreddit': 'PennStateUniversity'},
            {'name': 'Purdue', 'subreddit': 'purdue'},
            {'name': 'UC Berkeley', 'subreddit': 'berkeley'},
            {'name': 'CalPoly Ubispo', 'subreddit': 'CalPoly'},
            {'name': 'UC Santa Barbara', 'subreddit': 'ucsantabarbara'},
            {'name': 'North Carolina State University', 'subreddit': 'ncsu'},
            {'name': 'York University', 'subreddit': 'yorku'},
            {'name': 'Texas A&M', 'subreddit': 'aggies'},
            {'name': 'Arizona State University', 'subreddit': 'asu'},
            {'name': 'University of Central Florida', 'subreddit': 'ucf'},
            {'name': 'University of British Columbia', 'subreddit': 'UBC'},
            {'name': 'University of Maryland', 'subreddit': 'UMD'},
            {'name': 'Rochester Institute of Technology', 'subreddit': 'rit'},
            {'name': 'Ohio State University', 'subreddit': 'OSU'},
            {'name': 'UC San Diego', 'subreddit': 'ucsd'},
            {'name': 'University of Missouri', 'subreddit': 'mizzou'},
            {'name': 'University of Georgia', 'subreddit': 'UGA'}
      ]

keywords = set(['depressed', 'depression', 'suicide', 'suicidal', 'kill',
                    'unhappy', 'counseling', 'counselor', 'psychiatrist',
                    'hate', 'death', 'die', 'heartbroken', 'lonely', 'hopeless',
                    'scared', 'suffer','failure', 'therapy', 'cry', 'alone', 'loser']);

class ConfigurationManager(object):

    def __init__(self):
        return

    @property
    def uri(self):
        return os.environ.get('URI') or TEST_DB_URI
