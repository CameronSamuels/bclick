if (window.location.protocol != "https:" && window.location.href.toString().includes('playbclick.com')) window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);

// ===== Helper Functions ===== //
function id(id) { return document.getElementById(id); }
var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    any: function() { return (isMobile.Android() || isMobile.iOS()); }
};

// ===== Refreshing ===== //
function update() {
    localStorage.ConsoleSavedCode= id('code').value;
    if (window.location.hash == "#html") {
        id('right').innerHTML = id('code').value;
    } else {
        id('right').innerHTML = eval(id('code').value);
    }
}

// ===== Intizilizing ===== //
function load() {
    id('code').value = localStorage.ConsoleSavedCode;
    update();
}

load();