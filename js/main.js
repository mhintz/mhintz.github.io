require.config({
	"paths": {
		//mine
		"vis": "lib/vis",

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

define(["jquery", "view/Viewer", "control/Router"], function($, Viewer, Router) {

	var mainView = new Viewer({ el: $(".container") });

	Router.getInstance();

});