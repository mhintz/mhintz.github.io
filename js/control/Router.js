define(["backbone", "model/AppState"], function(Backbone, AppState) {

	var Router = Backbone.Router.extend({
		routes: {
			"": "navRoot",
			"root": "navRoot",
			"blog": "navBlog",
			"explorations(/:project)": "navExplorations",
			"work": "navWork"
		},
		initialize: function() {
			this.info = {};
		},
		init: function() {
			Backbone.history.start();
		},
		navRoot: function() { AppState.set("location", "root"); },
		navBlog: function() { AppState.set("location", "blog"); },
		navExplorations: function(project) {
			AppState.set("location", "explorations");
			if (project) AppState.trigger("showProject:"+project);
		},
		navWork: function() { AppState.set("location", "work"); }
	});

	return new Router();
});