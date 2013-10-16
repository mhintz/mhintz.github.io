define(["jquery", "underscore", "backbone", "Router", "text!facade/words/header.html"], function($, _, Backbone, Router, headerTemp) {
	
	var Header = Backbone.View.extend({
		events: {
			"click .header-item.nav": "navigate"
		},
		initialize: function() {
			this.template = _.template(headerTemp);
		},
		render: function() {
			this.$el.html(this.template(Router.info["header"]));
		},
		navigate: function(e) {
			var section = $(e.target).data("route");
			Router.navigate(section, {trigger: true});
		}
	});

	return Header;
});