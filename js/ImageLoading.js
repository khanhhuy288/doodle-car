
// ser color palette
var colorPalette = new Image();
colorPalette.src = 'http://i.imgur.com/QLNAzoT.png';
colorPalette.crossOrigin = "Anonymous";
var canvas3 = document.getElementById('gameCanvas3');
var canvasContext3 = canvas3.getContext('2d');
colorPalette.addEventListener('load', function() {
    canvasContext3.drawImage(colorPalette, 0, 0);
    colorPalette.style.display = 'none';
});
function pick(event) {
    var x = event.layerX;
    var y = event.layerY;
    var pixel = canvasContext3.getImageData(x, y, 1, 1);
    var data = pixel.data;
    blueCar.paintColor = 'rgba(' + data[0] + ', ' + data[1] +
        ', ' + data[2] + ', ' + (data[3] / 255) + ')';
    $("gameCanvas4").css("background-color", blueCar.paintColor);

}
canvas3.addEventListener('click', pick);


// set car pics
var carPic = document.createElement("img");
var otherCarPic = document.createElement("img");

// store track pics
var trackPics = [];

// set automatically in loadImages()
var picsToLoad;

function loadImages() {
    // fill the image list with image objects
    var imageList = [
        {varName: carPic, theFile: "player1car.png"},
        {varName: otherCarPic, theFile: "player2car.png"}
    ];

    picsToLoad = imageList.length;

    // loop through image list
    for(var i = 0; i < imageList.length; i++) {
        // load car pics
        beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    }
}

// load an image and decrement picsToLoad
function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = 'images/' + fileName;
}

// launch when picsToLoad = 0
function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    if (picsToLoad === 0){
        imageLoadingDoneSoStartGame();
    }
}






