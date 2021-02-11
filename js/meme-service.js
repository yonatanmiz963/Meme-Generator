'use strict';

var gMeme;


var gKeywords = {
    'happy': 12,
    'funny puk': 1
}


var gImgs = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['happy'] },
    { id: 3, url: 'meme-imgs/3.jpg', keywords: ['happy'] }
];



function getImage(id) {
    return gImgs.find(img => {
        return img.id === id;
    });
}

function setMeme(id) {
    let meme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [
            { txt: 'START HERE', size: 50, align: 'start', color: 'white', y: 50, x: 125 },
            { txt: 'I never eat Falafel', size: 50, align: 'start', color: 'white', y: 50, x: 125 },
            { txt: 'Lamborgini', size: 50, align: 'start', color: 'white', y: 50, x: 125 }
        ]
    };

    gMeme = meme;
}

function getMemeText() {
    return gMeme.lines;
}

function changeText(newText, currLine) {
    gMeme.lines[currLine].txt = newText;
}

function getMeme() {
    return gMeme;
}


function updateMeme(meme) {
    gMeme = meme;
}