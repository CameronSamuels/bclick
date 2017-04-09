var MangoClicked = false, l = [10, 50, 100, 300, 750], cooldown = true;
function get(what) { return localStorage[what] }
function set(what, value) { localStorage[what] = value }
function id(what) { return document.getElementById(what) }
set('points', get("points") || 0);
set('level', get("level") || 1);
function log(text) {
    var log = document.querySelector('log');
    log.innerHTML = text; setTimeout(function(){log.innerHTML=''}, 2000);
}
function load() {
    id("points").innerHTML = "Points: " + get("points");
    if (!navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        id("mango").addEventListener("click", WhenClicked, false);
        document.body.addEventListener("click", BodyClicked, false);
    }
    if (id("mango").getAttribute("class") != "Level" + get("level")) id("mango").setAttribute("class", "Level" + get("level"));
}

function WhenClicked() {
    set('points', parseFloat(get("points")) + 1);
    id("points").innerHTML = "Points: " + get("points");
    MangoClicked = true;
    for (i = 0; i < l.length; i++) {
        if (get("points") >= l[i] && get("points") < l[i + 1] && get("level") != i + 2) {
            set('level', i + 2);
            log("Level " + (get("level") - 1) + " Complete!");
            cooldown = false; setTimeout(function(){cooldown=true}, 2000);
            if (id("mango").getAttribute("class") != "Level" + get("level")) id("mango").setAttribute("class", "Level" + get("level"));
            break;
        }
    }
}

function BodyClicked() {
    if (MangoClicked == false && cooldown == true) {
        if (get("points") >= 15) {
            set('points', parseFloat(get("points")) - 15);
            id("points").innerHTML = "Points: " + get("points");
        } else {
            set('points', 0);
            set('level', 1);
            load();
            log("GAME OVER!!");
        }
    }
    else MangoClicked = false;
}

load();