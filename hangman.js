var dictionary = [];
var candidateSet = [];
var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var knownLetters = "";
var guessedLetters = [];
var CHAR_HYPEN = '-';
var remainingLetters = alphabet;
var numberOfLettersSelected = null;
var nextPartNum = 1;
var MAX_NUM_PARTS = 5;

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

function insertLetterIntoKnownLetters(letter, index) {
    var index = parseInt(index);
    letter = letter.toLowerCase()
    knownLetters = knownLetters.substr(0, index) + letter + knownLetters.substr(index + 1);
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


            // If we've already guessed it and it's not in our knownLetters
            if (guessedLetters.includes(candidateLetter) && !knownLetters.includes(candidateLetter)) {
                allLettersMatch = false;
                break;
            }

            // Ignore hyphens - good, keep going
            if (knownLetter == CHAR_HYPEN) {
                continue;
            }

            // If letters don't match
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
    if (candidateSet.length == 1) {
        return candidateSet[0];
    }
    numberOfLettersSelected = 0;
    generateNewCandidateSet();
	var letterFrequencyMap = {};
	remainingLetters.split("").forEach(function(letter) {
		letterFrequencyMap[letter] = 0;
		candidateSet.forEach(function(word) {
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