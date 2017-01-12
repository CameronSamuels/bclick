if (window.location.protocol == "https:") window.location.href = "http:" + window.location.href.substring(window.location.protocol.length);

// ===== Helper Functions ===== //
function id(id) { return document.getElementById(id); }
var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    any: function() { return (isMobile.Android() || isMobile.iOS()); }
};

// ===== Word Parts ===== //
var sel = {
    first : ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'qu', 'r', 's','t', 'st', 'v', 'w', 'y', 'z'],
    second : ['a', 'e', 'i', 'o', 'u', 'ee', 'ue', 'ie', 'ae', 'ei', 'oo', 'oi'],
    third : ['b', 'c', 'd', 'g', 'h', 'l', 'm', 'n', 'p', 'r', 's','t', 'st', 'v', 'w', 'z']
};

// ===== Word Generating ===== //
function update() {
    var word = sel.first[Math.floor(Math.random() * sel.first.length)] + sel.second[Math.floor(Math.random() * sel.second.length)] + sel.third[Math.floor(Math.random() * sel.third.length)] + sel.second[Math.floor(Math.random() * sel.second.length)] + sel.third[Math.floor(Math.random() * sel.third.length)];
    while (word.includes('uu')) { word = word.replace('uu', 'u' + sel.second[Math.floor(Math.random() * sel.second.length)]); }
    
    id('word').innerHTML = word;
    document.title = word.replace(/\w\S*/g, word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()) + " - Word Maker";
    
    responsiveVoice.speak(word);
    
    setTimeout("id('word').setAttribute('class', '')", 750);
}
function make() {
    id('word').setAttribute('class', 'flicker');
    setTimeout('update()', 750);
}

// ===== Mobile Support ===== //
if (!isMobile.any())
    id('word').setAttribute('onclick', 'make()');

// ===== Keyboard Support ===== //
var keyPressed = false;
id('body').onkeydown = function (e) {
    if (keyPressed === false) {
        switch (e.keyCode) {
            case 32: make(); break;
            default:
        }
        keyPressed = true;
    }
};
id('body').onkeyup = function (e) { keyPressed = false; };

// ===== Initilization ===== //
make();