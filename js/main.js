require.config({
	"paths": {
		//mine
		"manager": "structure/Manager",
		"Header": "structure/Header",
		"Viewer": "structure/Viewer",
		"Footer": "structure/Footer",

		//libraries
		"jquery": "lib/jquery-2.0.3.min",
		"underscore": "lib/underscore-min",
		"backbone": "lib/backbone-min"
	},

	"shim": {
		"jquery": {
			exports: "$"
		},
		"underscore": {
			exports: "_"
		},
		"backbone": {
			deps: ["underscore"],
			exports: "Backbone"
		}
	}
});

define(["manager"], function(manager) {
	manager.init();
});