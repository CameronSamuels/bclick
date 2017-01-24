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
			url : '',
			original : ['saw', 'spiky', 'electric', 'shark', 'ghost', 'dragonball', 'giant', 'spear', 'superhero'],
			bocracy : ['knight', 'archer', 'barbed', 'flower', 'muscle', 'trump'],
			dino : ['carnotaurus', 'shark'],
			fantasy : ['dovahkinn', 'mage', 'superhero', 'giant', 'dragonball', 'ghost'],
			horror : ['killer', 'carnotaurus', 'trump', 'ghost', 'shark'],
			aonarchy : ['goblin-horde', 'goblin', 'warrior', 'witchcraft', 'siren', 'guardian', 'jak-o-anterns', 'phantom', 'anonymous', 'archer', 'a87-cannon'],
			weaklings : ['regular', 'lowercase', 'handrawn', 'fancy', 'curved', 'thin'],
			christmas : ['santa', 'candycane'],
			team : ['cameron', 'faith', 'ethan', 'alwin', 'michael', 'srisha', 'cooper', 'jessica', 'vishwam']
		}, badNames = {
			url : '',
			original : ['saw', 'spiky', 'electric', 'shark', 'ghost', 'dragonball', 'giant', 'spear', 'superhero'],
			bocracy : ['knight', 'archer', 'barbed', 'flower', 'muscle', 'trump'],
			dino : ['carnotaurus', 'shark'],
			fantasy : ['dovahkinn', 'mage', 'superhero', 'giant', 'dragonball', 'ghost'],
			horror : ['killer', 'carnotaurus', 'trump', 'ghost', 'shark'],
			aonarchy : ['ultacrabb', 'b-shuttle', 'f87-cannon', 'd15-cannon', 'sharkanator', 'batalifor-sentry', 'batalifor-1.0', 'batalifor-2.4', 'batalifor-general', 'b--torv-troops', 'bylo-ken', 'boverr-1.2', 'bentacrabb-2.1', 'scubbars', 'byter', 'b--torv-commander'],
			weaklings : ['regular', 'lowercase', 'handrawn', 'fancy', 'curved', 'thin'],
			christmas : ['santa', 'candycane'],
			team : ['cameron', 'faith', 'ethan', 'alwin', 'michael', 'srisha', 'cooper', 'jessica', 'vishwam']
		};
		if (window.location.hash != '') current = window.location.hash.toString().replace('#', '');
		var game = {
			on : 'false',
			refresh : {
				display : function() {
					var bName = b.name.toString().replace('--', '^');
					bName = bName.replace('-', ' ');
					bName = bName.replace('^', '-');
					id('bName').innerHTML = bName + ' ' + goodNames.url;

					var aName = a.name.toString().replace('--', '^');
					aName = aName.replace('-', ' ');
					aName = aName.replace('^', '-');
					id('aName').innerHTML = aName + ' ' + badNames.url;

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
				if (side == 'red') { id('sound').src = "loss.wav"; id('audio').load(); id('audio').play(); }
			},
			attack : function(atk) {
				if (game.on == 'true') {
					if (atk == 'green') {
						a.health -= b.attack;
						a.health = Math.max(0, a.health);
						a.health = Math.min(a.orig_health, a.health);
						id('bSword').style.display = "block";
						id('bSword').style.WebkitAnimationName = "bSword";
						id('bSword').style.animationName = "bSword";
						setTimeout("id('bSword').style.display = 'none';id('bSword').style.WebkitAnimationName = '';id('bSword').style.animationName = '';", 100);
					} else if (atk == 'red') {
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
					if (side == 'green') {
						b.health += b.heal;
						b.health = Math.max(0, b.health);
						b.health = Math.min(b.orig_health, b.health);
					} else if (side == 'red') {
						a.health += a.heal;
						a.health = Math.max(0, a.health);
						a.health = Math.min(a.orig_health, a.health);
					}
				}
			}
		};
		function load() {
			if (!isMobile.any()) {
				id('bButton').setAttribute('onclick', 'game.heal("green")');
				id('aButton').setAttribute('onclick', 'game.attack("green")');
				id('refreshButton').setAttribute('onclick', 'location.reload()');
				id('backButton').setAttribute('onclick', 'window.location="index.html"');
			}

			switch (current) {
				case "aonarchy":
					badNames.url = "b";
					goodNames.url = "a";
					break;
				default:
					badNames.url = "b";
					goodNames.url = "b";
			}

			a.name = badNames[current][Math.floor(Math.random() * badNames[current].length)];
			a.health = Math.max(Math.random() * 2000, 1000);
			a.orig_health = a.health;
			a.attack = Math.random() * 20;
			a.speed = Math.max(Math.random() * 1000, 450);
			a.heal = Math.random() * 20;

			b.name = goodNames[current][Math.floor(Math.random() * goodNames[current].length)];
			while (b.name == a.name) {
				b.name = goodNames[current][Math.floor(Math.random() * goodNames[current].length)];
			}
			b.health = Math.max(Math.random() * 2000, 800);
			b.orig_health = b.health;
			b.attack = Math.max(Math.random() * 10, 7);
			b.heal = Math.random() * 15;

			game.on = 'true';
			setInterval('game.attack("red");game.heal("red")', a.speed);
			game.refresh.all();
		}

		window.addEventListener("orientationchange", function() { location.reload(); }, false);

		load();