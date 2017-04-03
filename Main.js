// set canvas
var canvas, canvasContext;



// start program
window.onload = function () {
    // get canvas
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    // make canvas full screen
    canvas.width = window.innerWidth;
    canvas.height = document.body.offsetHeight;

    // draw loading screen
    colorRect(0,0, canvas.width,canvas.height, 'black');
    colorText("Loading...", canvas.width/2 - 10,canvas.height/2, 'white');

    loadImages();
};

