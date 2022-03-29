Quintus.Strecher = function( Q ){

	Q.strech = function(){

		Q.el.style.width = window.innerWidth + "px";
		Q.el.style.height = window.innerHeight + "px";

		if(Q.el.parentNode) {
		    Q.el.parentNode.style.width = window.innerWidth + "px";
		    Q.el.parentNode.style.height = window.innerHeight + "px";
		}

		Q.cssWidth = window.innerWidth;
		Q.cssHeight = window.innerHeight;
		
	};

}