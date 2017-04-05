// set key codes
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_ENTER = 13;
const KEY_SPACE = 32;
const KEY_BACKSPACE = 8;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
	canvas1.addEventListener('mousemove', updateMousePos);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	// backspace to erase canvas2
	document.addEventListener('keydown', function (event) {
        if(event.keyCode === KEY_BACKSPACE) {
            canvasContext2.clearRect(0, 0, canvasWidth, canvasHeight)
        }
    });

	// set cars' keys
	blueCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_SPACE);
}

function keySet(keyEvent, whichCar, setTo) {
	// match event's keyCode with car's keyCode
    if(keyEvent.keyCode === whichCar.controlKeyLeft) {
        whichCar.keyHeld_TurnLeft = setTo;
    }
    if(keyEvent.keyCode === whichCar.controlKeyRight) {
        whichCar.keyHeld_TurnRight = setTo;
    }
    if(keyEvent.keyCode === whichCar.controlKeyUp) {
        whichCar.keyHeld_Gas = setTo;
    }
    if(keyEvent.keyCode === whichCar.controlKeyDown) {
        whichCar.keyHeld_Reverse = setTo;
    }
    if(keyEvent.keyCode === whichCar.contolKeyPaint) {
        whichCar.keyHeld_Paint = setTo;
    }

    // turn off default keys' function
    keyEvent.preventDefault();
}

function keyPressed(evt) {
    // set keyHeld to true
    // keySet(evt, pinkCar, true);
    keySet(evt, blueCar, true);

}

function keyReleased(evt) {
    // set keyHeld to false
    // keySet(evt, pinkCar, false);
    keySet(evt, blueCar, false);
}

function updateMousePos(evt) {
	var rect = canvas1.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	// cheat / hack to test car in any position
	/*carX = mouseX;
	carY = mouseY;
	carSpeedX = 4;
	carSpeedY = -4;*/
}

