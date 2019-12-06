$(document).ready(function() {
	$("#hangmanGame").hide();
	$("#goFish").hide();
	var guessedLetter = '_';

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
		goFish();
		$("#goFish").show();
	});

	function goFish() {
		guessedLetter = generateNextGuess().toUpperCase();
		$("#computerGuess").html("Do you have any " + guessedLetter.toUpperCase() + "'s?");
	}

	$("#goFish").click(goFish);

	$("#guessingZone").delegate("span", "click", function(event) {
		var target = $(event.target);
		var targetNum = target.attr('id').substring('letterSpace'.length);
		console.log("space #" + targetNum + " clicked");
		target.html(" " + guessedLetter + " ")
	});
});