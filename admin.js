$(document).ready(function() {
	$("#hangmanGame").hide();
	$("#submitLetters").hide();

	$("#submitLetterCount").click(function() {
		var numLetters = $("#letterCount").val();
		if (!parseInt(numLetters)) {
			console.error("not an integer");
			return;
		}
		initCandidateSet(numLetters);
		$("#welcomeDiv").hide();

		var i = 0;
		for(; i < numLetters; ++i) {
			var letterSpace = $('<span>', {id: 'letterSpace' + i});
			letterSpace.append(" _ ");
			$("#guessingZone").append(letterSpace);
			appendHyphenKnownLetters();
		}


		$("#hangmanGame").show();
	});


	$("#guessingZone").delegate("span", "click", function(event) {
		var target = event.target;
		var targetNum = $(target).attr('id').substring('letterSpace'.length);
		console.log("space #" + targetNum + " clicked");
	});
});