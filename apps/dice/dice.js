var isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor,
    isOpera = winNav.userAgent.indexOf("OPR") > -1,
    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
    isIOSChrome = winNav.userAgent.match("CriOS");

if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false && !isIOSChrome) {
   window.location = "https://chrome.google.com/webstore/detail/dice-thrower/gandnjjljgomdonoidfcjjockjngkjcc";
}
if (window.location.protocol != "https:" && window.location.href.toString().includes('playbclick.com')) window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);

// ===== Helper Functions ===== //
function id(id) { return document.getElementById(id); }
var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    any: function() { return (isMobile.Android() || isMobile.iOS()); }
};

// ===== Media ===== //
var snd = new Audio('snd/roll.mp3');
var colors = ['blue', 'yellow', 'green', 'red', 'purple', 'orange'];

// ===== Dice Rolling ===== //
function update() {
    var num = Math.ceil(Math.random() * 6);
    
    id("dice").setAttribute("class", "");
    
    id('dice').src = 'img/' + num + 't.png';
    id('dice').title = num;
    document.title = num + " - Dice Thrower";
    
    id('main').style.backgroundColor = colors[num - 1];
    
    if (localStorage.DiceVibration == "true") {
        var vibrations = setInterval('window.navigator.vibrate(250)', 500);
        setTimeout(function(){clearInterval(vibrations)}, (num * 500));
    }
}
function roll() {
    if (!id('dice').getAttribute('class').includes('anim')) {
        id('dice').setAttribute('class', 'anim');
        snd.play();
        setTimeout('update()', 1000);
    }
}

// ===== Mobile Support ===== //
if (!isMobile.any())
    id('dice').setAttribute('onclick', 'roll()');
if (isMobile.any())
    id('vibration').style.display = "block";
    
// ===== Keyboard Events ===== //
var keyPressed = false;
id('body').onkeydown = function (e) {
    if (keyPressed === false) {
        switch (e.keyCode) {
            case 32: roll(); break;
            default:
        }
        keyPressed = true;
    }
};
id('body').onkeyup = function (e) { keyPressed = false; };

// ===== Shake Events ===== //
var shakeEvent = new Shake({threshold: 15});
shakeEvent.start();
window.addEventListener('shake', function(){roll()}, false);
function stopShake() { shakeEvent.stop(); }

// ===== Settings ===== //
var settings = {
  vibrate : function() {
      localStorage.DiceVibration = (localStorage.DiceVibration != 'true' ? 'true' : 'false' );
      settings.refresh();
  },
  refresh : function() {
      id('vibration').innerHTML = "Vibration: " + localStorage.DiceVibration;
  }
};

// ===== Initilize ===== //
function load() {
    if (!localStorage.DiceVibration) {
        localStorage.DiceVibration = "true";
    }
    settings.refresh();
}

load();
update();