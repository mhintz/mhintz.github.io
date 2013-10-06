define(["jquery", "underscore", "backbone", "Header", "Viewer", "Footer"], function($, _, Backbone, Header, Viewer, Footer) {
	
	var Manager = Backbone.Router.extend({
		init: function() {
			Backbone.history.start({pushState: true});

			// TODO: move this to a more appropriate location
			this.header = new Header({el: $(".container.header")});
			this.header.render();
			
			this.viewing = new Viewer({el: $(".container.viewing")});
			this.footer = new Footer({el: $(".container.footer")});

		}
	});

	return new Manager();
});