import praw
import config
import random
import string

class RedditBot(object):
    def __init__(self):
        self.reddit = praw.Reddit(user_agent=self.random_name())
        self.login()
        return

    def login(self, username=config.BOT_CREDENTIALS['username'], password=config.BOT_CREDENTIALS['password']):
        """
        Instantiate Reddit login.
        
        Args:
            username (str)
            password (str)
        """
        self.reddit.login(username, password)

    def submit(self, subreddit, title, url=None, text=None):
        self.reddit.submit(subreddit, title, url=url, text=text)

    def random_name(self, length=10):
        """
        Generate random alphabetical string for the instances name.

        Args:
            length (int) : length of the generated string

        Returns:
            a random string

        """
        return ''.join(random.choice(string.ascii_letters)
            for i in range(length))