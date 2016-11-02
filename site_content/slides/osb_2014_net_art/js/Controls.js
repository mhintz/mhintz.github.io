var APP = APP || {};

APP.Controls = function(options) {
	var centerX = window.innerWidth / 2,
		centerY = window.innerHeight / 2,
		mouseX = centerX,
		mouseY = centerY;

	this.updateCenter = function() {
		centerX = window.innerWidth / 2;
		centerY = window.innerHeight / 2;
	};

	function onDocumentMouseMove( event ) {
		mouseX = event.clientX - centerX;
		mouseY = event.clientY - centerY;
	}

	document.addEventListener("mousemove", onDocumentMouseMove, false);

	this.mouseX = function() { return mouseX; };
	this.mouseY = function() { return mouseY; };
	this.rotationX = function() { return -(mouseX / centerX) * Math.PI; };
	this.rotationY = function() { return -(mouseY / centerY) * Math.PI; };
};