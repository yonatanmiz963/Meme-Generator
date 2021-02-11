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
    currLineRect();
}

function currLineRect() {
    if (gCurrLine !== 0 && (!gCurrLine)) return;
    let meme = getCurrMeme();

    let rectX = 1;
    let rectY = meme.lines[gCurrLine].y - meme.lines[gCurrLine].size;
    let rectHeight = meme.lines[gCurrLine].size + 10;
    let rectWidth = 498;

    gCtx.beginPath();
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'white';
    gCtx.rect(rectX, rectY, rectWidth, rectHeight);
    gCtx.stroke();
}

function drawTextLines() {
    let memeLines = getText();

    memeLines.forEach(line => {
        drawText(line.txt, line.align, line.color, line.size, line.font, line.y, line.x);
    });
}


function drawText(text, align, color, size, font, y = 50, x = gElCanvas.width * 0.25) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = color;
    gCtx.font = `${size}px ${font}`;
    gCtx.textAlign = align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


function onSwitchLine() {
    if (gCurrLine || gCurrLine === 0) gCurrLine++;
    if (!gCurrLine && gCurrLine !== 0) gCurrLine = 0;
    let meme = getCurrMeme();
    if (gCurrLine >= meme.lines.length) {
        gCurrLine = null;
        clearCanvas();
        drawMeme(gImg);
    }

    clearCanvas();
    drawMeme(gImg);
}

function onChangeText() {
    if (!gCurrLine && gCurrLine !== 0) return;

    let newText = document.querySelector('[name="line-text"]').value;
    changeText(newText, gCurrLine);
    clearCanvas();
    drawMeme(gImg);
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onChangeFontSize(value) {
    if (!gCurrLine && gCurrLine !== 0) return;

    let diff = (value === '+') ? 2 : -2;
    let meme = getCurrMeme();
    meme.lines[gCurrLine].size += diff;
    updateMeme(meme);
    clearCanvas();
    drawMeme(gImg);
}

function onMoveLine() {
    if (gCurrLine !== 0 && (!gCurrLine)) return;
    let meme = getCurrMeme();
    meme.lines[gCurrLine].y += 15;
    if (meme.lines[gCurrLine].y >= gElCanvas.height) meme.lines[gCurrLine].y = 0;

    updateMeme(meme);
    clearCanvas();
    drawMeme(gImg);
}

function onMoveAside() {
    if (gCurrLine !== 0 && (!gCurrLine)) return;
    let meme = getCurrMeme();
    meme.lines[gCurrLine].x += 15;
    if (meme.lines[gCurrLine].x >= gElCanvas.height) meme.lines[gCurrLine].x = 0;

    updateMeme(meme);
    clearCanvas();
    drawMeme(gImg);
}

function onChangeFont() {
    let newFont = document.querySelector('[name="font"]').value;
    let meme = getCurrMeme();
    meme.lines[gCurrLine].font = newFont;
    updateMeme(meme);
    clearCanvas();
    drawMeme(gImg);
}

function getCurrMeme() {
    return getMeme();
}



function getImageById(id) {
    return getImage(id);
}



function getText() {
    return getMemeText();
}