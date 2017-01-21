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
		}, names = {
			current : 'original',
			original : ['saw', 'spiky', 'electric', 'shark', 'ghost', 'dragonball', 'giant', 'spear', 'superhero'],
			bocracy : ['knight', 'archer', 'barbed', 'flower', 'muscle', 'trump'],
			dino : ['carnotaurus'],
			fantasy : ['dovahkinn', 'mage'],
			horror : ['killer'],
			aonarchy : ['bentacrabb-1.0', 'b-shuttle', 'f-87-standard-artillery-cannon', 'd-15-heavy-artillery-cannon', 'b-s-94-walking-sharkanator']
		};
		if (window.location.hash != '') names.current = window.location.hash.toString().replace('#', '');
		var game = {
			on : 'false',
			refresh : {
				display : function() {
					id('bName').innerHTML = b.name + ' B';
					id('aName').innerHTML = a.name + ' B';

					id('bHealthBar').style.width = (b.health / b.orig_health)*100 + '%';
					id('aHealthBar').style.width = (a.health / a.orig_health)*100 + '%';

					id('bButton').style.backgroundImage = 'url(https://playbclick.com/assets/b/' + b.name + '.png)';
					id('aButton').style.backgroundImage = 'url(https://playbclick.com/assets/b/' + a.name + '.png)';
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
				setTimeout('location.reload()', 2000);
			},
			attack : function(atk) {
				if (game.on == 'true') {
					if (atk == 'b') {
						a.health -= b.attack;
						a.health = Math.max(0, a.health);
						a.health = Math.min(a.orig_health, a.health);
						id('sword').style.display = "block";
						id('sword').setAttribute('class', 'sword');
						setTimeout("id('sword').style.display = 'none';id('sword').setAttribute('class', '');", 100);
					} else if (atk == 'a') {
						b.health -= a.attack;
						b.health = Math.max(0, b.health);
						b.health = Math.min(b.orig_health, b.health);
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
			if (!isMobile.any()) {
				id('bButton').setAttribute('onclick', 'game.heal("b")');
				id('aButton').setAttribute('onclick', 'game.attack("b")');
			}

			a.name = names[names.current][Math.floor(Math.random() * names[names.current].length)];
			a.health = Math.max(Math.random() * 2000, 1000);
			a.orig_health = a.health;
			a.attack = Math.random() * 20;
			a.speed = Math.max(Math.random() * 1000, 450);

			b.name = names[names.current][Math.floor(Math.random() * names[names.current].length)];
			b.health = Math.max(Math.random() * 2000, 800);
			b.orig_health = b.health;
			b.attack = Math.max(Math.random() * 10, 7);

			game.on = 'true';
			setInterval('game.attack("a");game.heal("a")', a.speed);
			game.refresh.all();
		}

		window.addEventListener("orientationchange", function() { location.reload(); }, false);

		load();