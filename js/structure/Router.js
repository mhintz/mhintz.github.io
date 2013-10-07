define(["backbone"], function(Backbone) {

	var Router = Backbone.Router.extend({
		routes: {
			"": "navRoot",
			"about": "navAbout",
			"blog": "navBlog",
			"explorations(/:project)": "navExplorations",
			"work": "navWork"
		},
		init: function() {
			this.trigger("init");
			Backbone.history.start({
				// comment this out in production
				root: "markhz"
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