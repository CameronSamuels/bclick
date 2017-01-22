function id(id) { return document.getElementById(id) }
var isMobile = {
	Android: function() { return navigator.userAgent.match(/Android/i); },
	iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
	Windows: function() { return navigator.userAgent.match(/IEMobile/i); },
	any: function() { return (isMobile.Android() || isMobile.iOS() || isMobile.Windows()); }
};

if (!isMobile.any()) id('homescreenTip').style.display = 'none';