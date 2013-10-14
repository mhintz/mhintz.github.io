define(["jquery", "underscore", "backbone", "Router", "SineWave"], function($, _, Backbone, Router, SineWave) {
	
	var Viewer = Backbone.View.extend({
		initialize: function() {
			this.listenTo(Router, "navigate:root", this.root);
			this.listenTo(Router, "navigate:about", this.about);
			this.listenTo(Router, "navigate:blog", this.blog);
			this.listenTo(Router, "navigate:explorations", this.explorations);
			this.listenTo(Router, "navigate:work", this.work);

			this.rootView = new SineWave({el: this.$el});
		},
		root: function() {
			this.$el.css({
				"height": document.height - $(".container.header").outerHeight(true) - $(".container.footer").outerHeight(true) - 2
			});

			this.$el.empty();
			this.rootView.view();
		},
		about: function() {

		},
		blog: function() {
			this.$el.html()
		},
		explorations: function() {

		},
		work: function() {

		}
	});

	return Viewer;
});