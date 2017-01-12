var MangoClicked = false;
var Worth = 1;

var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    any: function() { return (isMobile.Android() || isMobile.iOS()); }
};

function get(what) { return localStorage[what] }
function id(what) { return document.getElementById(what); }

function load() {
    if (localStorage.MovingMangoPoints == undefined) localStorage.MovingMangoPoints = 0;
    else id("Points").innerHTML = "Points: " + get("MovingMangoPoints");
    if (!isMobile.any()) {
        id("Mango").addEventListener("click", WhenClicked, false);
        id("body").addEventListener("click", BodyClicked, false);
    }
    if (localStorage.mmmLevel == undefined) localStorage.mmmLevel = 1;
    else {
        var Level = localStorage.mmmLevel;
        if (Level == 2) id("Mango").setAttribute("class", "Image Level2");
        if (Level == 3) id("Mango").setAttribute("class", "Image Level3");
        if (Level == 4) id("Mango").setAttribute("class", "Image Level4");
        if (Level == 5) id("Mango").setAttribute("class", "Image Level5");
        if (Level == 6) id("Mango").setAttribute("class", "Image Level6");
    }
    if (localStorage.mmmWorth == undefined) localStorage.mmmWorth = 1;
    else Worth = localStorage.mmmWorth;
}

function WhenClicked() {
    localStorage.MovingMangoPoints = parseFloat(get("MovingMangoPoints")) + parseFloat(Worth);
    id("Points").innerHTML = "Points: " + get("MovingMangoPoints");
    MangoClicked = true;
    var Mango = id("Mango");
    
    var x = get("MovingMangoPoints");
    switch (true) {
        case (x >= 100 && x < 250):
            if (get("mmmLevel") != 2) {
                alert("Level 1 Complete!");
                Mango.setAttribute("class", "image Level2");
                localStorage.mmmLevel = 2;
            }
            break;
        case (x >= 250 && x < 500):
            if (get("mmmLevel") != 3) {
                alert("Level 2 Complete!");
                Mango.setAttribute("class", "image Level3");
                localStorage.mmmLevel = 3;
            }
            break;
        case (x >= 500 && x < 1000):
            if (get("mmmLevel") != 4) {
                alert("Level 3 Complete!");
                Mango.setAttribute("class", "image Level4");
                localStorage.mmmLevel = 4;
            }
            break;
        case (x >= 1000 && x < 2500):
            if (get("mmmLevel") != 5) {
                alert("Level 4 Complete!");
                Mango.setAttribute("class", "image Level5");
                localStorage.mmmLevel = 5;
            }
            break;
        case (x >= 2500):
            if (get("mmmLevel") != 6) {
                alert("Level 5 Complete!");
                Mango.setAttribute("class", "image Level6");
                localStorage.mmmLevel = 6;
            }
            break;
        default:
    }
}

function AddWorth() {
    localStorage.mmmWorth *= 2;
    Worth *= 2;
}

var WorthTimer = setInterval(AddWorth, 60000);

function BodyClicked() {
    if (MangoClicked == false) {
        if (get("MovingMangoPoints") >= 25) {
            localStorage.MovingMangoPoints = parseFloat(get("MovingMangoPoints")) - 25;
            id("Points").innerHTML = "Points: " + get("MovingMangoPoints");
        } else {
            localStorage.MovingMangoPoints = 0;
            id("Points").innerHTML = "Points: " + get("MovingMangoPoints");
            alert("GAME OVER!! Click to try again!");
            localStorage.mmmLevel = 1;
            localStorage.mmmWorth = 1;
        }
    }
    else {
        MangoClicked = false;
    }
}


load();