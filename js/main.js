'use strict';


var gElCanvas;
var gCtx;
var gImg;
var gCurrLine = 0;
var gStartPos;

const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];


function init() {
    renderImgs();
    renderFilters();
}


function initCanvas() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    addListeners();
}


function resizeCanvas(imgWidth, imgHeight) {
    var elContainer = document.querySelector('.canvas-container');

    // DIFF ASPECT RATIOS
    gElCanvas.width = (imgHeight * elContainer.offsetWidth) / imgWidth;
    gElCanvas.height = (imgHeight * gElCanvas.width) / imgWidth;

    gImg.width = gElCanvas.width;
    gImg.height = gElCanvas.height;

    // console.log('width:', gElCanvas.width)
    // console.log('height:', gElCanvas.height)
}


function onLoadImage(id) {
    getCurrId();
    let elGallery = document.querySelector('.gallery');
    if (!elGallery.classList.contains('hide')) elGallery.classList.toggle('hide');

    let elSearch = document.querySelector('.search');
    if (!elSearch.classList.contains('hide')) elSearch.classList.toggle('hide');

    let elProfile = document.querySelector('.profile');
    if (!elProfile.classList.contains('hide')) elProfile.classList.toggle('hide');

    let elEditor = document.querySelector('.editor');
    elEditor.classList.toggle('hide');

    setMeme(id);
    initCanvas();
    let image = getImageById(id);
    var img = new Image();
    img.onload = () => {
        resizeCanvas(img.width, img.height);
        img.width = gElCanvas.width;
        img.height = gElCanvas.height;
        drawMeme(img);
    }
    img.src = image.url;
    gImg = img;
}


function drawMeme(img = gImg) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    drawTextLines();
    currLineRect();
}

function currLineRect() {
    let meme = getCurrMeme();
    if (meme.lines.length === 0) return;
    if (gCurrLine === null) return;

    let currText = meme.lines[gCurrLine].txt;
    document.querySelector('[name="line-text"]').value = currText;
    let textWidth = gCtx.measureText(currText);

    let rectX = meme.lines[gCurrLine].x - (textWidth.width / 2);
    let rectY = meme.lines[gCurrLine].y - meme.lines[gCurrLine].size;
    let rectHeight = meme.lines[gCurrLine].size + 10;
    let rectWidth = textWidth.width;

    meme.lines[gCurrLine].rectX = rectX;
    meme.lines[gCurrLine].rectY = rectY;
    meme.lines[gCurrLine].rectWidth = rectWidth;
    meme.lines[gCurrLine].rectHeight = rectHeight;

    gCtx.beginPath();
    gCtx.setLineDash([6]);
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'white';
    gCtx.rect(rectX, rectY, rectWidth, rectHeight);
    gCtx.stroke();

    updateMeme(meme);
}

function drawTextLines() {
    let memeLines = getText();

    memeLines.forEach(line => {
        drawText(line.txt, line.align, line.color, line.size, line.font, line.y, line.x);
    });
}


function drawText(text, align, color = 'white', size = 10, font = 'impact', y = 50, x) {
    gCtx.lineWidth = 1;
    gCtx.setLineDash([0]);
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = color;
    gCtx.font = `${size}px ${font}`;
    gCtx.textAlign = align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


function onSwitchLine() {
    if (gCurrLine || gCurrLine === 0) gCurrLine++;
    if (gCurrLine === null) gCurrLine = 0;
    let meme = getCurrMeme();
    if (gCurrLine >= meme.lines.length) {
        gCurrLine = null;
        return;
    }

    let currText = meme.lines[gCurrLine].txt;
    document.querySelector('[name="line-text"]').value = currText;
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
    if (gCurrLine !== 0 && (!gCurrLine)) return;
    let newFont = document.querySelector('[name="font"]').value;
    let meme = getCurrMeme();
    meme.lines[gCurrLine].font = newFont;
    updateMeme(meme);
    clearCanvas();
    drawMeme(gImg);
}

function onSetFontColor() {
    if (gCurrLine !== 0 && (!gCurrLine)) return;
    let newColor = document.querySelector('[name="font-color"]').value;
    let meme = getCurrMeme();
    meme.lines[gCurrLine].color = newColor;
    updateMeme(meme);
    clearCanvas();
    drawMeme(gImg);
}

function onAddLine() {
    let newLine = { txt: 'New Line', size: 28, align: 'center', color: 'white', y: 50, x: 125, isDragging: false, rectWidth: 0, rectHeight: 0, rectX: 0, rectY: 0 };
    let meme = getCurrMeme();
    meme.lines.push(newLine);
    gCurrLine = meme.lines.length - 1;
    updateMeme(meme);
    clearCanvas();
    drawMeme(gImg);
}


function onDeleteLine() {
    if (gCurrLine !== 0 && (!gCurrLine)) return;
    let meme = getCurrMeme();
    meme.lines.splice(gCurrLine, 1);
    gCurrLine = 0;
    updateMeme(meme);
    clearCanvas();
    drawMeme(gImg);
}



function downloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}


function onSaveMeme() {
    let memeURL = gElCanvas.toDataURL('image/jpeg');
    saveMemes(memeURL);
}


function onOpenMemes() {
    let memes = getMemes();
    if (memes) {
        let memesHTML = memes.map(meme => {
            return `<img class="meme"
            src="${meme.url}"
            onclick="onLoadMeme(${meme.id})">`
        }).join('');

        let elMemesContainer = document.querySelector('.memes-container');
        elMemesContainer.innerHTML = memesHTML;
    }

    document.body.style.cursor = 'default';
    let elGallery = document.querySelector('.gallery');
    if (!elGallery.classList.contains('hide')) elGallery.classList.toggle('hide');

    let elProfile = document.querySelector('.profile');
    if (!elProfile.classList.contains('hide')) elProfile.classList.toggle('hide');

    let elSearch = document.querySelector('.search');
    if (!elSearch.classList.contains('hide')) elSearch.classList.toggle('hide');

    let elEditor = document.querySelector('.editor');
    if (!elEditor.classList.contains('hide')) elEditor.classList.toggle('hide');

    let elMemesSection = document.querySelector('.my-memes');
    elMemesSection.classList.toggle('hide');

    onToggleMenu();
}

function onLoadMeme(id) {
    let meme = getMemeById(id);
    updateMeme(meme);
    let elEditor = document.querySelector('.editor');
    if (elEditor.classList.contains('hide')) elEditor.classList.toggle('hide');
    initCanvas();
    var img = new Image();
    img.onload = () => {

        resizeCanvas(img.width, img.height);
        img.width = gElCanvas.width;
        img.height = gElCanvas.height;
        drawMeme(img);
    }
    img.src = meme.url;
    gImg = img;

    let elMemesSection = document.querySelector('.my-memes');
    elMemesSection.classList.toggle('hide');
}

function deleteMeme() {

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

function onSearchImg() {
    let imgFilter = document.querySelector('[name="search-filter"]').value.toLowerCase();
    setFilter(imgFilter);
    renderImgs();
}


function renderImgs() {
    let imgs = getImgs();

    let imgsHTML = imgs.map(img => {
        return ` <div onclick="onLoadImage(${img.id})"
         class="image"
          style="background: url(${img.url});
        background-position: center center;
         background-size: cover;">
         </div>`;
    }).join('');


    let elImgContainer = document.querySelector('.img-container');
    elImgContainer.innerHTML = imgsHTML;
}



function renderFilters() {
    let filters = getFilters();

    let elNextFilters = `<a class="more-filters" onclick="onSetPage()">More...</a>`;

    let filtersHTML = filters.map(word => {
        return `<h3 onclick="onChooseFilter(this)"
        data-filter="${word.keyword}"
         class="filter-word"
          style="font-size: ${word.used * 8}px;
           float: left;
             padding: 5px">${capitalizeFirstLetter(word.keyword)}</h3>`

    }).join('');

    let elFiltersContainer = document.querySelector('.filter-words');
    elFiltersContainer.innerHTML = filtersHTML + elNextFilters;
}

function onChooseFilter(elFilter) {
    let filter = elFilter.getAttribute('data-filter');
    document.querySelector('[name="search-filter"]').value = filter;
    setFilterFreq(filter);
    setFilter(filter);
    renderFilters();
    renderImgs();
}


function isRectClicked(clickedPos) {
    let meme = getMeme();
    var selectedRectIdx = meme.lines.findIndex(line => {
        return (clickedPos.x >= line.rectX) && (clickedPos.x <= line.rectWidth + line.rectX) && (clickedPos.y >= line.rectY) && (clickedPos.y <= line.rectY + line.rectHeight);
    });

    if (selectedRectIdx === -1) {
        clearCanvas();
        drawMeme(gImg);
        gCurrLine = null;
        return false;

    } else {

        gCurrLine = selectedRectIdx;
        return true;
    }
}



function getEvPos(ev) {
    var pos = {
            x: ev.offsetX,
            y: ev.offsetY
        }
        // console.log('curr pos', pos);

    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault();
        ev = ev.changedTouches[0];
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos;
}

function onUp() {
    if (gCurrLine === null) return;
    let meme = getMeme();

    meme.lines[gCurrLine].isDragging = false;
    document.body.style.cursor = 'grab';
}


function onMove(ev) {
    if (gCurrLine === null) return;

    let meme = getMeme();
    if (meme.lines.length === 0) return;

    if (meme.lines[gCurrLine].isDragging) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y

        meme.lines[gCurrLine].rectX += dx;
        meme.lines[gCurrLine].rectY += dy;
        meme.lines[gCurrLine].x += dx;
        meme.lines[gCurrLine].y += dy;

        gStartPos = pos;
        updateMeme(meme);
        clearCanvas();
        drawMeme(gImg);
    }
}

function onDown(ev) {
    let meme = getMeme();
    const pos = getEvPos(ev);

    if (!isRectClicked(pos)) return
    meme.lines[gCurrLine].isDragging = true;
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';

}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)

    gElCanvas.addEventListener('mousedown', onDown)

    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)

    gElCanvas.addEventListener('touchstart', onDown)

    gElCanvas.addEventListener('touchend', onUp)
}


function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas(gImg.width, gImg.height);
        drawMeme(gImg);
    });
}

function onOpenGallery() {
    let elGallery = document.querySelector('.gallery');

    if (!elGallery.classList.contains('hide')) return;
    document.body.style.cursor = 'default';
    elGallery.classList.toggle('hide');

    let elSearch = document.querySelector('.search');
    elSearch.classList.toggle('hide');

    let elEditor = document.querySelector('.editor');
    if (!elEditor.classList.contains('hide')) elEditor.classList.toggle('hide');

    let elProfile = document.querySelector('.profile');
    elProfile.classList.toggle('hide');

    let elMemes = document.querySelector('.my-memes');
    if (!elMemes.classList.contains('hide')) elMemes.classList.toggle('hide');

    onToggleMenu();
}



function onAddEmoji(elEmoji) {
    let emoji = elEmoji.innerHTML;
    let newEmoji = { txt: emoji, size: 50, align: 'center', color: 'white', y: 50, x: 125, isDragging: false, rectWidth: 0, rectHeight: 0, rectX: 0, rectY: 0 };
    let meme = getCurrMeme();
    meme.lines.push(newEmoji);
    gCurrLine = meme.lines.length - 1;
    updateMeme(meme);
    clearCanvas();
    drawMeme(gImg);
}



function onImgInput(ev) {
    loadImageFromInput(ev, () => {
        resizeCanvas(gImg.width, gImg.height);
        drawMeme();
    });
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function(event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gImg = img;
    }
    reader.readAsDataURL(ev.target.files[0])
    clearCanvas();

}

function onToggleMenu() {
    let elBody = document.querySelector('body');
    elBody.classList.toggle('menu-open');
}



function onAlignText(align) {
    console.log(align);
    let meme = getCurrMeme();
    meme.lines[gCurrLine].align = align;

    updateMeme(meme);
    clearCanvas();
    drawMeme(gImg);
}


function onSetPage() {
    increasePageIdx();
    console.log('work');
    renderFilters();
}