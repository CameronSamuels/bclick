/* ===========  Variables  =========== */

var PointsVar = localStorage.PointsSaved;

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
     Earn(175);
   }
 }

 function DrawSpikyB() {
   if (localStorage.SpikyB == "Unlocked") {
     Earn(250);
   }
 }

 function DrawElectricB() {
   if (localStorage.ElectricB == "Unlocked") {
     Earn(500);
   }
 }

 function DrawiPadAirB() {
   if (localStorage.iPadAirB == "Unlocked") {
     Earn(750);
   }
 }

 function DrawCurvedB() {
   if (localStorage.CurvedB == "Unlocked") {
    Earn(1500);
   }
 }

 function DrawSharkB() {
   if (localStorage.SharkB == "Unlocked") {
     Earn(2000);
   }
 }

 function DrawDuckB() {
   if (localStorage.DuckB == "Unlocked") {
     Earn(2000);
   }
 }

 function DrawUltraFancyB() {
   if (localStorage.UltraFancyB == "Unlocked") {
     Earn(5000);
   }
 }

 function DrawLightningB() {
   if (localStorage.LightningB == "Unlocked") {
     Earn(7500);
   }
 }

 function DrawBAWE() {
   if (localStorage.BAWE == "Unlocked") {
     Earn(50000);
   }
 }

 function DrawGoldenB() {
   if (localStorage.GoldenB == "Unlocked") {
     Earn(1000000);
   }
 }


/* ===========  Unlocking  =========== */


 function UnlockRegularB() {  
   localStorage.RegularB = "Unlocked";
   document.getElementById("RegularB").innerHTML = "Unlocked";
 }

 function UnlockSawB() {
   if (localStorage.SawB == "Not Unlocked") {  
     if (PointsVar >= 500) {
       Purchase(500);
       document.getElementById("SawB").innerHTML = "Unlocked";
       localStorage.SawB = "Unlocked";
     }
   }
 }

 function UnlockSpikyB() {
   if (localStorage.SpikyB == "Not Unlocked") {  
     if (PointsVar >= 7500) {
       Purchase(7500);
       document.getElementById("SpikyB").innerHTML = "Unlocked";
       localStorage.SpikyB = "Unlocked";
     }
   }
 }

 function UnlockElectricB() {  
   if (localStorage.ElectricB == "Not Unlocked") {  
     if (PointsVar >= 20000) {
       Purchase(20000);
       document.getElementById("ElectricB").innerHTML = "Unlocked";
       localStorage.ElectricB = "Unlocked";
     }
   }
 }

 function UnlockiPadAirB() {  
   if (localStorage.iPadAirB == "Not Unlocked") {  
     if (PointsVar >= 50000) {
       Purchase(50000);
       document.getElementById("iPadAirB").innerHTML = "Unlocked";
       localStorage.iPadAirB = "Unlocked";
     }
   }
 }



 function UnlockCurvedB() {
   if (localStorage.CurvedB == "Not Unlocked") {  
     if (PointsVar >= 250000) {
       Purchase(250000);
       document.getElementById("CurvedB").innerHTML = "Unlocked";
       localStorage.CurvedB = "Unlocked";
     }
   }
 }

 function UnlockSharkB() {
   if (localStorage.SharkB == "Not Unlocked") {  
     if (PointsVar >= 500000) {
       Purchase(500000);
       document.getElementById("SharkB").innerHTML = "Unlocked";
       localStorage.SharkB = "Unlocked";
     }
   }
 }

 function UnlockDuckB() {
   if (localStorage.DuckB == "Not Unlocked") {  
     if (PointsVar >= 500000) {
       Purchase(500000);
       document.getElementById("DuckB").innerHTML = "Unlocked";
       localStorage.DuckB = "Unlocked";
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
    if (localStorage.lightningB == "Not Unlocked") {  
     if (PointsVar >= 5000000) {
       Purchase(5000000);
       document.getElementById("LightningB").innerHTML = "Unlocked";
       localStorage.LightningB = "Unlocked";
     }
   }
 }
  
 function UnlockBAWE() {
   if (localStorage.BAWE == "Not Unlocked") {  
     if (PointsVar >= 500000000) {
       Purchase(500000000);
       document.getElementById("BAWE").innerHTML = "Unlocked";
       localStorage.BAWE = "Unlocked";
     }
   }
 }
  
 function UnlockGoldenB() {
   if (localStorage.GoldenB == "Not Unlocked") {  
     if (PointsVar >= 1000000000) {
       Purchase(1000000000);
       document.getElementById("GoldenB").innerHTML = "Unlocked";
       localStorage.GoldenB = "Unlocked";
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
     document.getElementById("InBank").innerHTML = "In Bank: " + InBankVar;

     InterestVar = parseFloat(InterestVar) + parseFloat(document.bank.Deposit.value) * 0.05;
     document.getElementById("Interest").innerHTML = "Interest: " + InterestVar;
    
     PointsVar = parseFloat(PointsVar) - document.bank.Deposit.value;
     document.getElementById("Points").innerHTML = "Points: " + PointsVar;

   if (TimerEnabled == "False") {
     TimerEnabled = "True";
     var myVar=setInterval(function(){CollectBonus()},1000);
   }

   localStorage.PointsSaved = PointsVar;
   localStorage.Interest = InterestVar;
   localStorage.InBank = InBankVar;

   Commas();

   } 
 }


    /* ===========  Other  =========== */

 function YouWin() {  
   if (PointsVar >= 100000000000000000000) {
     PointsVar = parseFloat(PointsVar) - 100000000000000000000;
     localStorage.PointsSaved = PointsVar;
     location.href = 'http:theletterbgame.com/youwin.html';
     Commas();
   } 
 }


    /* ===========  Common  =========== */


 function Earn(Amount) {
   PointsVar = parseFloat(PointsVar) + Amount;
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
   NewPointsVar = PointsVar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   document.getElementById("Points").innerHTML = "Points: " + NewPointsVar;

   var NewInterest = Math.round(InterestVar);
   NewInterest = InterestVar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   document.getElementById("Interest").innerHTML = "Interest: " + NewInterest;

   var NewInBank = Math.round(InBankVar);
   NewInBank = InBankVar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   document.getElementById("InBank").innerHTML = "In Bank: " + NewInBank;

 }


    /* ===========  Saving And Loading  =========== */

 function Load() {

   if (localStorage.Interest >= 1) {
     TimerEnabled = "True";
     var myVar=setInterval(function(){CollectBonus()},1000);
   }
   document.getElementById("Points").innerHTML = "Points: " + localStorage.PointsSaved;
   document.getElementById("RegularB").innerHTML = localStorage.RegularB;
   document.getElementById("SawB").innerHTML = localStorage.SawB;
   document.getElementById("SpikyB").innerHTML = localStorage.SpikyB;
   document.getElementById("ElectricB").innerHTML = localStorage.ElectricB;
   document.getElementById("iPadAirB").innerHTML = localStorage.iPadAirB;
   document.getElementById("CurvedB").innerHTML = localStorage.CurvedB;
   document.getElementById("SharkB").innerHTML = localStorage.SharkB;
   document.getElementById("DuckB").innerHTML = localStorage.DuckB;
   document.getElementById("UltraFancyB").innerHTML = localStorage.UltraFancyB;
   document.getElementById("LightningB").innerHTML = localStorage.LightningB;
   document.getElementById("BAWE").innerHTML = localStorage.BAWE;
   document.getElementById("GoldenB").innerHTML = localStorage.GoldenB;
   document.getElementById("Interest").innerHTML = "Interest: " + localStorage.Interest;
   document.getElementById("InBank").innerHTML = "In Bank: " + localStorage.InBank;
   Commas();
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
   localStorage.DuckB = "Not Unlocked";
   localStorage.SharkB = "Not Unlocked";
   localStorage.UltraFancyB = "Not Unlocked";
   localStorage.LightningB = "Not Unlocked";
   localStorage.BAWE = "Not Unlocked";
   localStorage.GoldenB = "Not Unlocked";

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
   document.getElementById("DuckB").innerHTML = localStorage.DuckB;
   document.getElementById("UltraFancyB").innerHTML = localStorage.UltraFancyB;
   document.getElementById("LightningB").innerHTML = localStorage.LightningB;
   document.getElementById("BAWE").innerHTML = localStorage.BAWE;
   document.getElementById("GoldenB").innerHTML = localStorage.GoldenB;

   document.getElementById("Interest").innerHTML = "Interest: " + localStorage.Interest;
   document.getElementById("InBank").innerHTML = "In Bank: " + localStorage.InBank;
   Commas();
 }