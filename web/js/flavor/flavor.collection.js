define([
	'backbone',
	'flavor/flavor.model'
], function (
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
			console.log(data);
			return data;
		}
	});

	return FlavorCollection;
});
