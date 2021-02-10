'use strict';


var gElCanvas;
var gCtx;
var gImg;

function initCanvas() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetWidth;
    // gElCanvas.height = elContainer.offsetHeight;
}


function onLoadImage(id) {
    setMeme(id);
    initCanvas();
    let image = getImageById(id);
    var img = new Image();
    img.onload = () => (drawMeme(img));
    img.src = image.url;
    gImg = img;
}


function drawMeme(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    drawTextLines();

}

function drawTextLines() {
    let memeLines = getText();

    memeLines.forEach(line => {
        drawText(line.txt, line.align, line.color, line.size);
    });
}


function getImageById(id) {
    return getImage(id);
}


function drawText(text, align, color, size, x = 250, y = 75) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color;
    gCtx.font = `${size}px impact`;
    gCtx.textAlign = align;
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function getText() {
    return getMemeText();
}

function onChangeText() {
    let newText = document.querySelector('[name="line-text"]').value;
    changeText(newText);
    clearCanvas();
    drawMeme(gImg);
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function getCurrMeme() {
    return getMeme();
}