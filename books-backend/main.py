from fastapi import FastAPI
import pymongo
import rename
from bson.json_util import dumps
import make_predictions
from nltk.sentiment.vader import SentimentIntensityAnalyzer

client = pymongo.MongoClient()
db = client.books
reviews = db.reviews
meta = db.meta

app = FastAPI()
s = SentimentIntensityAnalyzer()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/review/{review_id}")
def read_item(review_id: str):
    r = rename.find_full_isbn(review_id)
    print(meta.find_one({"asin": r}))
    return {"r": dumps(reviews.find_one({'asin': r}))}


@app.get('/info/{isbn}')
def read_book(isbn: str):
    asin = rename.find_full_isbn(isbn)
    print(asin)
    rev_obj = rename.serialize_reviews(reviews.find({'asin': asin}))
    data = rename.serialize_meta(meta.find_one({'asin': asin}))

    for r in rev_obj:
        review = r['reviewText']
        summary = make_predictions.make_prediction(review)
        r['sentiment'] = s.polarity_scores(summary)['compound']
        r['summary'] = summary

    return {'data': data, 'reviews': rev_obj}
