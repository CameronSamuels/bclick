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

 document.addEventListener("keydown", keyDownHandler, false);
 document.addEventListener("keyup", keyUpHandler, false);
 
 function keyDownHandler(e) {
     if(e.keyCode == 39) {
         NextB();
     }
     else if(e.keyCode == 37) {
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


// if (obj.list.spaces[i].indexOf('Thousand') != -1) { amount = 1000 }
            // else if (obj.list.spaces[i].indexOf('Million') != -1) { amount = Math.pow(10, 6); }
            // else if (obj.list.spaces[i].indexOf('Billion') != -1) { amount = Math.pow(10, 9) }
            // else if (obj.list.spaces[i].indexOf('3') != -1) { amount = 3 }
            // else if (obj.list.spaces[i].indexOf('5') != -1) { amount = 5 }
            // else if (obj.list.spaces[i].indexOf('10') != -1) { amount = 3 }


            // if (list.spaces[i].indexOf('Points') != -1) {
                
            // }
            // else if (list.spaces[i].indexOf('Interest') != -1) {
            //     if (list.spaces[i].indexOf('Thousand') != -1) {}
            //     else if (list.spaces[i].indexOf('Million') != -1) {}
            //     else if (list.spaces[i].indexOf('Billion') != -1) {}
            // }
            // else if (list.spaces[i].indexOf('Click') != -1) {
            //     if (list.spaces[i].indexOf('50') != -1) {}
            //     else if (list.spaces[i].indexOf('500') != -1) {}
            //     else if (list.spaces[i].indexOf('1,500') != -1) {}
            // }
            // else if (list.spaces[i].indexOf('Unlock') != -1) {
            //     if (list.spaces[i].indexOf('3') != -1) {}
            //     else if (list.spaces[i].indexOf('5') != -1) {}
            //     else if (list.spaces[i].indexOf('16') != -1) {}
            // }