id('coins').innerHTML = localStorage.coins;
var current = "aonarchy";
if (window.location.hash != '') current = window.location.hash.toString().replace('#', '');
purchase(current);