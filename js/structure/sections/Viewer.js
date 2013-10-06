define(["jquery", "underscore", "backbone", "Router"], function($, _, Backbone, Router) {
	
	var Viewer = Backbone.View.extend({
		initialize: function() {
			
			this.listenTo(Router, "navigate:about", "about");
			this.listenTo(Router, "navigate:blog", "blog");
			this.listenTo(Router, "navigate:explorations", "explorations");
			this.listenTo(Router, "navigate:work", "work");

		},
		about: function() {

		},
		blog: function() {

		},
		explorations: function() {

		},
		work: function() {

		}
	});

	return Viewer;
});