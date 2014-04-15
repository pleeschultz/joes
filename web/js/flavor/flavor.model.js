define([
	'jquery',
	'backbone'
],
function(
	$,
	Backbone
){
	var FlavorModel = Backbone.Model.extend({

		defaults: {
			kosher: true
		},
		initialize: function(attributes, options) {
		//	console.log('flavor', this);
		}
	});

	return FlavorModel;

});
