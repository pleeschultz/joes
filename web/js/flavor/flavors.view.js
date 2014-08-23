define([
	'jquery',
	'underscore',
	'backbone',
	'tween',
], function(
	$,
	_,
	Backbone,
	Tween
){
	var FlavorsView = Backbone.View.extend({

		el: '[data-view="flavors-view"]',
		currentFlavorView: null,
		initialize: function() {
			this.currentFlavorViews = [];
		},
		addFlavorView: function(flavorView){

			this.listenTo(flavorView, 'flavor:click', this.onFlavorClick);

			this.currentFlavorViews.push(flavorView);
			this.$el.append(flavorView.$el);
		},
		removeFlavors: function(){

			var self = this;
			this.$el.empty();
			_.each(this.currentFlavorViews, function(flavorView){
				self.stopListening(flavorView);
				flavorView.remove();
				flavorView = null;
			});

			this.currentFlavoViews = [];

		},
		onFlavorClick: function(flavorView){
			this.trigger('flavor:click', flavorView)
		},
		render: function(){}
	});

	return FlavorsView;
});
