'use strict';

var gMeme;


// var gMeme = {
//     selectedImgId: 5,
//     selectedLineIdx: 0,
//     lines: [{ txt: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }]
// }

var gKeywords = {
    'happy': 12,
    'funny puk': 1
}


var gImgs = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['happy'] }
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
        lines: [{ txt: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }]
    };

    gMeme = meme;
    console.log(gMeme);
}