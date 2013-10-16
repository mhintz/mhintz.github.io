define(["backbone"], function(Backbone) {

	var Router = Backbone.Router.extend({
		routes: {
			"": "navRoot",
			"root": "navRoot",
			"about": "navAbout",
			"blog": "navBlog",
			"explorations(/:project)": "navExplorations",
			"work": "navWork"
		},
		initialize: function() {
			this.info = {};
		},
		init: function() {
			var thisRouter = this;
			$.ajax({
				"url": "data/sitecontent.json",
				dataType: "json",
				success: function(data) {
					thisRouter.info = data;
					thisRouter.trigger("init");

					Backbone.history.start();
				}
			});
		},
		navRoot: function() { this.trigger("navigate:root"); },
		navAbout: function() { this.trigger("navigate:about"); },
		navBlog: function() { this.trigger("navigate:blog"); },
		navExplorations: function(project) {
			this.trigger("navigate:explorations");
			if (project) this.trigger("showProject:"+project);
		},
		navWork: function() { this.trigger("navigate:work"); }
	});

	return new Router();
});