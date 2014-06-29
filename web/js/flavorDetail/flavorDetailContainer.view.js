define([
	'backbone'
], function(
	Backbone
){
	var FlavorDetailContainerView = Backbone.View.extend({

		el: '[data-view="flavor-detail-container-view"]',

		initialize: function() {
			console.log('flavor detail container');
		}
	});

	return FlavorDetailContainerView;
});
