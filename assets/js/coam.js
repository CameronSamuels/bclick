var m={};m.id=function(id){return document.getElementById(id);};m.cls=function(cls){return document.getElementById(cls);}
m.tag=function(tag){return document.getElementByTagName(tag);}
m.name=function(name){return document.getElementByName(name);}
m.fl=function(code,count){for(i=0;i<count;i++){code();}}
m.wl=function(code,statement){while(statement){code();}}
m.il=function(code,ms){setInterval(code,ms);}
m.print=function(text){document.write(text);}
m.append=function(id,html){id(id).innerHTML+=html;}
m.html=function(id,html){id(id).innerHTML=html;}
m.log=function(text){console.log(text);}
m.nums=["","Thousand","Million","Billion","Trillion","Quadrillion","Quintillion","Sextillion","Septillion","Octillion","Nonillion","Decillion","Undecillion","Duodecillion","Tredecillion","Quattuordecillion","Quindecillion","Sexdecillion","Septendecillion","Octodecillion","Novemdecillion","Vigintillion","Unvigintillion", "Duovigintillion", "Tresvigintillion", "Quattuorvigintillion", "Quinquavigintillion", "Sesvigintillion", "Septemvigintillion", "Octovigintillion", "Novemvigintillion", "Trigintillion", "Centillion"];m.dcml=function(x){var e;if(Math.abs(x)<1.0){e=parseInt(x.toString().split('e-')[1]);if(e){x*=Math.pow(10,e-1);x='0.'+(new Array(e)).join('0')+x.toString().substring(2);}}else{e=parseInt(x.toString().split('+')[1]);if(e>20){e-=20;x /=Math.pow(10,e);x+=(new Array(e+1)).join('0');}}
return x;}
m.rdble=function(num){var newNum=Math.round(num);newNum=newNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");return newNum;}
m.eg=function(num){num=m.dcml(parseFloat(num));var length=num.toString().length;length=length-1;var string="1";m.fl(function(){string=string+"0"},length);return string;}
m.erg=function(num){var round=num.toString();round=round.charAt(0)+"."+round.charAt(1);round=Math.round(parseFloat(round));var length=num.toString().length;length=length-1;var string=round;m.fl(function(){string=string+"0"},length);return string;}
m.giant=function(num){num=Math.round(num);var EG=m.eg(num);var length=EG.toString().length-1;var groups=(length / 3);if(groups.toString().indexOf(".666")!=-1||groups.toString().indexOf(".333")!=-1)groups=Math.floor(groups);EG="1";m.fl(function(){EG+="000"},groups);if(EG=="1"||m.nums[groups]===undefined)return num;else if(m.nums[groups]!==undefined&&EG!="1")return(num / EG).toFixed(1)+" "+m.nums[groups];}
m.b64={t:function(string){return btoa(string);},f:function(string){return atob(string);}}
m.ls=localStorage;m.vbt=navigator.vibrate||navigator.webkitVibrate||navigator.mozVibrate||navigator.msVibrate;m.add=function(what,amount){return parseFloat(what)+parseFloat(amount);}
m.sub=function(what,amount){return parseFloat(what)-parseFloat(amount);}
m.tgl=function(current,first,second){return current==first?second:first;}
m.ask=function(text){return confirm(text);}
m.qstn=function(text,dflt){return prompt(text,dflt);}
m.tell=function(text){alert(text);}
m.ts=function(date){return(m.sub(new Date().getTime(),date)/ 1000);}