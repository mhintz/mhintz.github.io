define(["backbone", "model/AppState"], function(Backbone, AppState) {

	var Router = Backbone.Router.extend({
		routes: {
			"explorations(/:project)": "navExplorations"
		},
		initialize: function() {

		},
		init: function() {
			Backbone.history.start();
		},
		navExplorations: function(project) {
			AppState.set("location", "explorations");
			if (project) AppState.trigger("showProject:"+project);
		}
	});

	return new Router();
});