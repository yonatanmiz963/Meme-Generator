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
    img.onload = () => (renderImg(img));
    img.src = image.url;
}


function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}


function getImageById(id) {
    return getImage(id);
}