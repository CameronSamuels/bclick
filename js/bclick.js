var $ = function(e) { return document.getElementById(e) },
nums = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion",
"Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion",
"Undecillion", "Duodecillion", "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion",
"Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion", "Unvigintillion",
"Duovigintillion", "Tresvigintillion", "Quattuorvigintillion", "Quinquavigintillion", "Sesvigintillion",
"Septemvigintillion", "Octovigintillion", "Novemvigintillion", "Trigintillion", "Untrigintillion",
"Duotrigintillion", "Tretrigintillion", "Quattuortrigintillion"], increment, ceiling = get("points"), left = 0,
unlocked = 0, askedToReset = false, desktop = !navigator.userAgent.match(/iPhone|iPad|iPod|Android/i), logs = 0;
if (desktop) document.querySelector('html').setAttribute('style', 'transform:rotate(0deg) !important');
function get(e) { return localStorage[e] }
function set(e, f) { localStorage.setItem(e, f) }
function add(e, f) { return parseFloat(e) + parseFloat(f) }
function fl(e, f) { for (i = 0; i < f; i++) { e() } }
function dcml(x) {
    var e;if(Math.abs(x) < 1.0) { e = parseInt(x.toString().split('e-')[1]);
    if (e) {x*=Math.pow(10,e-1);x='0.'+(new Array(e)).join('0')+x.toString().substring(2);}}
    else{e=parseInt(x.toString().split('+')[1]);if(e>20){e-=20;x /=Math.pow(10,e);
    x+=(new Array(e+1)).join('0');}}return x;
}
function eg(num) {
    num=dcml(parseFloat(num));var length=num.toString().length;length=length-1;var string="1";
    fl(function(){string=string+"0"},length);return string;
}
function giant(num) {
    num = Math.round(num);
    var EG = eg(num);
    var length = EG.toString().length - 1;
    var groups = (length / 3);
    if (groups.toString().indexOf(".6") != -1 || groups.toString().indexOf(".3") != -1) groups = Math.round(groups);
    EG = "1"; fl(function(){EG+="000"}, groups);
    if (EG == "1" || nums[groups] === undefined || length < 3) return num;
    else if (num / EG == 1000 || num / EG < 1) return ((num / EG)*1000).toFixed(1) + " " + nums[groups-1];
    else return(num / EG).toFixed(1) + " " + nums[groups];
}
function remove(string, what) {
    var reg = new RegExp(what, 'g');
    return string.replace(reg, '');
}
// ===== Core Functions ===== //
function log(text) {
    if (logs >= 2) return;
    if ($("logText").style.display == "inline-block") {
        logs++;
        setTimeout(function(){logs--;log(text)}, 1500);
        return;
    }
    $("logText").textContent = text;
    $("logText").style.display = "inline-block";
    setTimeout('$("logText").style.display = "none"', 1500);
}
function realEarn() {
    if (get("points") < ceiling) {
	  set('points', parseFloat(get("points")) + parseFloat(increment));
	  left = parseFloat(ceiling) - parseFloat(get("points"));
    } 
    else if (get("points") > ceiling) {
	  set('points', parseFloat(get("points")) - parseFloat(increment));
	  left = parseFloat(get("points")) - parseFloat(ceiling);
    }
    else left = 0;
	if (left <= 0) left = get('points'), ceiling = left, increment = 0;
}
function earn(a) {
    if (get("points") < 1e105) {
        ceiling = parseFloat(ceiling) + parseFloat(a);
        increment += (parseFloat(a) / 100); 
    }
    else set('points', 1e105);
	achievements.check();
}
 
function lose(a) { 
    if (get("points") < 1e105 && (ceiling - a) >= 0) {
        increment += (parseFloat(a) / 100);
        ceiling = parseFloat(ceiling) - parseFloat(a);
    }
    else if (get("points") >= 1e105) set('points', eg(1e105));
}
function bclick() {
	name = b.list[get("bPosition")];
	worth = b[b.list[get("bPosition")]].worth;
    if (get(name) == 'true') {
        if (get('clicks') === undefined) { set('clicks', 0); }
        else { set('clicks', add(get('clicks'), 1)); }
        earn(parseFloat(worth) * get("multiplier"));
    }
    else log("Unlock the B");
}
function unlock() {
    name = b.list[get("bPosition")];
	cost = b[b.list[get("bPosition")]].cost;
    if (get(name) == 'false') {  
        if (get("points") >= cost) {
            set(name, true);
            unlocked++;
            lose(cost);
        }
        else { log("Insufficient Points") }
    }
    else log("Click the B image");
    b.refresh();
}
// ===== Achievements ===== //
var achievements = {
    show : function() { $('leftSection').style.display = "block" },
    hide : function() { $('leftSection').style.display = "" },
    list : {
        spaces : [
            "Earn 1 Thousand Points",
            "Earn 1 Billion Points",
            "Earn 1 Quintillion Points",
            "Earn 1 Septillion Points",
            "Earn 1 Decillion Points",
            "Earn 1 Quindecillion Points",
            "Earn 1 Vigintillion Points",
            "Earn 1 Quinquavigintillion Points",
            "Earn 1 Trigintillion Points",
            "Earn 1 Quinquagintillion Points",
            "Unlock 10 B's",
            "Unlock 20 B's",
            "Unlock 30 B's",
            "Unlock 40 B's",
            "Unlock 45 B's",
            "Click 500 Times",
            "Click 1 Thousand Times",
            "Click 5 Thousand  Times",
            "Click 10 Thousand  Times",
            "Click 20 Thousand Times",
            "Have 1 Thousand Interest",
            "Have 1 Billion Interest",
            "Have 1 Quintillion Interest",
            "Have 1 Septillion Interest",
            "Have 1 Decillion Interest",
            "Have 1 Quindecillion Interest",
            "Have 1 Vigintillion Interest",
            "Have 1 Quinquavigintillion Interest",
            "Have 1 Trigintillion Interest",
            "Have 1 Quinquagintillion Interest",
        ],
        id : [],
        type : ['Earn Points', 'Unlock B\'s', 'Click B\'s', 'Have Interest']
    },
    achieve : function(id) {
        set(id, true);
        set('multiplier', Math.min(parseFloat(get('multiplier')) * 1.25, 1000000000));
        log("Earned an achievement buff");
    },
    check : function() {
        var obj = achievements, type = "", amount;
        for (i = 0; i < obj.list.spaces.length; i++) {
            switch (obj.list.spaces[i].toString().split(' ')[2]) {
                case "Thousand" : amount = 1000 * obj.list.spaces[i].toString().split(' ')[1]; break;
                case "Billion" : amount = Math.pow(10, 9); break;
                case "Quintillion" : amount = Math.pow(10, 18); break;
                case "Septillion" : amount = Math.pow(10, 24); break;
                case "Decillion" : amount = Math.pow(10, 33); break;
                case "Quindecillion" : amount = Math.pow(10, 48); break;
                case "Vigintillion" : amount = Math.pow(10,63); break;
                case "Quinquavigintillion" : amount = Math.pow(10,78); break;
                case "Trigintillion" : amount = Math.pow(10,93); break;
                case "Quinquagintillion" : amount = Math.pow(10,153); break;
                default: amount = obj.list.spaces[i].toString().split(' ')[1];
            }
            switch (obj.list.spaces[i].charAt(0)) {
                case "E" : type = "points"; break;
                case "U" : type = "unlocked"; break;
                case "C" : type = "clicks"; break;
                case "H" : type = "interest"; break;
                default:
            }
            if (parseFloat(get(type)) >= parseFloat(amount) && get(obj.list.id[i]) != "true") achievements.achieve(obj.list.id[i]);
        }
    }, refresh : function() {
        for (i = 0; i < achievements.list.spaces.length; i++) {
            var string = remove(achievements.list.spaces[i], "'"); string = remove(string, " ");
            achievements.list.id.push(string);
        }
        var text = $("AchievementsList"), type = "", typeNum = -1;
        for (i = 0; i < achievements.list.spaces.length; i++) {
            var requirement = achievements.list.spaces[i].toString().split(' ')[1];
            if (achievements.list.spaces[i].toString().split(' ').length == 4) requirement += achievements.list.spaces[i].toString().split(' ')[2].charAt(0);
            if (type.toString().charAt(0) == achievements.list.id[i].charAt(0))
                text.innerHTML += "<div title='" + achievements.list.spaces[i] + "' class='achieveItem' id='" + achievements.list.id[i] + "'>" + requirement + "</div>";
            else {
                typeNum++;
                type = achievements.list.type[typeNum];
                text.innerHTML += "<div class='achieveCategory'>" + type + "</div><div title='" + achievements.list.spaces[i] + "' class='achieveItem' id='" + achievements.list.id[i] + "'>" + requirement + "</div>";
            }
        }
    }
}
// ===== Refreshing ===== //
var refresh = {
    numbers : function() {
        if (get('points') >= 1e105) {
            set('points', eg(1e105));
            $('Points').textContent = "Infinity Points";
            if (askedToReset != true) { 
                $('confirmPopup').style.display = "block";
                $('popupOverlay').style.display = "block";
                askedToReset = true;
            }
        }
        else if (get('points') < 0) { set('points', 0); $('Points').textContent = giant(get('points')) + " Points"; }
        else $('Points').textContent = giant(get('points')) + " Points";
        if (get('interest') >= 1e105) { set('interest', eg(1e105)); $('Interest').textContent = "Infinity Interest"; } 
        else $('Interest').textContent = giant(get('interest')) + " Interest";
    },
    achievements : function() {
        achievements.check();
        var group = $("achivementsGroup");
        var text = $("AchievementsList");
        for (i = 0; i < achievements.list.spaces.length; i++) {
            var item = $(achievements.list.id[i]);
            if (get(achievements.list.id[i]) == "true") item.style.background = "#ff0";
        }
    },
    events : function() {
        if (desktop) {
            var all = document.querySelectorAll('[ontouchend]');
            for (i = 0; i < all.length; i++) {
                var ontouchend = all[i].getAttribute('ontouchend');
                all[i].setAttribute('onclick', ontouchend);
                all[i].removeAttribute('ontouchend');
            }
        }
    },
    all : function() {
        refresh.numbers(); refresh.achievements(); refresh.events();
        window.requestAnimationFrame(refresh.all);
    }
}; 
// ===== Saving Data ===== //
function reset() {
    increment = 0, ceiling = 0, unlocked = 1;
    set('points', 0), set('multiplier', 1),
    set('interest', 0), set('deposited', 0),
    set('clicks', 0),
    set('bPosition', 0);
    for (i = 0; i < b.list.length; i++) {
        var item = b.list[i];
        set(item, false);
    }
    set('handrawn', true);
    for (i = 0; i < achievements.list.id.length; i++) localStorage.removeItem(achievements.list.id[i]);
    $('AchievementsList').innerHTML = '';
    achievements.refresh(), b.refresh();
    $('confirmPopup').style.display = '',
    $('popupOverlay').style.display = '';
}
// ===== The B's ===== //
var bAmount = 0, b = {
    vars : {
        button : function() { return $("bButton") },
        unlock : function() { return $("bUnlock") },
        section : function() { return $("bSection") }
    },
    list : [],
    refresh : function() {
        $('bName').textContent = b.list[get("bPosition")].toString().toUpperCase() + ' B\n' + b[b.list[get("bPosition")]].tooltip;
        b.vars.button().style.backgroundImage = "url('http://thebclickteam.tk/lib/bcl/b/" + b.list[get("bPosition")] + ".png')";
        if (get(b.list[get("bPosition")]) == 'false') b.vars.unlock().textContent = "Unlock\n($" + giant(b[b.list[get("bPosition")]].cost) + ")";
		else b.vars.unlock().textContent = "Unlocked!";
    },
    loop : {
        next : function() {
            if (get("bPosition") == (bAmount - 1)) set("bPosition", 0);
            else set("bPosition", add(get("bPosition"), 1));
            b.refresh();
        },
        previous : function() {
            if (get("bPosition") == 0) set("bPosition", (bAmount - 1));
            else set("bPosition", parseFloat(get("bPosition")) - 1);
            b.refresh();
        }
    }
}
function create(name, worth, cost, tooltip) {
    this.worth = worth;
    this.cost = cost;
    this.name = name;
    this.tooltip = tooltip || '';
    if (get(name) == undefined) set(name, false);
    else if (get(name) == "true") unlocked++;
    b.list.push(name);
    bAmount++;
}
b.handrawn = new create('handrawn', 2, 0);
b.lowercase = new create('lowercase', 10, 100);
b.regular = new create('regular', 50, 500);
b.saw = new create('saw', 200, 5000);
b.spiky = new create('spiky', 500, 20000);
b.electric = new create('electric', 1000, 100000);
b.curved = new create('curved', 5000, 500000);
b.shark = new create('shark', 10000, 2500000);
b.lightning = new create('lightning', 100000, 10000000);
b.awesome = new create('awesome', 1000000, 100000000);
b.thirteen = new create('thirteen', 1e8, 1e9);
b.thin = new create('thin', 1e9, 1e11);
b.knight = new create('knight', 1e10, 1e12);
b.archer = new create('archer', 1e11, 1e13);
b.barbed = new create('barbed', 1e12, 1e15);
b.flower = new create('flower', 1e13, 1e16);
b.muscle = new create('muscle', 1e14, 1e17);
b.bw = new create('bw', 1e15, 1e18);
b.honeycomb = new create('honeycomb', 1e16, 1e19);
b.creative = new create('creative', 1e17, 1e20);
b.rubiks = new create('rubiks', 1e18, 1e21);
b.star = new create('star', 1e21, 1e24);
b.impossible = new create('impossible', 1e24, 1e27);
b.ghost = new create('ghost', 1e27, 1e30);
b.poke = new create('poke', 1e30, 1e33);
b.giant = new create('giant', 1e33, 1e36);
b.election = new create('election', 1e36, 1e39);
b.baseball = new create('baseball', 1e39, 1e42);
b.picasso = new create('picasso', 1e42, 1e45);
b.challah = new create('challah', 1e45, 1e48);
b.spear = new create('spear', 1e48, 1e51);
b.superhero = new create('superhero', 1e51, 1e54);
b.chalk = new create('chalk', 1e54, 1e57);
b.nature = new create('nature', 1e57, 1e60, '(Arjun M)');
b.golden = new create('golden', 1e60, 1e63);
b.mage = new create('mage', 1e63, 1e66);
b.carnotaurus = new create('carnotaurus', 1e66, 1e69);
b.business = new create('business', 1e69, 1e72);
b.duck = new create('duck', 1e72, 1e75);
b.orchestral = new create('orchestral', 1e75, 1e78);
b.candycane = new create('candycane', 1e78, 1e81);
b.year3 = new create('year3', 1e81, 1e84);
b.skater = new create('skater', 1e84, 1e87);
b.worldwar = new create('worldwar', 1e87, 1e90, '(Andrew L)');
b.killer = new create('killer', 1e90, 1e93);
b.dovahkinn = new create('dovahkinn', 1e93, 1e96);
b.phone = new create('phone', 1e96, 1e99);
b.burger = new create('burger', 1e99, 1e102, '(Benz Le)');
// ===== The Bank ===== //
var bank = {
    collect : function() { earn(get('interest')) },
    deposit : function() {
        var a = parseFloat(ceiling);
        set('deposited', add(get('deposited'), a));
        set('interest', parseFloat(get("deposited")) * 0.1);
        lose(a); 
    }
}
// ===== Miscellaneous ===== //
document.oncontextmenu = function(e){e.preventDefault()},
document.ontouchmove = function(a){a.preventDefault()},
document.ontouchstart = function(a){a.preventDefault()};
if (get("points") === undefined) reset();
else achievements.refresh();
b.refresh();
refresh.all();
ceiling = get("points");
setInterval('realEarn()', 1);
setInterval('bank.collect()', 2500);
function zoom() {
    if (innerHeight > innerWidth || desktop) document.body.style.zoom = (innerHeight/568);
    else document.body.style.zoom = (innerWidth/568);
}
window.onresize = zoom;
zoom();
document.querySelector("main").style.display = "block";
$('loader').style.display = "none";