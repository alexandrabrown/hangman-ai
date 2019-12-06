$(document).ready(function() {
	$("#hangmanGame").hide();
	$("#goFish").hide();
	var guessedLetter = '_';
	var gameOver = false;

	$("#submitLetterCount").click(function() {
		var numLetters = $("#letterCount").val();
		if (!parseInt(numLetters)) {
			console.error("not an integer");
			return;
		}
		$("#welcomeDiv").hide();

		var i = 0;
		for(; i < numLetters; ++i) {
			var letterSpace = $('<span>', {id: 'letterSpace' + i});
			letterSpace.append(" _ ");
			$("#guessingZone").append(letterSpace);
			appendHyphenKnownLetters();
		}


		$("#hangmanGame").show();
		initCandidateSet(numLetters);
		if (checkGameOver()) {
			// Length of word is too long
			location.reload();
			return;
		}

		goFish();
		$("#goFish").show();
	});

	$("#goFish").click(goFish);

	$("#guessingZone").delegate("span", "click", function(event) {
		if (checkGameOver()) {
			return;
		}

		var target = $(event.target);
		var targetNum = target.attr('id').substring('letterSpace'.length);
		console.log("space #" + targetNum + " clicked");
		if (target.html() === " _ ") {
			target.html(" " + guessedLetter + " ")
		}
		insertLetterIntoKnownLetters(guessedLetter, targetNum);
		numberOfLettersSelected++;
	});

	function goFish() {
		if (checkGameOver()) {
			return;
		}
		
		if (numberOfLettersSelected == 0) {
			addPart();
		}

		guessedLetter = generateNextGuess().toUpperCase();

		// Found a word to guess, not a letter
		if (guessedLetter.length > 1) {
			var guessedWord = guessedLetter;
			$("#computerGuess").hide();
			if (confirm("Is your word " + guessedWord + "?")) {
				for (index in guessedWord) {
					$("#letterSpace" + index).html(guessedWord[index]);
				}
				alert('YOU LOSE! Get better, scrub!');
			} else {
				alert("Hmm, I think your word doesn't exist - CHEATER.");
				return;
			}
		} else {
			// Guess another letter
			$("#computerGuess").html("Do you have any " + guessedLetter.toUpperCase() + "'s?");
		}
		
	}


	function addPart() {
		$("#part" + nextPartNum).show();
			nextPartNum++;
	}

	function checkGameOver() {
		if (!gameOver) {
			gameOver = computerWins();
			gameOver = gameOver || playerWins();
			return gameOver;
		}
		return false;
	}

	function playerWins() {
		if (nextPartNum > MAX_NUM_PARTS) {
			alert('You Win :D Good luck against V2.0');
			return true;
		}
		if (candidateSet.length == 0) {
			alert("Hmm, I think your word doesn't exist - CHEATER.");
			return true;
		}
		return false;
	}

	function computerWins() {
		var numBlanksLeft = $('#guessingZone span').filter(function(index, element) { 
			return element.innerHTML === " _ "; 
		}).length;
		if (numBlanksLeft == 0 || guessedLetter.length > 1) {
			gameOver = true;
			alert('YOU LOSE! Get better, scrub!');
			return true;
		}
		return false;
	}
});