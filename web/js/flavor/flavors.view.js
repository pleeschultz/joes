define([
	'jquery',
	'backbone'
], function(
	$,
	Backbone
){
	var FlavorsView = Backbone.View.extend({

		el: '[data-view="flavors-view"]',

		initialize: function() {
			//console.log('flavors view', this);
		},
		render: function(){}
	});

	return FlavorsView;
});
