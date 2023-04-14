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

var TfIdf = require('./TfIdf')

var tfIdf = new TfIdf()

let array = [];
let arrayOfWords = []

data.forEach(element => {

    const result1 = normalizer.normalize(element)
    let removeNumbers = result1.replace(/[0-9]/g, '');

    const result2 = tokenizer.tokenize(removeNumbers);

    const result3 = stopwords.removeStopwords(result2)
    const result4 = result3.map(el => stemmer.stemWord(el));

    array.push(result3)

    result4.forEach(element => {
        if(!arrayOfWords.includes(element)) arrayOfWords.push(element)
    });

    // const result5 = tagger.tag(result4);

});

let final = []

arrayOfWords.forEach(element => {
    final.push([element,tfIdf.weights(array,element)])
});


const jsonexport = require('jsonexport');

jsonexport(final, function(err, csv){
    if (err) return console.error(err);
    
    fs.appendFileSync('./contacts.csv', csv.replace(/;/g, ','));
});

