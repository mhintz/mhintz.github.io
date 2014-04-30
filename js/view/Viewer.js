define(["jquery", "underscore", "backbone", "control/Router", "model/AppState"], function($, _, Backbone, Router, AppState) {
	
	var Viewer = Backbone.View.extend({
		events: {

		},
		initialize: function() {
			this.listenTo(AppState, "showProject", this.showProject);
		},
		showProject: function(projectName) {

		}
	});

	return Viewer;
});