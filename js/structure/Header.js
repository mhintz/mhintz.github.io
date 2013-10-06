define(["jquery", "underscore", "backbone", "text!content/words/header.html"], function($, _, Backbone, headerTemp) {
	
	var Header = Backbone.View.extend({
		initialize: function() {
			if (!this.options.model) this.model = new Backbone.Model();
			else this.model = this.options.model;

			this.template = _.template(headerTemp);
		},
		render: function() {
			this.$el.html(this.template(this.model));
		}
	});

	return Header;
});