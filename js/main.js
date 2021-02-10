'use strict';


var gElCanvas;
var gCtx;
var gImg;
var gCurrLine = 0;

function initCanvas() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetWidth;
    // console.log(gElCanvas);
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
        drawText(line.txt, line.align, line.color, line.size, line.height);
    });
}


function getImageById(id) {
    return getImage(id);
}


function drawText(text, align, color, size, height = 50, x = gElCanvas.width * 0.25) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = color;
    gCtx.font = `${size}px impact`;
    gCtx.textAlign = align;
    gCtx.fillText(text, x, height);
    gCtx.strokeText(text, x, height);
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

function onChangeFontSize(value) {
    let diff = (value === '+') ? 2 : -2;
    let meme = getCurrMeme();
    meme.lines[gCurrLine].size += diff;
    updateMeme(meme);
    clearCanvas();
    drawMeme(gImg);
}

function onMoveLine() {
    let meme = getCurrMeme();
    console.log(meme);
    meme.lines[gCurrLine].height += 15;
    if (meme.lines[gCurrLine].height >= gElCanvas.height) meme.lines[gCurrLine].height = 0;

    updateMeme(meme);
    clearCanvas();
    drawMeme(gImg);
}


function onSwitchLine() {
    let meme = getCurrMeme();
    console.log('meme:', meme.lines.length);

    gCurrLine++;
    if (gCurrLine >= meme.lines.length) gCurrLine = 0;
    console.log(gCurrLine);
}