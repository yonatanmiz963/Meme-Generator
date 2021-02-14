'use strict';

var gMeme;
var gCurrFilter = '';
const KEY = 'memes';
const ID = 'currId';
var gMemeId = 0;

const  PAGE_SIZE  =  4;
var  gPageIdx  =  0;



var gKeywords = [
    { keyword: 'happy', used: 10 },
    { keyword: 'funny', used: 6 },
    { keyword: 'politics', used: 8 },
    { keyword: 'sleep', used: 10 },
    { keyword: 'dogs', used: 5 },
    { keyword: 'baby', used: 4 },
    { keyword: 'angry', used: 3 },
    { keyword: 'movies', used: 5 },
    { keyword: 'love', used: 10 },
    { keyword: 'sport', used: 5 },
    { keyword: 'famous', used: 10 },
    { keyword: 'serious', used: 9 }
]


function getFilters() {
    if (gPageIdx === 3) gPageIdx = 0;  
    var  startIdx  =  gPageIdx * PAGE_SIZE;  
    return  gKeywords.slice(startIdx,  startIdx  +  PAGE_SIZE)
}

function increasePageIdx() {
    ++gPageIdx;
}


var gImgs = [
    { id: 1, url: 'diff-aspect-imgs/1.jpg', keywords: ['politics', 'angry'] },
    { id: 2, url: 'diff-aspect-imgs/2.jpg', keywords: ['happy', 'love', 'dogs'] },
    { id: 3, url: 'diff-aspect-imgs/3.jpg', keywords: ['sleep', 'dogs', 'baby'] },
    { id: 4, url: 'diff-aspect-imgs/4.jpg', keywords: ['sleep'] },
    { id: 5, url: 'diff-aspect-imgs/5.jpg', keywords: ['baby', 'happy'] },
    { id: 6, url: 'diff-aspect-imgs/6.jpg', keywords: ['funny', ] },
    { id: 7, url: 'diff-aspect-imgs/7.jpg', keywords: ['happy', 'baby'] },
    { id: 8, url: 'diff-aspect-imgs/8.jpg', keywords: ['happy', 'funny'] },
    { id: 9, url: 'diff-aspect-imgs/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'diff-aspect-imgs/10.jpg', keywords: ['funny', 'politics'] },
    { id: 11, url: 'diff-aspect-imgs/11.jpg', keywords: ['funny', 'sport'] },
    { id: 12, url: 'diff-aspect-imgs/12.jpg', keywords: ['famous'] },
    { id: 13, url: 'diff-aspect-imgs/13.jpg', keywords: ['famous', 'happy', 'movies'] },
    { id: 14, url: 'diff-aspect-imgs/14.jpg', keywords: ['movies', 'serious'] },
    { id: 15, url: 'diff-aspect-imgs/15.jpg', keywords: ['serious', 'movies'] },
    { id: 16, url: 'diff-aspect-imgs/16.jpg', keywords: ['funny', 'movies'] },
    { id: 17, url: 'diff-aspect-imgs/17.jpg', keywords: ['politics', 'happy'] },
    { id: 18, url: 'diff-aspect-imgs/18.jpg', keywords: ['movies', 'funny'] }
];



function getImage(id) {
    return gImgs.find(img => {
        return img.id === id;
    });
}

function setMeme(id) {
    let meme = {
        id: gMemeId++,
        url: null,
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [
            { txt: 'START HERE', size: 40, align: 'center', color: 'white', y: 50, x: 125, isDragging: false, rectWidth: 498, rectHeight: 60, rectX: 1, rectY: 0 }
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
            return keyWord.includes(gCurrFilter);
        });
    });

    return filteredImgs;
}

function setFilter(filter) {
    gCurrFilter = filter;
}



function setFilterFreq(filter) {
    if (gKeywords[filter] < 10) gKeywords[filter]++;

    for (const word in gKeywords) {
        if (Object.hasOwnProperty.call(gKeywords, word)) {
            if (word !== filter && gKeywords[word] >= 3) gKeywords[word]--;
        }
    }
}

function saveMemes(url) {
    gMeme.url = url;
    let memes = getMemes();
    if (memes === null) {
        memes = [];
        memes.push(gMeme);
    } else {
        memes.push(gMeme);
    }

    saveToStorage(KEY, memes);
    saveToStorage(ID, gMemeId);

}

function getMemes() {
    return loadFromStorage(KEY);
}

function getCurrId() {
    let currId = loadFromStorage(ID);
    if (!currId) return;
    gMemeId = currId;
}

function getMemeById(id) {
    let memes = getMemes();
    let meme = memes.find(meme => {
        return meme.id === id
    });

    return meme;
}