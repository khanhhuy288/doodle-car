// set canvas
var canvas1, canvasContext1;
var canvasWidth = window.innerWidth;
var canvasHeight = document.body.offsetHeight;

var canvas2, canvasContext2;

// set cars
// var pinkCar = new Car(carPic);
var blueCar = new Car(otherCarPic);

// start program
window.addEventListener('load', function () {
    canvas1 = document.getElementById("gameCanvas1");
    canvasContext1 = canvas1.getContext("2d");

    canvas2 = document.getElementById("gameCanvas2");
    canvasContext2 = canvas2.getContext("2d");

    // make canvases full screen
    canvas1.width = window.innerWidth;
    canvas1.height = document.body.offsetHeight;

    canvas2.width = window.innerWidth;
    canvas2.height = document.body.offsetHeight;


    // draw loading screen
    colorRect(0,0, canvasWidth,canvasHeight, 'black');
    colorText("Loading...", canvasWidth/2 - 10,canvasHeight/2, 'white');


    loadImages();

});



function imageLoadingDoneSoStartGame() {
    // set interval
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    // set keys for each car
    setupInput();
}

function updateAll() {
    colorRect(0,0, canvasWidth,canvasHeight, '#465559');
    blueCar.move();
    blueCar.draw();
    blueCar.paint();
    //canvasContext3.drawImage(colorPalettePic, 0, 0);
}
