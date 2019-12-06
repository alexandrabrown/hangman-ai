var dictionary = [];
var candidateSet = [];
var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var knownLetters = ['e' => [0, 2], 'l' => [1] ]; //elephant

$(document).ready(function() {
    storeDictionary();
});

function storeDictionary() {
    readFile('words_alpha.txt');
}

function readFile(file) {
    $.get(file, function(data) {
        dictionary = data.split("\n");
    });
}

function candidateSet(wordLength) {
    for (word in dictionary) {
        if (word == wordLength) {
            candidateSet.push(word);
        }
    }
}

function generateNewCandidateSet(knownLetters) {
    for (letter in knownLetters) {
        for (indices in knownLetters[letter]) {

        }

    }
    for (word in candidateSet) {
        for (letter in word) {

        }
    }
}

