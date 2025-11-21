function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
  canvasContext1.save();
  canvasContext1.translate(atX, atY);
  canvasContext1.rotate(withAng);
  canvasContext1.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
  canvasContext1.restore();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext1.fillStyle = fillColor;
  canvasContext1.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

// draw stroke on draw layer
function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext2.fillStyle = fillColor;
  canvasContext2.beginPath();
  canvasContext2.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext2.fill();
}

// draw line on draw layer
function colorLine(x1, y1, x2, y2, lineWidth, fillColor) {
  canvasContext2.strokeStyle = fillColor;
  canvasContext2.lineWidth = lineWidth;
  canvasContext2.lineCap = 'round';
  canvasContext2.beginPath();
  canvasContext2.moveTo(x1, y1);
  canvasContext2.lineTo(x2, y2);
  canvasContext2.stroke();
}

function colorText(showWords, textX, textY, fillColor) {
  canvasContext1.fillStyle = fillColor;
  canvasContext1.fillText(showWords, textX, textY);
}
