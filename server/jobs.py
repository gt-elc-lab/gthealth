import argparse

from pipeline import crawler
from pipeline import classifier

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('--update', help='run the crawler', action="store_true")
def get_new_posts():
    crawler.Crawler(classifier.SimpleClassifier()).run()


if __name__ == '__main__':
    args = parser.parse_args()
    if args.update:
        get_new_posts()
        print 'Finished getting new posts'

