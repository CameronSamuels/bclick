			function id(id) { return document.getElementById(id) }
			for(var i=0;i<document.getElementsByTagName("a").length;i++) {
			    a[i].onclick=function() {
			        window.location=this.getAttribute("href");
			        return false;
			    }
			}