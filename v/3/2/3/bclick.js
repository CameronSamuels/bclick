var NewGameYet = localStorage.bClick23;
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
    "Earn1000Points",
    "Earn1MilPoints",
    "Earn1BilPoints",
    "Unlock3Bs",
    "Unlock5Bs",
    "Unlock10Bs",
    "Unlock16Bs",
    "Click50Times",
    "Click500Times",
    "Click1500Times",
    "Have1000Interest",
    "Have1MilInterest",
    "Have1BilInterest"
];

var AchievementsSpaces = [
    "Earn 1 Thousand Points",
    "Earn 1 Million Points",
    "Earn 1 Billion Points",
    "Unlock 3 B's",
    "Unlock 5 B's",
    "Unlock 10 B's",
    "Unlock 16 B's",
    "Click 50 Times",
    "Click 500 Times",
    "Click 1.5 Thousand Times",
    "Have 1 Thousand Interest",
    "Have 1 Million Interest",
    "Have 1 Billion Interest"
];

var settings = {
    decimals : 1,
    username : "bClickPlayer"
}

function id(id) { return document.getElementById(id); }

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseFloat(x.toString().split('e+')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseFloat(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}

function openURL(url) {
    window.open(url, "_blank");
}

function bColorChange(action) {
    if (action == "start") {
        var bButton = document.getElementById("bButton");
        bButton.style.backgroundColor = "#AAA";
    }
    else if (action == "end") {
        var bButton = document.getElementById("bButton");
        bButton.style.backgroundColor = "#DDD"; 
    }
    else if (action == "hover") {
        var bButton = document.getElementById("bButton");
        bButton.style.backgroundColor = "#CCC"; 
    }
}

function RenderMouseEvents() {
    if (!isMobile.any()) {
        var buttons = document.getElementsByClassName("button");
        var i;
        for (i = 0; i < buttons.length; i++) {
            var onclick = buttons[i].getAttribute("ontouchend");
            buttons[i].setAttribute("onclick", onclick, false);
        }
        var bButton = document.getElementById("bButton");
        var ontouchstart = bButton.getAttribute("ontouchstart");
        bButton.setAttribute("onmousedown", ontouchstart, false);
        // var ontouchend = bButton.getAttribute("ontouchend");
        // bButton.setAttribute("onmouseup", ontouchend, false);
        var miniButtons = document.getElementsByClassName("minimize");
        for (i = 0; i < miniButtons.length; i++) {
            var onclick = miniButtons[i].getAttribute("ontouchend");
            miniButtons[i].setAttribute("onclick", onclick, false);
        }
    }
}

// return num > 999999 ? (num/1000000).toFixed(1) + ' Million' : num;
function numFormat(num) {
    if (num >= 1000 && num < 1000000) {
        return (num/1000).toFixed(settings.decimals) + ' Thousand';
    }
    else if (num >= 1000000 && num < 1000000000) {
        return (num/1000000).toFixed(settings.decimals) + ' Million';
    } 
    else if (num >= 1000000000 && num <= 1000000000000) {
        return (num/1000000000).toFixed(settings.decimals) + ' Billion';
    }
    else if (num >= 1000000000000 && num <= 1000000000000000) {
        return (num/1000000000000).toFixed(settings.decimals) + ' Trillion';
    }
    else if (num >= 1000000000000000 && num <= 1000000000000000000) {
        return (num/1000000000000000).toFixed(settings.decimals) + ' Quadrillion';
    }
    else if (num >= 1000000000000000000 && num <= 1000000000000000000000) {
        return (num/1000000000000000000).toFixed(settings.decimals) + ' Quintillion';
    }
    else if (num >= 1000000000000000000000 && num <= 1000000000000000000000000) {
        return (num/1000000000000000000000).toFixed(settings.decimals) + ' Sextillion';
    }
    else if (num >= 1000000000000000000000000 && num <= 1000000000000000000000000000) {
        return (num/1000000000000000000000000).toFixed(settings.decimals) + ' Septillion';
    }
    else if (num >= 1000000000000000000000000000 && num <= 1000000000000000000000000000000) {
        return (num/1000000000000000000000000000).toFixed(settings.decimals) + ' Octillion';
    }
    else if (num >= 1000000000000000000000000000000 && num <= 1000000000000000000000000000000000) {
        return (num/1000000000000000000000000000000).toFixed(settings.decimals) + ' Nonillion';
    }
    else if (num >= 1000000000000000000000000000000000 && num <= 1000000000000000000000000000000000000) {
        return (num/1000000000000000000000000000000000).toFixed(settings.decimals) + ' Decillion';
    }
    else {
        return (num/1).toFixed(0);
    }
}

function format() {
    // if (Points >= 1000) {
        id('Points').innerHTML = "Points: " + numFormat(Points);
    // }
    // else {
    //     var NewPoints = Math.round(Points);
    //     NewPoints = NewPoints.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //     document.getElementById("Points").innerHTML = "Points: " + NewPoints;
    //     document.title = "Points: " + NewPoints;
    // }
    // if (Interest >= 1000000) {
        id('Interest').innerHTML = "Interest: " + numFormat(Interest);
    // }
    // else {
    //     var NewInterest = Math.round(Interest);
    //     NewInterest = NewInterest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //     document.getElementById("Interest").innerHTML = "Interest: " + NewInterest;
    // }
    // if (Deposited >= 1000000) {
        id('Deposited').innerHTML = "Deposited: " + numFormat(Deposited);
    // }
    // else {
    //     var NewDeposited = Math.round(Deposited);
    //     NewDeposited = NewDeposited.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //     document.getElementById("Deposited").innerHTML = "Deposited: " + NewDeposited;
    // }
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
            URL = "https://playbclick.com/assets/b/new/LowercaseB.png";
            BGI = "#FFF";
            var bSection = document.getElementById("bSection");
            bSection.className = "section";
            break;
        case "Regular":
            Cost = 50;
            Worth = 10;
            URL = "https://playbclick.com/assets/b/new/RegularB.png";
            BGI = "#999";
            break;
        case "Saw":
            Cost = 300;
            Worth = 100;
            URL = "https://playbclick.com/assets/b/new/SawB.png";
            BGI = "#F00";
            break;
        case "Spiky":
            Cost = 5000;
            Worth = 500;
            URL = "https://playbclick.com/assets/b/new/SpikyB.png";
            BGI = "#FF0080";
            break;
        case "Electric":
            Cost = 10000;
            Worth = 1000;
            URL = "https://playbclick.com/assets/b/new/ElectricB.png";
            BGI = "#FFA500";
            break;
        case "Thin":
            Cost = 25000;
            Worth = 5000;
            URL = "https://playbclick.com/assets/b/new/ThinB.png";
            BGI = "yellow";
            break;
        case "Curved":
            Cost = 100000;
            Worth = 10000;
            URL = "https://playbclick.com/assets/b/new/CurvedB.png";
            BGI = "#0F0";
            break;
        case "Shark":
            Cost = 500000;
            Worth = 25000;
            URL = "https://playbclick.com/assets/b/new/SharkB.png";
            BGI = "#060";
            break;
        case "Fancy":
            Cost = 1000000;
            Worth = 50000;
            URL = "https://playbclick.com/assets/b/new/FancyB.png";
            BGI = "#6CF";
            break;
        case "Lightning":
            Cost = 5000000;
            Worth = 100000;
            URL = "https://playbclick.com/assets/b/new/LightningB.png";
            BGI = "navy";
            break;
        case "Awesome":
            Cost = 50000000;
            Worth = 1000000;
            URL = "https://playbclick.com/assets/b/new/AwesomeB.png";
            BGI = "#909";
            break;
        case "Golden":
            Cost = 100000000;
            Worth = 10000000;
            URL = "https://playbclick.com/assets/b/new/GoldenB.png";
            BGI = "#FFD700";
            break;
        case "Handrawn":
            Cost = 1000000000;
            Worth = 1000000000;
            URL = "https://playbclick.com/assets/b/new/HandrawnB.png";
            BGI = "#000";
            break;
        case "Pattern":
            Cost = 1000000000000;
            Worth = 1000000000000;
            URL = "https://playbclick.com/assets/b/new/RegularB.png";
            BGI = "url('https://playbclick.com/assets/img/bg/pattern.jpg')";
            var bSection = document.getElementById("bSection");
            bSection.className = "section";
            break;
        case "Gradient":
            Cost = 1000000000000000;
            Worth = 1000000000000000;
            URL = "https://playbclick.com/assets/b/new/RegularB.png";
            BGI = "";
            var bSection = document.getElementById("bSection");
            bSection.className = "section gradientB";
            break;
        case "Disco":
            Cost = 1000000000000000000;
            Worth = 1000000000000000000;
            URL = "https://playbclick.com/assets/b/new/RegularB.png";
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

    bButton.setAttribute("ontouchend", "ClickB('" + Name + "', " + Worth + ");bColorChange('end')");
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
    format();
    RefreshB();
    RenderMouseEvents();
    RefreshAchievements();
}

function SoftReset() {
    localStorage.bPoints = 0;
    Points = 0;
    Interest = 0;
    localStorage.bInterest = 0;
    
    localStorage.bClicks = 0;
    localStorage.amountUnlocked = 0;

    for (i = 0; i < AllB.length; i++) {
        localStorage.setItem(AllB[i], "false");
    }
    localStorage.bClick23 = "true";
    location.reload();
}

function HardReset() {
    i = 0;
    for (i = 0; i < Achievements.length; i++) {
        localStorage.removeItem(Achievements[i]);
    }
    localStorage.bMultiplier = 1;
    Multiplier = 1;
    SoftReset();   

}



function ConfirmHR() {
    var answer = confirm("Are You Sure You Want To Reset Everything?");
    if (answer == true) {
        HardReset();
    }
}

function ConfirmSR() {
    var answer = confirm("Are You Sure You Want To Reset Your Game? You keep your achievements.");
    if (answer == true) {
        SoftReset();
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

if (isMobile.iOS() || isMobile.Android()) {
    if(window.navigator.standalone == false){
        ShowMessage("Mobile Device Detected!", "You Can Add This To Your Homescreen For Better Functionality.");
    }
}

function Minimize(list, button) {
    list = document.getElementById(list);
    list.style.display = (list.style.display != 'none' ? 'none' : '' );
    button = document.getElementById(button);
    button.innerText = (button.innerText != '+' ? '+' : '-' );
}

function EarnAchievement(id, name) {
    localStorage.setItem(id, "true");
    ShowMessage("Earned the " + name + " Achievement!", "You have earned an achievment.");
    Multiplier = parseFloat(Multiplier) * 1.25;
    localStorage.bMultiplier = Multiplier;
}

function CheckAchivements() {
    if (Points >= 1000 && localStorage.Earn1000Points == undefined) {
        EarnAchievement("Earn1000Points", "Earn 1000 Points");
    }
    if (Points >= 1000000 && localStorage.Earn1MilPoints == undefined) {
        EarnAchievement("Earn1MilPoints", "Earn 1 Million Points");
    }
    if (Points >= 1000000000 && localStorage.Earn1BilPoints == undefined) {
        EarnAchievement("Earn1BilPoints", "Earn 1 Billion Points");
    }
    if (localStorage.amountUnlocked >= 3 && localStorage.Unlock3Bs == undefined) {
        EarnAchievement("Unlock3Bs", "Unlock 3 B's");
    }
    if (localStorage.amountUnlocked >= 5 && localStorage.Unlock5Bs == undefined) {
        EarnAchievement("Unlock5Bs", "Unlock 5 B's");
    }
    if (localStorage.amountUnlocked >= 10 && localStorage.Unlock10Bs == undefined) {
        EarnAchievement("Unlock10Bs", "Unlock 10 B's");
    }
    if (localStorage.amountUnlocked >= 16 && localStorage.Unlock16Bs == undefined) {
        EarnAchievement("Unlock16Bs", "Unlock 16 B's");
    }
    if (localStorage.bClicks >= 50 && localStorage.Click50Times == undefined) {
        EarnAchievement("Click50Times", "Click 50 Times");
    }
    if (localStorage.bClicks >= 500 && localStorage.Click500Times == undefined) {
        EarnAchievement("Click500Times", "Click 500 Times");
    }
    if (localStorage.bClicks >= 1500 && localStorage.Click1500Times == undefined) {
        EarnAchievement("Click1500Times", "Click 1500 Times");
    }
    if (localStorage.bInterest >= 1000 && localStorage.Have1000Interest == undefined) {
        EarnAchievement("Have1000Interest", "Have 1,000 Interest");
    }
    if (localStorage.bInterest >= 1000000 && localStorage.Have1MilInterest == undefined) {
        EarnAchievement("Have1MilInterest", "Have 1 Million Interest");
    }
    if (localStorage.bInterest >= 1000000000 && localStorage.Have1BilInterest == undefined) {
        EarnAchievement("Have1BilInterest", "Have 1 Billion Interest");
    }
}

// var anim;
// var loops;

// function add(amount, times, anim) {
//     loops = times;
//     if (loops >= 1) {
//         Points = parseFloat(Points) + parseFloat(amount);
//         localStorage.bPoints = Points;
//         CheckAchivements();
//         Refresh();
//         loops = parseFloat(loops) - 1;
//     }
//     else {
//         clearInterval(anim);
//     }
// }

function Earn(amount) {
    amount = parseFloat(amount); 
    Points = parseFloat(Points) + parseFloat(amount);
    localStorage.bPoints = Points;
    CheckAchivements();
    Refresh();
    // var perMl = parseFloat(amount) * 0.2;
    // var needed = parseFloat(perMl) * 5;
    // anim = setInterval("add(" + perMl + ", 5, 'anim')", 600);
 }
 
 function Purchase(amount) {
    Points = parseFloat(Points) - parseFloat(amount);
    localStorage.bPoints = Points;
    Refresh();
 }

function ClickB(name, worth) {
    if (localStorage.getItem(name) == "true") {
        if (localStorage.bClicks == undefined) {
            localStorage.bClicks = 1;
        }
        else {
            localStorage.bClicks = parseFloat(localStorage.bClicks) + 1;
        }
        Earn(parseFloat(worth) * parseFloat(Multiplier));
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

// function UpgradeB(name) {
//     var Cost = localStorage.getItem(name + "Upgrade")
// }

function ChangeUsername() {
    localStorage.bUsername = document.getElementById("UsernameInput").value;
    ShowMessage("Username Changed!", "Your username has been changed to " + localStorage.bUsername + ".");
}

function SubmitScore() {  
        var answer = confirm("Are You Sure You Want To Win With Username '" + localStorage.bUsername + "' ?");
        if (answer == true) {
            openURL("https://playbclick.com/pages/win/win.php?username=" + localStorage.bUsername + "&points=" + toFixed(Points));
            SoftReset();
            ShowMessage("Submitting Score Successful!", "As a result, bClick has started a new game. Good job!");
        }
}

function SeeWinners() {
    openURL("https://playbclick.com/pages/win/leaderboards.php");
}

if (NewGameYet == undefined) {
/*    var answer = prompt("Choose a username:");
    localStorage.bUsername = answer;*/
HardReset();
}
else {
    var Points = localStorage.bPoints;
    var Interest = localStorage.bInterest;
    var Multiplier = localStorage.bMultiplier;
}
Refresh();

function OrientChange() {
    
}

OrientChange();

window.addEventListener("orientationchange", OrientChange, false);

function CollectInterest() {  
    Earn(Interest);
}

function Deposit(amount) {
    if (Points >= amount) {
        Deposited = parseFloat(Deposited) + parseFloat(amount);
        Interest = parseFloat(Interest) + parseFloat(Deposited) * 0.1;
        localStorage.bInterest = Interest;
        document.getElementById("Deposited").innerHTML = "Deposited: " + Deposited;
        Purchase(amount); 
    }
}

function Withdraw(amount) {
    Deposited = parseFloat(Deposited) - parseFloat(amount);
    Interest = parseFloat(Interest) - parseFloat(amount) * 0.1;
    localStorage.bInterest = Interest;
    document.getElementById("Deposited").innerHTML = "Deposited: " + Deposited;
    Earn(amount); 
}

function DepositCustom() {
    if (document.bank.Deposit.value != "") {
        Deposit(document.bank.Deposit.value);
    }
}

function DepositAll() {
if (Points > 0) {
    Deposit(Points);
}
}

function DepositHalf() {
    var Half = parseFloat(Points) * 0.5;
    Deposit(Half);
}

function DepositFourth() {
    var Fourth = parseFloat(Points) * 0.25;
    Deposit(Fourth);
}

function WithdrawHalf() {
    var Half = parseFloat(Deposited) * 0.5;
    Withdraw(Half);
}

function WithdrawFourth() {
    var Fourth = parseFloat(Deposited) * 0.25;
    Withdraw(Fourth);
}

function WithdrawAll() {
    var All = parseFloat(Deposited);
    Withdraw(All);
}

var BankTimer=setInterval(function(){CollectInterest()},1000);

document.getElementById("UsernameInput").value = localStorage.bUsername;


var rightPressed = false;
var leftPressed = false;

 document.addEventListener("keydown", keyDownHandler, false);
 document.addEventListener("keyup", keyUpHandler, false);
 
 function keyDownHandler(e) {
     if(e.keyCode == 39) {
         rightPressed = true;
         NextB();
     }
     else if(e.keyCode == 37) {
         leftPressed = true;
         PreviousB();
     }
 }
 
 function keyUpHandler(e) {
     if(e.keyCode == 39) {
         rightPressed = false;
     }
     else if(e.keyCode == 37) {
         leftPressed = false;
     }
 }
 
 var Deposited = localStorage.bInterest * 10;
 