define(["backbone", "model/AppState"], function(Backbone, AppState) {

	var Router = Backbone.Router.extend({
		routes: {
			"explorations(/:project)": "navExplorations"
		},
		initialize: function() {
			Backbone.history.start();
		},
		navExplorations: function(project) {
			AppState.trigger("showProject", project);
		}
	});


	var singleton = {
		getInstance: function() { return this.instance || (this.instance = new Router()); }
	};
	
	return singleton;
});