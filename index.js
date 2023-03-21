const fs = require('fs');

let rawdata = fs.readFileSync('comments.json');
let data = JSON.parse(rawdata);

let stopWordsJSON = fs.readFileSync('stopWords.json');
let stopWords = JSON.parse(stopWordsJSON);

const { NormalizerEn, TokenizerEn, StopwordsEn, StemmerEn } = require('@nlpjs/lang-en');
var pos = require('pos');

const normalizer = new NormalizerEn();
const tokenizer = new TokenizerEn();
const stopwords = new StopwordsEn();
const stemmer = new StemmerEn();

stopwords.dictionary = {};
stopwords.build(stopWords);

var tagger = new pos.Tagger();

data.forEach(element => {
    const result1 = normalizer.normalize(element);
    const result2 = tokenizer.tokenize(result1);
    const result3 = stopwords.removeStopwords(result2)
    const result4 = result3.map(el => stemmer.stemWord(el));
    const result5 = tagger.tag(result4);
    console.log(result5);
});


