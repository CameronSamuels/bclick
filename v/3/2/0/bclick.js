var NewGameYet = localStorage.bGame20;
var AllB = [
    "Lowercase", "Regular", "Saw", "Spiky", "Electric", "Thin", "Curved", "Shark", "Fancy", "Lightning", "Awesome", "Golden", "Handrawn", "Pattern", "Gradient", "Disco"
];

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.iOS() || isMobile.Windows());
    }
};

var Achievements = [
    "Earn1Points",
    "Earn250Points",
    "Earn10000Points",
    "Earn100000Points",
    "Unlock3Bs",
    "Unlock5Bs",
    "Unlock10Bs",
    "Unlock16Bs"
];

var AchievementsSpaces = [
    "Earn 1 Point",
    "Earn 250 Points",
    "Earn 10,000 Points",
    "Earn 100,000 Points",
    "Unlock 3 B's",
    "Unlock 5 B's",
    "Unlock 10 B's",
    "Unlock 16 B's"
];

function openURL(url) {
    window.open(url, "_blank");
}

function RenderMouseEvents() {
    if (!isMobile.any()) {
        var buttons = document.getElementsByClassName("button");
        var i;
        for (i = 0; i < buttons.length; i++) {
            var onclick = buttons[i].getAttribute("ontouchend");
            buttons[i].setAttribute("onclick", onclick, false);
        }
    }
}

function Commas() {
    var NewPoints = Math.round(Points);
    NewPoints = NewPoints.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById("Points").innerHTML = "Points: " + NewPoints;

    var NewInterest = Math.round(Interest);
    NewInterest = NewInterest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById("Interest").innerHTML = "Interest: " + NewInterest;
}

var bPosition = 0;

function RefreshB() {
    var Worth = 0;
    var Cost = 0;
    var URL = "";
    var Name = "";
    var BGI = "";
    Name = AllB[bPosition];

    switch (Name) {
        case "Lowercase":
            Cost = 0;
            Worth = 1;
            URL = "https://gaftop.com/bClick/assets/b/new/LowercaseB.png";
            BGI = "#FFF";
            var bSection = document.getElementById("bSection");
            bSection.className = "section";
            break;
        case "Regular":
            Cost = 50;
            Worth = 10;
            URL = "https://gaftop.com/bClick/assets/b/new/RegularB.png";
            BGI = "#999";
            break;
        case "Saw":
            Cost = 300;
            Worth = 100;
            URL = "https://gaftop.com/bClick/assets/b/new/SawB.png";
            BGI = "#F00";
            break;
        case "Spiky":
            Cost = 5000;
            Worth = 500;
            URL = "https://gaftop.com/bClick/assets/b/new/SpikyB.png";
            BGI = "#FF0080";
            break;
        case "Electric":
            Cost = 10000;
            Worth = 1000;
            URL = "https://gaftop.com/bClick/assets/b/new/ElectricB.png";
            BGI = "#FFA500";
            break;
        case "Thin":
            Cost = 25000;
            Worth = 5000;
            URL = "https://gaftop.com/bClick/assets/b/new/ThinB.png";
            BGI = "yellow";
            break;
        case "Curved":
            Cost = 100000;
            Worth = 10000;
            URL = "https://gaftop.com/bClick/assets/b/new/CurvedB.png";
            BGI = "#0F0";
            break;
        case "Shark":
            Cost = 500000;
            Worth = 25000;
            URL = "https://gaftop.com/bClick/assets/b/new/SharkB.png";
            BGI = "#060";
            break;
        case "Fancy":
            Cost = 1000000;
            Worth = 50000;
            URL = "https://gaftop.com/bClick/assets/b/new/FancyB.png";
            BGI = "#6CF";
            break;
        case "Lightning":
            Cost = 5000000;
            Worth = 100000;
            URL = "https://gaftop.com/bClick/assets/b/new/LightningB.png";
            BGI = "navy";
            break;
        case "Awesome":
            Cost = 100000000;
            Worth = 1000000;
            URL = "https://gaftop.com/bClick/assets/b/new/AwesomeB.png";
            BGI = "#909";
            break;
        case "Golden":
            Cost = 10000000;
            Worth = 10000000;
            URL = "https://gaftop.com/bClick/assets/b/new/GoldenB.png";
            BGI = "#FFD700";
            break;
        case "Handrawn":
            Cost = 1000000000;
            Worth = 1000000000;
            URL = "https://gaftop.com/bClick/assets/b/new/HandrawnB.png";
            BGI = "#000";
            break;
        case "Pattern":
            Cost = 1000000000000;
            Worth = 1000000000000;
            URL = "https://gaftop.com/bClick/assets/b/new/RegularB.png";
            BGI = "url('https://gaftop.com/bClick/assets/img/pattern.jpg')";
            var bSection = document.getElementById("bSection");
            bSection.className = "section";
            break;
        case "Gradient":
            Cost = 1000000000000000;
            Worth = 1000000000000000;
            URL = "https://gaftop.com/bClick/assets/b/new/RegularB.png";
            BGI = "";
            var bSection = document.getElementById("bSection");
            bSection.className = "section gradientB";
            break;
        case "Disco":
            Cost = 1000000000000000000;
            Worth = 1000000000000000000;
            URL = "https://gaftop.com/bClick/assets/b/new/RegularB.png";
            BGI = "";
            var bSection = document.getElementById("bSection");
            bSection.className = "section discoB";
            break;
        default: 

    }
    var bButton = document.getElementById("bButton");
    var bUnlock = document.getElementById("bUnlock");
    var BG = document.getElementById("bSection");
    var UnlockedLabel = document.getElementById("bUnlocked");

    bButton.setAttribute("ontouchend", "ClickB('" + Name + "', " + Worth + ")");
    bUnlock.setAttribute("ontouchend", "UnlockB('" + Name + "', " + Cost + ")");
    bButton.style.backgroundImage = "url('" + URL + "')";
    
    Cost = Cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    bUnlock.innerHTML = "Unlock B For " + Cost + " Points";
    
    BG.style.background = BGI;
    UnlockedLabel.innerHTML = "Unlocked: " + localStorage.getItem(Name);

    RenderMouseEvents();
}

function NextB() {
    if (bPosition == 15){
        bPosition = 0;
    }
    else {
        bPosition = parseFloat(bPosition) + 1;
    }
    RefreshB();
}

function PreviousB() {
    if (bPosition == 0){
        bPosition = 15;
    }
    else {
        bPosition = parseFloat(bPosition) - 1;
    }
    RefreshB();
}


i = 0;
var text = document.getElementById("AchievementsList");
for (i = 0; i < Achievements.length; i++) {
    text.innerHTML = text.innerHTML + "<div class='achieveItem' id='" + Achievements[i] + "''>" + AchievementsSpaces[i] + "</div>";
}



function RefreshAchievements() {
    var group = document.getElementById("achivementsGroup");
    i = 0;
    var text = document.getElementById("AchievementsList");
    for (i = 0; i < Achievements.length; i++) {
        var item = document.getElementById(Achievements[i]);
        if (localStorage.getItem(Achievements[i]) == "true") {
            item.style.background = "#0F0";
        }
    }
}

function Refresh() {
    Commas();
    RefreshB();
    RenderMouseEvents();
    RefreshAchievements();
}


function NewGame() {
    localStorage.bPoints = 0;
    Points = 0;
    Interest = 0;
    localStorage.bInterest = 0;
    localStorage.bPointsMultiplier = 1;
    
    for (i = 0; i < AllB.length; i++) {
        localStorage.setItem(AllB[i], "false");
    }
    localStorage.bGame20 = "true";
    Refresh();
}

function ConfirmNewGame() {
    var answer = confirm("Are You Sure You Want To Start A New Game?");
    if (answer == true) {
        NewGame();
    }
}

function HideMessage() {
    document.getElementById("message").style.display = "none";
}

function ShowMessage(title, text) {
    document.getElementById("messageTitle").innerHTML = title;
    document.getElementById("messageText").innerHTML = text;
    document.getElementById("message").style.display = "block";
    setTimeout(HideMessage, 3000);
}

function EarnAchievement(id, name) {
    localStorage.setItem(id, "true");
    ShowMessage("Earned the " + name + " Achievement!", "You have earned an achievment.");
}

function CheckAchivements() {
    if (Points >= 1 && localStorage.Earn1Points == undefined) {
        EarnAchievement("Earn1Points", "Earn 1 Point");
    }
    if (Points >= 250 && localStorage.Earn250Points == undefined) {
        EarnAchievement("Earn250Points", "Earn 250 Points");
    }
    if (Points >= 10000 && localStorage.Earn10000Points == undefined) {
        EarnAchievement("Earn10000Points", "Earn 10,000 Points");
    }
    if (Points >= 100000 && localStorage.Earn100000Points == undefined) {
        EarnAchievement("Earn100000Points", "Earn 100,000 Points");
    }
    var bu = localStorage;
    if (bu.amountUnlocked >= 3 && localStorage.Unlock3Bs == undefined) {
        EarnAchievement("Unlock3Bs", "Unlock 3 B's");
    }
    if (bu.amountUnlocked >= 5 && localStorage.Unlock5Bs == undefined) {
        EarnAchievement("Unlock5Bs", "Unlock 5 B's");
    }
    if (bu.amountUnlocked >= 10 && localStorage.Unlock10Bs == undefined) {
        EarnAchievement("Unlock10Bs", "Unlock 10 B's");
    }
    if (bu.amountUnlocked >= 16 && localStorage.Unlock16Bs == undefined) {
        EarnAchievement("Unlock16Bs", "Unlock 16 B's");
    }
}



function Earn(amount) {
    amount = parseFloat(amount); 
    
    Points = parseFloat(Points) + parseFloat(amount);
    localStorage.bPoints = Points;
    CheckAchivements();
    
    Refresh();

 }
 
 function Purchase(amount) {
    Points = parseFloat(Points) - parseFloat(amount);
    localStorage.bPoints = Points;
    Refresh();
 }

function ClickB(name, worth) {
    if (localStorage.getItem(name) == "true") {
        Earn(worth);
    }
    else {
        ShowMessage("Not Unlocked!", "This B is not unlocked. Press the unlock button below the B to unlock it.")
    }
}

function UnlockB(name, cost) {
    if (localStorage.getItem(name) == "false") {  
        if (Points >= cost) {
            localStorage.setItem(name, "true");
            ShowMessage("Unlocked B!", "You have unlocked the " + name + " B.");
            if (localStorage.amountUnlocked == undefined) {
                localStorage.amountUnlocked = 1;
            }
            else {
                localStorage.amountUnlocked = parseFloat(localStorage.amountUnlocked) + 1;
            } 
            Purchase(cost);  
        }
        else {
            ShowMessage("Insufficient Points!", "Earn more points to do this task.");
        }
    }
    else {
        ShowMessage("Already Unlocked!", "Click the B button to get points.");
    }
    Refresh();
}

function ChangeUsername() {
    localStorage.bUsername = document.getElementById("UsernameInput").value;
    ShowMessage("Username Changed!", "Your username has been changed to " + localStorage.bUsername + ".");
}

function SubmitScore() {  
        var answer = confirm("Are You Sure You Want To Win With Username '" + localStorage.bUsername + "' ?")
        if (answer == true) {
            openURL("https://gaftop.com/bClick/play/win/win.php?username=" + localStorage.bUsername + "&points=" + Points.toString());
            NewGame();
            ShowMessage("Submitting Score Successful!", "As a result, bClick has started a new game. Good job!")
        }
}

function SeeWinners() {
    openURL("https://gaftop.com/bClick/play/win/leaderboards.php");
}

if (NewGameYet == undefined) {
    NewGame();
}
else {
    var Points = localStorage.bPoints;
    var Interest = localStorage.bInterest;
}
Refresh();

function OrientChange() {
    if (window.orientation == 0 && isMobile.any()) {
        ShowMessage("Orient Landscape!", "Please orient to landscape mode to play.");
    }
}

OrientChange();

window.addEventListener("orientationchange", OrientChange, false);

function CollectInterest() {  
  Earn(Interest);
}

function Deposit() {
    if (document.bank.Deposit.value != "") {
        if (Points >= document.bank.Deposit.value) {
            Interest = parseFloat(Interest) + parseFloat(document.bank.Deposit.value) * 0.05;
            localStorage.bInterest = Interest;
            Purchase(document.bank.Deposit.value);
        }  
    }
}

function DepositAll() {
    Interest = parseFloat(Interest) + parseFloat(Points) * 0.05;
    localStorage.bInterest = Interest;
    Purchase(Points); 
}

function DepositHalf() {
    var Half = parseFloat(Points) * 0.5;
    Interest = parseFloat(Interest) + parseFloat(Half) * 0.05;
    localStorage.bInterest = Interest;
    Purchase(Half); 
}

function DepositFourth() {
    var Fourth = parseFloat(Points) * 0.25;
    Interest = parseFloat(Interest) + parseFloat(Fourth) * 0.05;
    localStorage.bInterest = Interest;
    Purchase(Fourth); 
}

var BankTimer=setInterval(function(){CollectInterest()},1000);

document.getElementById("UsernameInput").value = localStorage.bUsername;