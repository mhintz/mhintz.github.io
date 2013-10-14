define(["backbone", "vis"], function(Backbone, VIS) {
	if (!VIS.isInstalled()) {
		VIS.install();
	}

	var SineWave = Backbone.View.extend({
		initialize: function() {
			this.canvas = $("<canvas />")
			.attr("width", this.$el.width())
			.attr("height", this.$el.height());
		},
		view: function() {
			this.$el.html(this.canvas);
			this.setup();
		},
		setup: function() {
			window.move = function() {
				console.log(arguments);
			};
		},
		draw: function() {
			
		}
	});

	return SineWave;
});