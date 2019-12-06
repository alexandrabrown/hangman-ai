var dictionary = [];
var candidateSet = [];
var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var knownLetters = "ele-----";
var CHAR_HYPEN = '-';

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
        if (word.length == wordLength) {
            candidateSet.push(word);
        }
    }
}

function generateNewCandidateSet(knownLetters) {
    var newCandidateSet = [];
    for (candidateWord in candidateSet) {
        var allLettersMatch = true;
        for (index = 0; index < candidateWord.length; ++index) {
            var candidateLetter = candidateWord[index];
            var knownLetter = knownLetters[index];
            // candidateWord and knownLetters strings should be the same length

            if (knownLetter == CHAR_HYPEN) {
                continue;
            }
            if (candidateLetter != knownLetter) {
                allLettersMatch = false;
                break;
            }
        }
        if (allLettersMatch) {
            newCandidateSet.push(candidateWord);
        }

    }
    candidateSet = newCandidateSet;
    console.log(candidateSet);
}

