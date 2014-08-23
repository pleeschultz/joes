define([
	'underscore',
	'backbone',
	'flavor/flavor.model'
], function (
	_,
	Backbone,
	FlavorModel
) {

	var FlavorCollection = Backbone.Collection.extend({
		defferedFetch: null,
		model: FlavorModel,
		url: 'data/flavors.json',
		initialize: function(){
			this.defferedFetch = this.fetch({ merge: true });
		},
		parse: function(data){
			// additional parsing here

		var missing = [];

			_.each(data, function(flavor){
				if(!flavor.photographed && flavor.type == 'ice-cream'){
					//console.log(flavor.name);
					missing.push(flavor.name);
				}
			})

			return data;
		}
	});

	return FlavorCollection;
});
