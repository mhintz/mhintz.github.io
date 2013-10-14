define(["jquery", "underscore", "backbone", "Router", "text!facade/words/footer.html"], function($, _, Backbone, Router, footerTemp) {
	
	var Footer = Backbone.View.extend({
		initialize: function() {
			this.template = _.template(footerTemp);
		},
		render: function() {
			this.$el.html(this.template(Router.info["footer"]));
		}
	});

	return Footer;
});