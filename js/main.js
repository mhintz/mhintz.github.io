require.config({
	"paths": {
		//mine
		"Router": "structure/Router",

		"manager": "structure/ViewManager",
		"Header": "structure/sections/Header",
		"Viewer": "structure/sections/Viewer",
		"Footer": "structure/sections/Footer",

		//libraries
		"jquery": "lib/jquery-2.0.3.min",
		"underscore": "lib/underscore-min",
		"backbone": "lib/backbone-min",
		"text": "lib/text"
	},

	"shim": {
		"jquery": {
			exports: "$"
		},
		"underscore": {
			exports: "_"
		},
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});

define(["jquery", "Router", "manager"], function($, Router, ViewManager) {

	$(document).ready(function() {
		Router.init();
	});

});