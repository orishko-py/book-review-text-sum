import json
from rake_nltk import Rake
from nltk.corpus import stopwords

rake = Rake(min_length=2, max_length=4,
            stopwords=stopwords.words('english').extend(['book', 'review']))


def find_missing_isbn(s):
    print(s)
    rev_s = reversed(s)
    digits = (int(c) for c in rev_s)
    digits = (d * i for i, d in enumerate(digits, start=2))
    return 11 - sum(digits) % 11


def find_full_isbn(s):
    crop_s = s[3:-1]
    return crop_s+str(find_missing_isbn(crop_s))


def serialize_meta(meta):
    d = {'title': meta['title'], 'description': meta['description']}
    return d


def serialize_reviews(reviews):
    clean_reviews = []
    for r in reviews:
        print(r)
        print(r['overall'])
        rake.extract_keywords_from_text(r['reviewText'])
        review = {
            'id': str(r.get('_id')),
            'reviewerName': r['reviewerName'],
            'overall': r['overall'],
            'reviewText': r['reviewText'],
            'keywords': rake.get_ranked_phrases()
        }
        clean_reviews.append(review)
    return clean_reviews
