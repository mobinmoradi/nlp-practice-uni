function TfIdf() {
}

TfIdf.prototype.weights = function(documents,term) {
    
    var results = []
    
    var idf = this.idf(documents,term)
    
    for(var i=0;i<documents.length;i++) {
        
        var tf = this.tf(documents[i],term)
        var tfidf = tf*idf
        var result = tfidf 
        
        results.push(result)
    }

    return results
}

TfIdf.prototype.tf = function(words,term) {

    var result = 0
    
    for(var i=0;i<words.length;i++) {

        var word = words[i]

        if(word.indexOf(term)!=-1) {
            result = result+1
        }    
    }
    return result/words.length
}

TfIdf.prototype.idf = function(documents,term) {
   
    var occurence = 0

    for(var j=0;j<documents.length;j++) {
        
        var doc = documents[j]
        
        if(this.__wordInsideDoc(doc,term)){
            occurence = occurence+1
        }                  
    }

    if(occurence==0) {
        return undefined    
    }

    return Math.log(documents.length/occurence)
}

TfIdf.prototype.__wordInsideDoc = function(doc,term) {
    
    for(var i=0;i<doc.length;i++) {

        var word = doc[i]

        if(word.indexOf(term)!=-1) {
            return true
        }
    }    

    return false
}

module.exports = TfIdf