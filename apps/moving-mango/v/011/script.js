var Points = 0;;
var MangoClicked = false;

function Load() {
    if (localStorage.MovingMangoPoints == undefined) {
        localStorage.MovingMangoPoints = 0;
    }
    else {
        Points = localStorage.MovingMangoPoints;
        document.getElementById("lblPoints").innerHTML = "Points: " + Points;
    }
}

function WhenClicked() {
    Points = parseFloat(Points) + 1;
    document.getElementById("lblPoints").innerHTML = "Points: " + Points;
    MangoClicked = true;
    localStorage.MovingMangoPoints = Points;
}

function BodyClicked() {
    if (MangoClicked == false) {
        if (Points >= 25) {
            Points = parseFloat(Points) - 25;
            document.getElementById("lblPoints").innerHTML = "Points: " + Points;
        } else {
            document.getElementById("lblPoints").innerHTML = "GAME OVER!! Click to try again!";
            Points = 0;
        }
    }
    else {
        MangoClicked = false;
    }
    localStorage.MovingMangoPoints = Points;
}
