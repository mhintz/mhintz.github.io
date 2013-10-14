define(["jquery", "underscore", "backbone", "Router", "SineWave", "text!facade/words/about.html", "text!../content/about.html"], function($, _, Backbone, Router, SineWave, aboutTemp, aboutContent) {
	
	var Viewer = Backbone.View.extend({
		initialize: function() {
			this.listenTo(Router, "navigate:root", this.root);
			this.listenTo(Router, "navigate:about", this.about);
			this.listenTo(Router, "navigate:blog", this.blog);
			this.listenTo(Router, "navigate:explorations", this.explorations);
			this.listenTo(Router, "navigate:work", this.work);

			this.rootView = new SineWave({el: this.$el});
			this.aboutTemplate = _.template(aboutTemp);
		},
		setHeight: function() {
			var headHeight = $(".container.header").outerHeight(true);
			var footHeight = $(".container.footer").outerHeight(true);
			this.$el.css({ "height": document.height - headHeight - footHeight - 2 });
		},
		root: function() {
			this.setHeight();
			this.$el.empty();
			this.rootView.view();
		},
		about: function() {
			this.setHeight();
			this.$el.css({
				width: $(".container.header").width()
			})
			.html(this.aboutTemplate({
				content: aboutContent
			}));
		},
		blog: function() {
			this.setHeight();
			this.$el.empty();
		},
		explorations: function() {
			this.setHeight();
			this.$el.empty();
		},
		work: function() {
			this.setHeight();
			this.$el.empty();
		}
	});

	return Viewer;
});