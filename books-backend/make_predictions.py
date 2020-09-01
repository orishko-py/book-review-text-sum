import torch
import json

from transformers import BartTokenizer, BartForConditionalGeneration

model = BartForConditionalGeneration.from_pretrained(
    './saved_distilbart_model')
tokenizer = BartTokenizer.from_pretrained("sshleifer/distilbart-xsum-12-3")
device = torch.device('cpu')
model.eval()


def make_prediction(review):
    prepared_review = "summarize: " + review.strip().replace('\n', "")
    tokenized_review = tokenizer.encode(
        prepared_review, return_tensors="pt").to(device)

    summary_ids = model.generate(tokenized_review,
                                 num_beans=4,
                                 no_repeat_ngram_size=2,
                                 max_length=30)
    generated_summary = tokenizer.decode(summary_ids[0],
                                         skip_special_tokens=True)
    if generated_summary[-1] == '.':
        return generated_summary.capitalize()
    else:
        return generated_summary.capitalize() + '.'
