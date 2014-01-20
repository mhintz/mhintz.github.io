define(["jquery", "underscore", "backbone", "control/Router", "model/AppState", "model/SiteContent", "view/templates/Templates"], function($, _, Backbone, Router, AppState, SiteContent, Templates) {
	
	var Viewer = Backbone.View.extend({
		events: {
			"click .nav-item": "onNavClick"
		},
		initialize: function() {
			this.listenTo(AppState, "change:location", this.setLocation);

			this.$info = this.$(".info-main");
			this.$main = this.$(".viewing-main");

			this.$info.html(Templates.navbar(SiteContent.nav));
			this.$main.removeClass("loading");
		},
		setLocation: function(appstate, newLocation) {
			switch (newLocation) {
				case "root":
					this.$main.html(Templates.root(SiteContent.root));
					break;
				case "work":
					this.$main.html(Templates.work(SiteContent.work));
					break;
				case "explorations":
					this.$main.html(Templates.explorations(SiteContent.explorations));
					break;
				case "blog":
					this.$main.html(Templates.blog(SiteContent.blog));
					break;
			}
		},
		onNavClick: function(e) {
			var section = $(e.target).data("route");
			Router.navigate(section, {trigger: true});
		}
	});

	return Viewer;
});