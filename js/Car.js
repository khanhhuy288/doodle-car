// slow car down when stopped
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

function Car(whichImage) {
  this.x = canvasWidth / 2;
  this.y = canvasHeight / 2;

  // point car to north east
  this.ang = -Math.PI / 3;
  this.speed = 0;
  this.myCarPic = whichImage;

  // set default paint color
  this.paintColor = '#363F45';

  // set default keyHeld to false
  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;
  this.keyHeld_Paint = false;
  
  // track previous tire positions for smooth trail
  this.prevLeftTireX = null;
  this.prevLeftTireY = null;
  this.prevRightTireX = null;
  this.prevRightTireY = null;
}

Car.prototype.setupInput = function (upKey, rightKey, downKey, leftKey, paintKey) {
  this.controlKeyUp = upKey;
  this.controlKeyRight = rightKey;
  this.controlKeyDown = downKey;
  this.controlKeyLeft = leftKey;
  this.contolKeyPaint = paintKey;
};

Car.prototype.move = function () {
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
  if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
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

  // hit the bound
  if (this.x < 0) {
    this.x = canvasWidth;
  }

  if (this.x > canvasWidth) {
    this.x = 0;
  }

  if (this.y < 0) {
    this.y = canvasHeight;
  }

  if (this.y > canvasHeight) {
    this.y = 0;
  }
};

Car.prototype.draw = function () {
  drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
};

Car.prototype.paint = function () {
  if (this.keyHeld_Paint) {
    // paint the trail with two smooth lines (tire tracks)
    // Calculate perpendicular direction to car's angle
    var perpAng = this.ang + Math.PI / 2;
    // Distance from car center to tire positions (offset)
    var tireOffset = 15;
    // Position circles slightly behind car center
    var rearOffset = 15;
    
    // Calculate positions for left and right tire tracks
    var leftTireX = this.x + Math.cos(perpAng) * tireOffset - Math.cos(this.ang) * rearOffset;
    var leftTireY = this.y + Math.sin(perpAng) * tireOffset - Math.sin(this.ang) * rearOffset;
    var rightTireX = this.x - Math.cos(perpAng) * tireOffset - Math.cos(this.ang) * rearOffset;
    var rightTireY = this.y - Math.sin(perpAng) * tireOffset - Math.sin(this.ang) * rearOffset;
    
    // Check if car wrapped around screen edges (large jump in position)
    var maxJumpDistance = Math.max(canvasWidth, canvasHeight) * 0.5;
    var leftJumpDistance = this.prevLeftTireX !== null && this.prevLeftTireY !== null 
      ? Math.sqrt(Math.pow(leftTireX - this.prevLeftTireX, 2) + Math.pow(leftTireY - this.prevLeftTireY, 2))
      : 0;
    var rightJumpDistance = this.prevRightTireX !== null && this.prevRightTireY !== null
      ? Math.sqrt(Math.pow(rightTireX - this.prevRightTireX, 2) + Math.pow(rightTireY - this.prevRightTireY, 2))
      : 0;
    
    // If jump is too large, car wrapped around - reset previous positions
    if (leftJumpDistance > maxJumpDistance || rightJumpDistance > maxJumpDistance) {
      this.prevLeftTireX = null;
      this.prevLeftTireY = null;
      this.prevRightTireX = null;
      this.prevRightTireY = null;
    }
    
    // Draw smooth lines connecting previous and current positions
    if (this.prevLeftTireX !== null && this.prevLeftTireY !== null) {
      // Draw smooth lines for continuous trail
      colorLine(this.prevLeftTireX, this.prevLeftTireY, leftTireX, leftTireY, 6, this.paintColor);
      colorLine(this.prevRightTireX, this.prevRightTireY, rightTireX, rightTireY, 6, this.paintColor);
    } else {
      // Draw initial circles for the first frame
      colorCircle(leftTireX, leftTireY, 3, this.paintColor);
      colorCircle(rightTireX, rightTireY, 3, this.paintColor);
    }
    
    // Update previous positions
    this.prevLeftTireX = leftTireX;
    this.prevLeftTireY = leftTireY;
    this.prevRightTireX = rightTireX;
    this.prevRightTireY = rightTireY;
  } else {
    // Reset previous positions when not painting
    this.prevLeftTireX = null;
    this.prevLeftTireY = null;
    this.prevRightTireX = null;
    this.prevRightTireY = null;
  }
};
