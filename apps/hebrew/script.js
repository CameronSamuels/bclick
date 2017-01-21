var cl = "Alef";
var ca = 3;
var c = false

function Check(answer) {
    if (ca == answer) {
        c = true
        switch(cl) {
            case "Alef":
                cl = "Bet";
                c = false;
                ca = 1;
                document.getElementById("Answer1Div").innerHTML = "Bet";
                document.getElementById("Answer2Div").innerHTML = "Tet";
                document.getElementById("Answer3Div").innerHTML = "Chuf";
                break;
            case "Bet":
                cl = "Gimel";
                c = false;
                ca = 1;
                document.getElementById("Answer1Div").innerHTML = "Gimel";
                document.getElementById("Answer2Div").innerHTML = "He";
                document.getElementById("Answer3Div").innerHTML = "Chet";
                break;
            case "Gimel":
                alert("You Win!");
                break;
            default:
             alert("Error!");  
        }
        alert("Good Job!");
    }
    else {
        alert("Try Again!");
    }
    

}