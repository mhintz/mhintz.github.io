define(["jquery", "underscore", "backbone", "Router", "Header", "Viewer", "Footer"], function($, _, Backbone, Router, Header, Viewer, Footer) {
	
	var Manager = Backbone.View.extend({
		initialize: function() {
			this.header = new Header({el: $(".container.header")});			
			this.viewer = new Viewer({el: $(".container.viewing")});
			this.footer = new Footer({el: $(".container.footer")});

			this.listenTo(Router, "init", this.init);
		},
		init: function() {
			this.header.render();
			this.footer.render();
//			this.viewer.render();
		}
	});

	return new Manager();
});