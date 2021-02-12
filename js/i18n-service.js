'use strict';

var gTrans = {
    title: {
        en: 'What Todo?',
        es: 'Mis Cosas Por Hacer',
        he: 'משימות'
    },
    subtitle: {
        en: 'MVC - Model-View-Controller',
        es: 'MVC - Modelo-Vista-Controlador',
        he: 'מודל - ויו - קונטרולר',
    },
    'filter-all': {
        en: 'All',
        es: 'Todos',
        he: 'הכל',
    },
    'filter-active': {
        en: 'Active',
        es: 'Activo',
        he: 'פעיל'
    },
    'filter-done': {
        en: 'Done',
        es: 'Completo',
        he: 'הושלם',
    },
    'stat-todo-label': {
        en: 'Todo',
        es: 'Hacer',
        he: 'לעשות',
    },
    'stat-active-label': {
        en: 'Active',
        es: 'Activo',
        he: 'פעיל',
    },
    add: {
        en: 'Add',
        es: 'Aggregar',
        he: 'הוסף',
    },
    sure: {
        en: 'Are you sure?',
        es: 'Estas Seguru?',
        he: 'בטוח נשמה?',
    },
    'add-todo-placeholder': {
        en: 'What needs to be done?',
        es: 'Que te tienes que hacer?',
        he: 'מה יש לעשות?'
    }
}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function(el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey);

        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    })
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang];

    // if not found return en
    if (!txt) txt = keyTrans['en'];
    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
}