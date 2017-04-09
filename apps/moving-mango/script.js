var MangoClicked = false, l = [10, 50, 100, 300, 750], isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    any: function() { return (isMobile.Android() || isMobile.iOS()); }
};
function get(what) { return localStorage[what] }
function set(what, value) { localStorage[what] = value }
function id(what) { return document.getElementById(what) }
set('points', get("points") || 0);
set('level', get("level") || 1);
function load() {
    id("points").innerHTML = "Points: " + get("points");
    if (!isMobile.any()) {
        id("mango").addEventListener("click", WhenClicked, false);
        document.body.addEventListener("click", BodyClicked, false);
    }
    id("mango").setAttribute("class", "Level" + get("level"));
}

function WhenClicked() {
    set('points', parseFloat(get("points")) + 1);
    id("points").innerHTML = "Points: " + get("points");
    MangoClicked = true;
    for (i = 0; i < l.length; i++) {
        if (get("points") >= l[i] && get("points") < l[i + 1] && get("level") != i + 2) {
            set('level', i + 2);
            alert("Level " + (get("level") - 1) + " Complete!");
            id("mango").setAttribute("class", "Level" + get("level"));
            break;
        }
    }
}

function BodyClicked() {
    if (MangoClicked == false) {
        if (get("points") >= 15) {
            set('points', parseFloat(get("points")) - 15);
            id("points").innerHTML = "Points: " + get("points");
        } else {
            set('points', 0);
            set('level', 1);
            load();
            alert("GAME OVER!!");
        }
    }
    else MangoClicked = false;
}

load();