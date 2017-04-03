// set car pics
var carPic = document.createElement("img");
var otherCarPic = document.createElement('img');
// store track pics
var trackPics = [];

// set automatically in loadImages()
var picsToLoad;

// start game when picsToLoad = 0
function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    if (picsToLoad === 0){
        imageLoadingDoneSoStartGame();
    }
}

// load an image and decrement picsToLoad
function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = 'images/' + fileName;
}

// load track pic that matches trackCode
function loadImageForTrackCode(trackCode, fileName) {
    trackPics[trackCode] = document.createElement('img');
    beginLoadingImage(trackPics[trackCode], fileName)
}

function loadImages() {
    // fill the image list with image objects
    var imageList = [
        {varName: carPic, theFile: "player1car.png"},
        {varName: otherCarPic, theFile: "player2car.png"},
        {trackType: TRACK_ROAD, theFile: "track_road.png"},
        {trackType: TRACK_WALL, theFile: "track_wall.png"},
        {trackType: TRACK_GOAL, theFile: "track_goal.png"},
        {trackType: TRACK_TREE, theFile: "track_tree.png"},
        {trackType: TRACK_FLAG, theFile: "track_flag.png"}
    ];

    picsToLoad = imageList.length;

    // loop through image list
    for(var i = 0; i < imageList.length; i++) {
        // load car pics
        if (imageList[i].varName !== undefined){
            beginLoadingImage(imageList[i].varName, imageList[i].theFile);
        // load tile pics
        } else {
            loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
        }

    }
}