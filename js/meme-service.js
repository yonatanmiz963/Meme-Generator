'use strict';

var gMeme;

var gCurrFilter = '';
var gKeywords = {
    'happy': 12,
    'funny': 1,
    'politics': 1,
    'sleep': 1,
    'dogs': 1,
    'baby': 1,
    'angry': 1,
    'movies': 1,
    'love': 1,
    'sport': 1,
    'famous': 1,
    'serious': 1,
}


var gImgs = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['politics', 'angry'] },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['happy', 'love', 'dogs'] },
    { id: 3, url: 'meme-imgs/3.jpg', keywords: ['sleep', 'dogs', 'baby'] },
    { id: 4, url: 'meme-imgs/4.jpg', keywords: ['sleep'] },
    { id: 5, url: 'meme-imgs/5.jpg', keywords: ['baby', 'happy'] },
    { id: 6, url: 'meme-imgs/6.jpg', keywords: ['funny', ] },
    { id: 7, url: 'meme-imgs/7.jpg', keywords: ['happy', 'baby'] },
    { id: 8, url: 'meme-imgs/8.jpg', keywords: ['happy', 'funny'] },
    { id: 9, url: 'meme-imgs/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'meme-imgs/10.jpg', keywords: ['funny', 'politics'] },
    { id: 11, url: 'meme-imgs/11.jpg', keywords: ['funny', 'sport'] },
    { id: 12, url: 'meme-imgs/12.jpg', keywords: ['famous'] },
    { id: 13, url: 'meme-imgs/13.jpg', keywords: ['famous', 'happy', 'movies'] },
    { id: 14, url: 'meme-imgs/14.jpg', keywords: ['movies', 'serious'] },
    { id: 15, url: 'meme-imgs/15.jpg', keywords: ['serious', 'movies'] },
    { id: 16, url: 'meme-imgs/16.jpg', keywords: ['funny', 'movies'] },
    { id: 17, url: 'meme-imgs/17.jpg', keywords: ['politics', 'happy'] },
    { id: 18, url: 'meme-imgs/18.jpg', keywords: ['movies', 'funny'] }
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

function getImgs() {
    return filterImgs();
}

function filterImgs() {
    if (!gCurrFilter) return gImgs;

    let filteredImgs = gImgs.filter(img => {
        return img.keywords.find(keyWord => {
            return keyWord === gCurrFilter;
        });
    });

    return filteredImgs;
}

function setFilter(filter) {
    gCurrFilter = filter;
}