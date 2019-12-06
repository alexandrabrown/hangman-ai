var dictionary = [];
var candidateSet = [];
var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var knownLetters = "";
var guessedLetters = [];
var CHAR_HYPEN = '-';
var remainingLetters = alphabet;

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

function appendHyphenKnownLetters() {
    knownLetters += CHAR_HYPEN;
}

function initCandidateSet(wordLength) {
    for (wordIndex in dictionary) {
        var word = dictionary[wordIndex].trim();
        if (word.length == wordLength) {
            candidateSet.push(word);
        }
    }
}

function generateNewCandidateSet() {
    var newCandidateSet = [];
    for (candidateWordIndex in candidateSet) {
        var candidateWord = candidateSet[candidateWordIndex];
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

function generateNextGuess() {
    generateNewCandidateSet();
	var letterFrequencyMap = {};
	remainingLetters.split("").forEach(function(letter) {
		letterFrequencyMap[letter] = 0;
		dictionary.forEach(function(word) {
			if (word.includes(letter)) {
				letterFrequencyMap[letter]++;
			}
		});
	});
	var currentMaxValue = 0;
	var currentMaxLetter = 'a';
	remainingLetters.split("").forEach(function (letter) {
		if (letterFrequencyMap[letter] > currentMaxValue) {
			currentMaxValue = letterFrequencyMap[letter];
			currentMaxLetter = letter;
		}
	});
	guessedLetters.push(currentMaxLetter);
	remainingLetters = remainingLetters.replace(currentMaxLetter, "");
	return currentMaxLetter;
}