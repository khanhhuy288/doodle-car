// set track
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

// set level's layout
var levelOne = [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
				 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
				 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
				 1, 0, 0, 0, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
				 1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
				 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
				 0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
				 0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
				 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4];

// save levelOne's original state
var trackGrid = [];

// set grid types
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER_START = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

function rowColToArrayIndex(col, row) {
    return col + TRACK_COLS * row;
}

function returnTileTypeAtColRow(col, row) {
	// check if tile's position(col, row) is valid
	if(col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS) {
		// set that position to an index in array
		var trackIndexUnderCoord = rowColToArrayIndex(col, row);
		// get tile type
		return trackGrid[trackIndexUnderCoord];
	} else {
		// set a wall by default
		return TRACK_WALL;
	}
}

function carTrackHandling(whichCar) {
	// track car's position(col, row)
	var carTrackCol = Math.floor(whichCar.x / TRACK_W);
	var carTrackRow = Math.floor(whichCar.y / TRACK_H);
	// set that position to an index in array
	var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

	// check car's position among the tiles
	if(carTrackCol >= 0 && carTrackCol < TRACK_COLS && carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
		var tileHere = returnTileTypeAtColRow( carTrackCol,carTrackRow );

		// hit the finish line
		if(tileHere === TRACK_GOAL) {
			// reset the stage
			loadLevel(levelOne);
		// hit the wall
		} else if(tileHere !== TRACK_ROAD) {
            // undo car movement which got it onto the wall
            whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
            whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;
            // push car back
            whichCar.speed *= -0.5;
		}
	}
}

function drawTracks() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
			// get tile type
			var tileKindHere = trackGrid[arrayIndex];
			// draw tile image
			var useImg = trackPics[tileKindHere];
            canvasContext.drawImage(useImg, drawTileX,drawTileY);
			// increase drawTileX a fixed amount of width
            drawTileX += TRACK_W;
            arrayIndex++
		}
		// increase drawTileY after drawing 1 row
		drawTileY += TRACK_H;
		// move drawTileX back to 0
		drawTileX = 0;
	}
}