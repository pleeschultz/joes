define([
	'underscore',
	'backbone',
	'flavor/flavor.model'
], function (
	_,
	Backbone,
	FlavorModel
) {

	var FlavorsStoreModel = Backbone.Model.extend({
		defferedFetch: null,
		load: function(){
			this.url += '?t=' + new Date().getTime();
			this.defferedFetch = this.fetch({ merge: true });
		},
		parse: function(data){

			return data;
		}
	});

	return FlavorsStoreModel;
});
