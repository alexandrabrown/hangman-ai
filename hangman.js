var numLetters = 0;

$(document).ready(function() {
    storeDictionary();
});

function readFile(file) {
    $.get(file, function(data) {
        console.log( "Data Loaded: " + data );
    });
}

function storeDictionary() {
    readFile('words_alpha.txt');
}

function chooseWordLength(input) {
    numLetters = input;
}

