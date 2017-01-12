/* ===========  Variables  =========== */

var PointsVar = localStorage.PointsSaved;
var CurrentEarned = localStorage.PointsSaved;

var InterestVar = localStorage.Interest;
var InBankVar = localStorage.InBank;


/* ===========  Clicking  =========== */

 function DrawRegularB() {
   if (localStorage.RegularB == "Unlocked") {	
     Earn(10);
   }
 }

 function DrawSawB() {
   if (localStorage.SawB == "Unlocked") {
     Earn(100);
   }
 }

 function DrawSpikyB() {
   if (localStorage.SpikyB == "Unlocked") {
     Earn(500);
   }
 }

 function DrawElectricB() {
   if (localStorage.ElectricB == "Unlocked") {
     Earn(1000);
   }
 }

 function DrawiPadAirB() {
   if (localStorage.iPadAirB == "Unlocked") {
     Earn(5000);
   }
 }

 function DrawCurvedB() {
   if (localStorage.CurvedB == "Unlocked") {
    Earn(10000);
   }
 }

 function DrawSharkB() {
   if (localStorage.SharkB == "Unlocked") {
     Earn(25000);
   }
 }

 function DrawUltraFancyB() {
   if (localStorage.UltraFancyB == "Unlocked") {
     Earn(50000);
   }
 }

 function DrawLightningB() {
   if (localStorage.LightningB == "Unlocked") {
     Earn(100000);
   }
 }
 
 function DrawGhostB() {
   if (localStorage.GhostB == "Unlocked") {
     Earn(500000);
   }
 }

 function DrawBAWE() {
   if (localStorage.BAWE == "Unlocked") {
     Earn(1000000);
   }
 }

 function DrawGoldenB() {
   if (localStorage.GoldenB == "Unlocked") {
     Earn(10000000);
   }
 }
 
  function DrawHandrawnB() {
   if (localStorage.HandrawnB == "Unlocked") {
     Earn(1000000000);
   }
 }


/* ===========  Unlocking  =========== */


 function UnlockRegularB() {  
   localStorage.RegularB = "Unlocked";
   document.getElementById("RegularB").innerHTML = "Unlocked";
 }

 function UnlockSawB() {
   if (localStorage.SawB == "Not Unlocked") {  
     if (PointsVar >= 300) {
       Purchase(300);
       document.getElementById("SawB").innerHTML = "Unlocked";
       localStorage.SawB = "Unlocked";
     }
   }
 }

 function UnlockSpikyB() {
   if (localStorage.SpikyB == "Not Unlocked") {  
     if (PointsVar >= 5000) {
       Purchase(5000);
       document.getElementById("SpikyB").innerHTML = "Unlocked";
       localStorage.SpikyB = "Unlocked";
     }
   }
 }

 function UnlockElectricB() {  
   if (localStorage.ElectricB == "Not Unlocked") {  
     if (PointsVar >= 10000) {
       Purchase(10000);
       document.getElementById("ElectricB").innerHTML = "Unlocked";
       localStorage.ElectricB = "Unlocked";
     }
   }
 }

 function UnlockiPadAirB() {  
   if (localStorage.iPadAirB == "Not Unlocked") {  
     if (PointsVar >= 25000) {
       Purchase(25000);
       document.getElementById("iPadAirB").innerHTML = "Unlocked";
       localStorage.iPadAirB = "Unlocked";
     }
   }
 }



 function UnlockCurvedB() {
   if (localStorage.CurvedB == "Not Unlocked") {  
     if (PointsVar >= 100000) {
       Purchase(100000);
       document.getElementById("CurvedB").innerHTML = "Unlocked";
       localStorage.CurvedB = "Unlocked";
     }
   }
 }

 function UnlockSharkB() {
   if (localStorage.SharkB == "Not Unlocked") {  
     if (PointsVar >= 300000) {
       Purchase(300000);
       document.getElementById("SharkB").innerHTML = "Unlocked";
       localStorage.SharkB = "Unlocked";
     }
   }
 }
  
   function UnlockUltraFancyB() {
    if (localStorage.UltraFancyB == "Not Unlocked") {  
     if (PointsVar >= 1000000) {
       Purchase(1000000);
       document.getElementById("UltraFancyB").innerHTML = "Unlocked";
       localStorage.UltraFancyB = "Unlocked";
     }
   }
  }

   function UnlockLightningB() {
    if (localStorage.LightningB == "Not Unlocked") {  
     if (PointsVar >= 5000000) {
       Purchase(5000000);
       document.getElementById("LightningB").innerHTML = "Unlocked";
       localStorage.LightningB = "Unlocked";
     }
   }
 }
 
function UnlockGhostB() {
    if (localStorage.GhostB == "Not Unlocked") {  
     if (PointsVar >= 30000000) {
       Purchase(30000000);
       document.getElementById("GhostB").innerHTML = "Unlocked";
       localStorage.GhostB = "Unlocked";
     }
   }
 }
  
 function UnlockBAWE() {
   if (localStorage.BAWE == "Not Unlocked") {  
     if (PointsVar >= 100000000) {
       Purchase(100000000);
       document.getElementById("BAWE").innerHTML = "Unlocked";
       localStorage.BAWE = "Unlocked";
     }
   }
 }
  
 function UnlockGoldenB() {
   if (localStorage.GoldenB == "Not Unlocked") {  
     if (PointsVar >= 500000000) {
       Purchase(500000000);
       document.getElementById("GoldenB").innerHTML = "Unlocked";
       localStorage.GoldenB = "Unlocked";
     }
   }
 }
 
  function UnlockHandrawnB() {
   if (localStorage.HandrawnB == "Not Unlocked") {  
     if (PointsVar >= 1000000000) {
       Purchase(1000000000);
       document.getElementById("HandrawnB").innerHTML = "Unlocked";
       localStorage.HandrawnB = "Unlocked";
     }
   }
 }
 



    /* ===========  Bank  ===========  */


 function CollectBonus() {  
   PointsVar = parseFloat(PointsVar) + parseFloat(InterestVar);
   document.getElementById("Points").innerHTML = "Points: " + PointsVar;

   localStorage.PointsSaved = PointsVar;
   Commas();
 }

 function Deposit() {

   if (PointsVar >= document.bank.Deposit.value) {
     InBankVar = parseFloat(InBankVar) + parseFloat(document.bank.Deposit.value);

     InterestVar = parseFloat(InterestVar) + parseFloat(document.bank.Deposit.value) * 0.05;
    
     PointsVar = parseFloat(PointsVar) - document.bank.Deposit.value;

     localStorage.PointsSaved = PointsVar;
     localStorage.Interest = InterestVar;
     localStorage.InBank = InBankVar;

     Commas();

   } 
 }


    /* ===========  Winning  =========== */

 function YouWin() {  
   if (PointsVar >= 1000000000000000) {
     Purchase(1000000000000000);
     var user = prompt("Please Choose A Username:");
     if (user != null) {
         if (user != undefined) {
             if (user != "") {
                window.open("https://gaftop.com/bClick/game/win/win.php?username=" + user + "&points=" + PointsVar.toString(), "_blank");
                NewGame();       
              }
         }
     }
   } 
 }
 
 function Leaderboards() {
     window.open("https://gaftop.com/bClick/game/win/leaderboards.php", "_blank");
 }
 

    /* ===========  Other  =========== */
    
    function AndroidApp() {
        window.open("https://play.google.com/store/apps/details?id=com.wTLBGXtremeMobile", "_blank");
    }
    
    function Forums() {
        window.open("https://gaftop.com/bClick/pages/forum", "_blank")
    }
    
    function VersionSelect() {
        window.open("https://gaftop.com/bClick/pages/v-select", "_blank");  
    }


    /* ===========  Common  =========== */


 function Earn(Amount) {
   PointsVar = parseFloat(PointsVar) + Amount;
   localStorage.LifetimeAllPointsEarned = parseFloat(localStorage.LifetimeAllPointsEarned) + Amount;
   document.getElementById("Points").innerHTML = "Points: " + PointsVar;
   localStorage.PointsSaved = PointsVar;
   Commas();
 }

 function Purchase(Amount) {
   PointsVar = parseFloat(PointsVar) - Amount;
   localStorage.PointsSaved = PointsVar;
   document.getElementById("Points").innerHTML = "Points: " + PointsVar;
   Commas();
 }


 function Commas() {

   var NewPointsVar = Math.round(PointsVar);
   NewPointsVar = NewPointsVar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   document.getElementById("Points").innerHTML = "Points: " + NewPointsVar;
   document.title = "Points: " + NewPointsVar;

   var NewInterest = Math.round(InterestVar);
   NewInterest = NewInterest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   document.getElementById("Interest").innerHTML = "Interest: " + NewInterest;

   var NewInBank = Math.round(InBankVar);
   NewInBank = NewInBank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   document.getElementById("InBank").innerHTML = "In Bank: " + NewInBank;

 }


    /* ===========  Saving And Loading  =========== */

 function Load() {
    if (localStorage.StatsSet == undefined) {
        localStorage.StatsSet = true;
        localStorage.TotalGamesStarted = 0;
        localStorage.AllBClicks = 0;
        localStorage.LifetimeAllPointsEarned = 0;
    }

     var myVar=setInterval(function(){CollectBonus()},1000);
   
   if (localStorage.PointsSaved != undefined) {
      document.getElementById("Points").innerHTML = "Points: " + localStorage.PointsSaved;
      document.getElementById("RegularB").innerHTML = localStorage.RegularB;
      document.getElementById("SawB").innerHTML = localStorage.SawB;
      document.getElementById("SpikyB").innerHTML = localStorage.SpikyB;
      document.getElementById("ElectricB").innerHTML = localStorage.ElectricB;
      document.getElementById("iPadAirB").innerHTML = localStorage.iPadAirB;
      document.getElementById("CurvedB").innerHTML = localStorage.CurvedB;
      document.getElementById("SharkB").innerHTML = localStorage.SharkB;
      document.getElementById("UltraFancyB").innerHTML = localStorage.UltraFancyB;
      document.getElementById("LightningB").innerHTML = localStorage.LightningB;
      document.getElementById("GhostB").innerHTML = localStorage.GhostB;
      document.getElementById("BAWE").innerHTML = localStorage.BAWE;
      document.getElementById("GoldenB").innerHTML = localStorage.GoldenB;
      document.getElementById("HandrawnB").innerHTML = localStorage.HandrawnB;
      document.getElementById("Interest").innerHTML = "Interest: " + localStorage.Interest;
      document.getElementById("InBank").innerHTML = "In Bank: " + localStorage.InBank;
      Commas();
   }
   else {
      NewGame();   
   }
   
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

 function NewGame() {
  
       localStorage.PointsSaved = 0;
       PointsVar = 0;

       localStorage.RegularB = "Not Unlocked";
       localStorage.SawB = "Not Unlocked";
       localStorage.SpikyB = "Not Unlocked";
       localStorage.ElectricB = "Not Unlocked";
       localStorage.iPadAirB = "Not Unlocked";
       localStorage.CurvedB = "Not Unlocked";
       localStorage.SharkB = "Not Unlocked";
       localStorage.UltraFancyB = "Not Unlocked";
       localStorage.LightningB = "Not Unlocked";
       localStorage.GhostB = "Not Unlocked";
       localStorage.BAWE = "Not Unlocked";
       localStorage.GoldenB = "Not Unlocked";
       localStorage.HandrawnB = "Not Unlocked";

       localStorage.Interest = 0;
       localStorage.InBank = 0;
       InterestVar = 0;
       InBankVar = 0;

       document.getElementById("Points").innerHTML = "Points: " + localStorage.PointsSaved;

       document.getElementById("RegularB").innerHTML = localStorage.RegularB;
       document.getElementById("SawB").innerHTML = localStorage.SawB;
       document.getElementById("SpikyB").innerHTML = localStorage.SpikyB;
       document.getElementById("ElectricB").innerHTML = localStorage.ElectricB;
       document.getElementById("iPadAirB").innerHTML = localStorage.iPadAirB;
       document.getElementById("CurvedB").innerHTML = localStorage.CurvedB;
       document.getElementById("SharkB").innerHTML = localStorage.SharkB;
       document.getElementById("UltraFancyB").innerHTML = localStorage.UltraFancyB;
       document.getElementById("LightningB").innerHTML = localStorage.LightningB;
       document.getElementById("GhostB").innerHTML = localStorage.GhostB;
       document.getElementById("BAWE").innerHTML = localStorage.BAWE;
       document.getElementById("GoldenB").innerHTML = localStorage.GoldenB;
        document.getElementById("HandrawnB").innerHTML = localStorage.HandrawnB;
        
       document.getElementById("Interest").innerHTML = "Interest: " + localStorage.Interest;
       document.getElementById("InBank").innerHTML = "In Bank: " + localStorage.InBank;
       Commas();
       
       localStorage.TotalGamesStarted = parseFloat(localStorage.TotalGamesStarted) + 1;
 }

 function NewGameClick() {
    var answer = confirm("Are You Sure You want To Start A New Game?"); 
    if (answer == true) { 
      NewGame();
    }
 }
 

