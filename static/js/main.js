var text = 'M.N.M HACKERS';
var ctx = document.getElementById("canvas").getContext("2d");

var screenMiddle;

var textWidth;

// TODO: find easy way to find this out ?
var textHeight = 18;

var textXPos = null;
var textYPos = null;
var textVerticalSpacing = 15;

window.addEventListener('resize', resizeCanvas, false);

var animationTimer = setInterval(draw, 5);
resizeCanvas();

function draw() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.font = "50px ZXSpectrum";

	textWidth = ctx.measureText(text).width;
	screenMiddle = screenMiddle || ((canvas.height / 2) - (textHeight / 2));

	textXPos = (canvas.width / 2) - (textWidth / 2);

	var letters = text.split("");

	for (var f = 0; f < letters.length; f++) {
		var letter = letters[f];
		var yPos = textYPos - (textVerticalSpacing * f);

		if (yPos > screenMiddle) {
			yPos = screenMiddle;

			// if the last letter is aligned, stop
			if (f === letters.length - 1) {
				clearInterval(animationTimer);
				animationTimer = null;
			}
		}

		ctx.fillText(letter,textXPos, yPos);
		textXPos += ctx.measureText(letter).width;
	}

	textYPos += 1;
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	screenMiddle = null;

	if (!animationTimer) {
		textYPos = -10;
		animationTimer = setInterval(draw, 5);
	}
}
