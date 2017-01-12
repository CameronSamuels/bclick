/* Variables */
var PointsVar = localStorage.PointsSaved;
var InterestVar = localStorage.Interest;

/* Defining Sounds */
var kaching = new Audio("../assets/sound/kaching.mp3"); 
var buzzer = new Audio("../assets/sound/buzzer.mp3");
var swoosh = new Audio("../assets/sound/swoosh.mp3");

/* isMobile() */

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

/* Command Functions */

function openURL(url) {
    window.open(url, "_blank");
}

 function Earn(amount) {
     PointsVar = parseFloat(PointsVar) + parseFloat(amount);
     localStorage.PointsSaved = PointsVar;
     Commas();
 }
 
 function Purchase(amount) {
     PointsVar = parseFloat(PointsVar) - parseFloat(amount);
     localStorage.PointsSaved = PointsVar;
     Commas();
 }
 
/* General Functions */

function ClickB(name, worth) {
    if (localStorage.getItem(name) == "Unlocked") {
        Earn(worth);
    }
    else {
        buzzer.play();
    }
}

function UnlockB(name, cost) {
    if (localStorage.getItem(name) == "Not Unlocked") {  
        if (PointsVar >= cost) {
            document.getElementById(name).innerHTML = "Unlocked";
            localStorage.setItem(name, "Unlocked");
            Purchase(cost);
            kaching.play();
        }
        else {
            buzzer.play();
        }
    }
}

/* B Functions */

function DrawGhostB() {
  if (localStorage.GhostB == "Unlocked") {
        PointsVar = parseFloat(PointsVar) * 1.25;
        localStorage.PointsSaved = PointsVar;
        Commas();  
  }
}

/* Saving */

function NewGame() {
    PointsVar = 0;
    localStorage.PointsSaved = 0;
    localStorage.LowercaseB = "Not Unlocked";
    localStorage.RegularB = "Not Unlocked";
    localStorage.SawB = "Not Unlocked";
    localStorage.SpikyB = "Not Unlocked";
    localStorage.ElectricB = "Not Unlocked";
    localStorage.ThinB = "Not Unlocked";
    localStorage.CurvedB = "Not Unlocked";
    localStorage.SharkB = "Not Unlocked";
    localStorage.FancyB = "Not Unlocked";
    localStorage.LightningB = "Not Unlocked";
    localStorage.AwesomeB = "Not Unlocked";
    localStorage.GoldenB = "Not Unlocked";
    localStorage.HandrawnB = "Not Unlocked";
    localStorage.PatternB = "Not Unlocked";
    localStorage.GradientB = "Not Unlocked";
    localStorage.DiscoB = "Not Unlocked";
    localStorage.Interest = 0;
    if (localStorage.NewGameYetMobile != "true") {
        localStorage.GhostB = "Not Unlocked";
        localStorage.TurkeyB = "Not Unlocked";
        localStorage.CandyCaneB = "Not Unlocked";
        
    }
    localStorage.NewGameYetMobile = "true";
    location.reload();
}

function ClickNewGame() {
    var answer = confirm("Are You Sure You Want To Start A New Game?");
    if (answer == true) {
        NewGame();
    }
}

function Refresh() {
        document.getElementById("LowercaseB").innerHTML = localStorage.LowercaseB;
        document.getElementById("RegularB").innerHTML = localStorage.RegularB;
        document.getElementById("SawB").innerHTML = localStorage.SawB;
        document.getElementById("SpikyB").innerHTML = localStorage.SpikyB;
        document.getElementById("ElectricB").innerHTML = localStorage.ElectricB;
        document.getElementById("ThinB").innerHTML = localStorage.ThinB;
        document.getElementById("CurvedB").innerHTML = localStorage.CurvedB;
        document.getElementById("SharkB").innerHTML = localStorage.SharkB;
        document.getElementById("FancyB").innerHTML = localStorage.FancyB;
        document.getElementById("LightningB").innerHTML = localStorage.LightningB;
        document.getElementById("AwesomeB").innerHTML = localStorage.AwesomeB;
        document.getElementById("GoldenB").innerHTML = localStorage.GoldenB;
        document.getElementById("HandrawnB").innerHTML = localStorage.HandrawnB;
        document.getElementById("PatternB").innerHTML = localStorage.PatternB;
        document.getElementById("GradientB").innerHTML = localStorage.GradientB;
        document.getElementById("DiscoB").innerHTML = localStorage.DiscoB;
        
        var turkeyB = localStorage.TurkeyB;
        if (turkeyB != undefined) document.getElementById("TurkeyB").innerHTML = localStorage.TurkeyB;
        
        var CandyCaneB = localStorage.CandyCaneB;
        if (CandyCaneB != undefined) document.getElementById("CandyCaneB").innerHTML = localStorage.CandyCaneB;
        
        var ghostB = localStorage.GhostB;
        if (ghostB != undefined) document.getElementById("GhostB").innerHTML = localStorage.GhostB;
        Commas();
}

/* Bank */

function CollectInterest() {  
  Earn(InterestVar);
}

function Deposit() {
        if (PointsVar >= document.bank.Deposit.value) {
            InterestVar = parseFloat(InterestVar) + parseFloat(document.bank.Deposit.value) * 0.05;
            localStorage.Interest = InterestVar;
            Purchase(document.bank.Deposit.value);
        }
}

function DepositAll() {
    document.bank.Deposit.value = Math.round(PointsVar);
    Deposit();
}

var BankTimer=setInterval(function(){CollectInterest()},1000);
LoadDeposit();

/* Winning */

function ChooseUsername() {
    var userText = prompt("Please Choose A Username.");
    localStorage.Username = userText;
}

function YouWin() {  
        var answer = confirm("Are You Sure You Want To Win With Username '" + localStorage.Username + "' ?")
        if (answer == true) {
            openURL("https://gaftop.com/bClick/play/win/win.php?username=" + localStorage.Username + "&points=" + PointsVar.toString());
            NewGame();
            alert("Great Job Winning bClick!");
        }
        else {
            ChooseUsername();
        }
}

/* Rendering */

function Commas() {
	var NewPointsVar = Math.round(PointsVar);
   	NewPointsVar = NewPointsVar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	document.getElementById("Points").innerHTML = "Points: " + NewPointsVar;

	var NewInterest = Math.round(InterestVar);
	NewInterest = NewInterest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	document.getElementById("Interest").innerHTML = "Interest: " + NewInterest;
}

function RenderMouseEvents(everything) {
    if (everything == true) {
        var buttons = document.getElementsByClassName("button");
        var i;
        for (i = 0; i < buttons.length; i++) {
            var onclick = buttons[i].getAttribute("ontouchend");
            buttons[i].setAttribute("onclick", onclick, false);
        }
        var images = document.getElementsByTagName("IMG");
        var i;
        for (i = 0; i < images.length; i++) {
            var onclickimg = images[i].getAttribute("ontouchend");
            images[i].setAttribute("onclick", onclickimg, false);
        }
    }
    else {
        var button = document.getElementById("UnlockButton");
        if (!isMobile.any()) {
            button.setAttribute("onclick", button.getAttribute("ontouchend"));
        }
    }
}

if (!isMobile.any()) {
    RenderMouseEvents(true);
}

function Load() {
    if (localStorage.NewGameYetMobile != undefined) {
        Refresh();
    }
    else {
        NewGame();
    }
        
    var d = new Date()
    var month = d.getMonth();
    var day = d.getDate();
    
    switch (month) {
        case 9:
            if (day == 31) {
                alert("Happy Halloween! You have unlocked an exclusive Ghost B. You keep it even if you start a new game. The ghost B multiplies your points by 1.25.");
                UnlockB('GhostB', 0);
            }
            break;
        case 10: 
            if (day == 24) {
                    alert("Happy Thanksgiving! You have unlocked an exclusive Turkey B. You keep it even if you start a new game. The turkey B gives you how much your interest is.");
                UnlockB('TurkeyB', 0); 
            }
            break;   
        case 11: 
            if (day == 25) {
                    alert("Merry Christmas! You have unlocked an exclusive Candy Cane B. You keep it even if you start a new game. The Candy Cane B gives you how much your interest is.");
                UnlockB('CandyCaneB', 0); 
            }
            break;
    }
    document.getElementById("wrapper").style.display = "block";
}



function LoadDeposit() {
    var depositvalue = getQueryVariable("Deposit");
    if (depositvalue != undefined) {
        document.bank.Deposit.value = depositvalue;
        Deposit();
    }
}

    function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
    }
/* Popups */
            function showPopup(id) {
                var popup = document.getElementById(id);
                popup.style.display = 'block';
                popup.setAttribute("class", "popup slide");
                swoosh.play();
            }
            function hidePopup(id) {
                var popup = document.getElementById(id);
                popup.style.display = 'block';
                popup.setAttribute("class", "popup slide-2");
                swoosh.play();
            }
            function UpdatePopup(BName, Cost, Worth) {
                var NameText = document.getElementById("PopupBName");
                var CostText = document.getElementById("PopupCost");
                var WorthText = document.getElementById("PopupWorth");
                var UnlockButton = document.getElementById("UnlockButton");
                
                var NewCost = Cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var NewWorth = Worth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                NameText.innerHTML = BName + " B";
                CostText.innerHTML = NewCost + " Points";
                WorthText.innerHTML = NewWorth + " Points";
                UnlockButton.setAttribute("ontouchend", "UnlockB('" + BName + "B', " + Cost + ");");

                RenderMouseEvents(false);
                showPopup('popup');
}

