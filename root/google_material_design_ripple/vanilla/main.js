(function() {
	var parent, ink, d, x, y; //d: diameter, x,y: ripple center.

	var nodes = document.querySelectorAll('ul li a');

	for(var i = 0; i != nodes.length; i++) {
		nodes[i].addEventListener('click', makeRipple);
	}

	function makeRipple(e) {
		parent = this.parentNode;
		//create .ink element if it doesn't exist
		if(parent.querySelectorAll(".ink").length == 0) {
			var inkEl = document.createElement('span');
			inkEl.classList.add('ink');
			parent.insertBefore(inkEl, parent.firstChild);
		}
			
		ink = parent.querySelector(".ink");
		//incase of quick double clicks stop the previous animation
		ink.classList.remove("animate");
		
		// var a = ink.height();
		// var b = ink.width();
			//set size of .ink
			if(!ink.offsetHeight && !ink.offsetWidth)
			{
				//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
				d = Math.max(parent.offsetWidth, parent.offsetHeight);
				ink.style.width = d;
				ink.style.height = d;
			}
		
		//get click coordinates
		//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
		x = e.pageX - parent.offsetLeft -d/2;
		y = e.pageY - parent.offsetTop - d/2;
		
		//set the position and add class .animate
		ink.style.top = y+'px';
		ink.style.left = x+'px';
		ink.classList.add('animate');
	}
})();
