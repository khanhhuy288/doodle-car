const GROUNDSPEED_DECAY_MULT = 0.94; // slow car down when stopped
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

function Car() {
    /*
	this.x = 0;
	this.y = 0;
    this.ang = 0;
    this.speed = 0;
	this.name = "Untitled Car";
    */

	// set default keyHeld to false
    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;

    this.setupInput = function (upKey, rightKey, downKey, leftKey) {
        this.controlKeyUp = upKey;
        this.controlKeyRight = rightKey;
        this.controlKeyDown = downKey;
        this.controlKeyLeft = leftKey;
    };

    this.reset = function (whichImage, carName) {
    	// which car to reset
    	this.name = carName;
    	// which image to use
    	this.myCarPic = whichImage;
    	// stop the car
		this.speed = 0;

        for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
            for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
                // find car's grid
                if (trackGrid[arrayIndex] === TRACK_PLAYER_START) {
                	// set car's grid to road's grid (2 -> 0)
                    trackGrid[arrayIndex] = TRACK_ROAD;
                    // face car north
                    this.ang = -Math.PI / 2;
                    // set car's position
                    this.x = eachCol * TRACK_W + TRACK_W / 2;
                    this.y = eachRow * TRACK_H + TRACK_H / 2;
                    // quit when car's position found
                    return;
                }
            }
        }
    };

    this.move = function () {
    	// decrease 0.94 speed
        this.speed *= GROUNDSPEED_DECAY_MULT;

        // increase speed
        if (this.keyHeld_Gas) {
            this.speed += DRIVE_POWER;
        }
        // decrease speed
        if (this.keyHeld_Reverse) {
            this.speed -= REVERSE_POWER;
        }

        // disallow steering when speed is too low
        if (Math.abs(this.speed ) > MIN_SPEED_TO_TURN) {
            if (this.keyHeld_TurnLeft) {
                this.ang -= TURN_RATE;
            }
            if (this.keyHeld_TurnRight) {
                this.ang += TURN_RATE;
            }
        }

        // get car's position
        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed;

        // handle car track
		//carTrackHandling(this);
    };

    this.draw = function () {
        drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
    };
}
