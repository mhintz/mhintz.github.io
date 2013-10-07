define(["jquery", "underscore", "backbone", "Router"], function($, _, Backbone, Router) {
	
	var Viewer = Backbone.View.extend({
		initialize: function() {
			this.listenTo(Router, "navigate:root", this.root);
			this.listenTo(Router, "navigate:about", this.about);
			this.listenTo(Router, "navigate:blog", this.blog);
			this.listenTo(Router, "navigate:explorations", this.explorations);
			this.listenTo(Router, "navigate:work", this.work);
		},
		root: function() {

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