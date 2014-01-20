define(["backbone"], function(Backbone) {
	
	var AppState = Backbone.Model.extend({
		defaults: {
			"location": null
		}
	});

	return new AppState();
});