		function id(id) { return document.getElementById(id) }

		var isMobile = {
		    Android: function() { return navigator.userAgent.match(/Android/i); },
		    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
		    Windows: function() { return navigator.userAgent.match(/IEMobile/i); },
		    any: function() { return (isMobile.Android() || isMobile.iOS() || isMobile.Windows()); }
		};

		var a = {
			name: '',
			health: 0,
			attack: 0,
			speed: 0
		}, b = {
			name: '',
			health: 0,
			attack: 0,
			speed: 0
		}, current = 'original',
		goodNames = {
			url : 'b',
			original : ['saw', 'spiky', 'electric', 'shark', 'ghost', 'dragonball', 'giant', 'spear', 'superhero'],
			bocracy : ['knight', 'archer', 'barbed', 'flower', 'muscle', 'trump'],
			dino : ['carnotaurus', 'shark'],
			fantasy : ['dovahkinn', 'mage', 'superhero', 'giant', 'dragonball', 'ghost'],
			horror : ['killer', 'carnotaurus', 'trump', 'ghost', 'shark'],
			aonarchy : ['bentacrabb', 'b-shuttle', 'f87-cannon', 'd15-cannon', 'sharkanator'],
			weaklings : ['regular', 'lowercase', 'handrawn', 'fancy', 'curved', 'thin'],
			christmas : ['santa', 'candycane'],
			team : ['cameron', 'faith', 'ethan', 'alwin', 'michael', 'srisha', 'cooper', 'jessica', 'vishwam']
		}, badNames = {
			url : 'a',
			original : ['saw', 'spiky', 'electric', 'shark', 'ghost', 'dragonball', 'giant', 'spear', 'superhero'],
			bocracy : ['knight', 'archer', 'barbed', 'flower', 'muscle', 'trump'],
			dino : ['carnotaurus', 'shark'],
			fantasy : ['dovahkinn', 'mage', 'superhero', 'giant', 'dragonball', 'ghost'],
			horror : ['killer', 'carnotaurus', 'trump', 'ghost', 'shark'],
			aonarchy : ['goblins', 'warrior', 'witchcraft', 'siren', 'guardian', 'jak-o-anterns', 'phantom', 'anonymous', 'archer'],
			weaklings : ['regular', 'lowercase', 'handrawn', 'fancy', 'curved', 'thin'],
			christmas : ['santa', 'candycane'],
			team : ['cameron', 'faith', 'ethan', 'alwin', 'michael', 'srisha', 'cooper', 'jessica', 'vishwam']
		};
		if (window.location.hash != '') current = window.location.hash.toString().replace('#', '');
		var game = {
			on : 'false',
			refresh : {
				display : function() {
					id('bName').innerHTML = b.name + ' ' + goodNames.url;
					id('aName').innerHTML = a.name + ' ' + badNames.url;

					id('bHealthBar').style.width = (b.health / b.orig_health)*100 + '%';
					id('aHealthBar').style.width = (a.health / a.orig_health)*100 + '%';

					id('bButton').style.backgroundImage = 'url(https://playbclick.com/assets/' + goodNames.url + '/' + b.name + '.png)';
					id('aButton').style.backgroundImage = 'url(https://playbclick.com/assets/' + badNames.url + '/' + a.name + '.png)';
				},
				all : function() {
					game.refresh.display();
					window.requestAnimationFrame(game.refresh.all);
				}
			},
			win : function(side) {
				id('overlayText').innerHTML = 'WINNER: ' + side + '!!!';
				id('overlay').style.display = "block";
				game.on = 'false';
				if (side == 'a') { id('sound').src = "loss.wav"; id('audio').load(); id('audio').play(); }
			},
			attack : function(atk) {
				if (game.on == 'true') {
					if (atk == 'b') {
						a.health -= b.attack;
						a.health = Math.max(0, a.health);
						a.health = Math.min(a.orig_health, a.health);
						id('bSword').style.display = "block";
						id('bSword').style.WebkitAnimationName = "bSword";
						id('bSword').style.animationName = "bSword";
						setTimeout("id('bSword').style.display = 'none';id('bSword').style.WebkitAnimationName = '';id('bSword').style.animationName = '';", 100);
					} else if (atk == 'a') {
						b.health -= a.attack;
						b.health = Math.max(0, b.health);
						b.health = Math.min(b.orig_health, b.health);
						id('aSword').style.display = "block";
						id('aSword').style.WebkitAnimationName = "aSword";
						id('aSword').style.animationName = "aSword";
						setTimeout("id('aSword').style.display = 'none';id('aSword').style.WebkitAnimationName = '';id('aSword').style.animationName = '';", 100);
					}
					if (b.health == 0 || a.health == 0) {
						game.win(atk);
					}
				}
			},
			heal : function(side) {
				if (game.on == 'true') {
					if (side == 'b') {
						b.health += 3;
						b.health = Math.max(0, b.health);
						b.health = Math.min(b.orig_health, b.health);
					} else if (side == 'a') {
						a.health += 5;
						a.health = Math.max(0, a.health);
						a.health = Math.min(a.orig_health, a.health);
					}
				}
			}
		};
		function load() {
			if (current != "aonarchy") badNames.url = "b";

			a.name = badNames[current][Math.floor(Math.random() * badNames[current].length)];
			a.health = Math.max(Math.random() * 4000, 2000);
			a.orig_health = a.health;
			a.attack = Math.random() * 25;

			b.name = goodNames[current][Math.floor(Math.random() * goodNames[current].length)];
			while (b.name == a.name) {
				b.name = goodNames[current][Math.floor(Math.random() * goodNames[current].length)];
			}
			b.health = a.health;
			b.orig_health = a.orig_health;
			b.attack = a.attack;

			game.on = 'true';
			game.refresh.all();
		}

		window.addEventListener("orientationchange", function() { location.reload(); }, false);
		if (!isMobile.any()) id('homescreenTip').style.display = 'none';
		if (window.navigator.standalone == true) id('homescreenTip').style.display = 'none';

		load();