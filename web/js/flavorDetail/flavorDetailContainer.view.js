define([
	'jquery',
	'backbone',
	'tween'
], function(
	$,
	Backbone,
	Tween
){
	var FlavorDetailContainerView = Backbone.View.extend({
		el: '[data-view="flavor-detail-container-view"]',
		showFlavor: function(flavorView){

			var self = this;

			this.$el.removeClass('flavor-description-isActive');

			var $flavorsView = $('.js-tiles');
			var $flavorViews = $flavorsView.find('.js-tiles-trigger');
			var totalFlavorViews = $flavorViews.length;
			var flavorIndex = $flavorViews.index(flavorView.$el) + 1;
			var ulWidth = $flavorsView.width();
			var liWidth = $flavorViews.width();
			var liPerRow = Math.floor(ulWidth/liWidth);
			var findEnd = Math.ceil(flavorIndex/liPerRow) * liPerRow -1;
			var lastFlavor = $('.js-tiles-trigger:last-of-type').index();
			var liModulo = Math.ceil(totalFlavorViews%liPerRow);

			var hasOrphan = false;
			var isOrphan = false;
			
			// determine if there is a single flavor in the last row
			if (liModulo === 1){
				var hasOrphan = true;
			} 
			
			// determine if the last row is not a full row
			if (findEnd >= totalFlavorViews) {
				var findEnd = lastFlavor;
			} 
			
			var tileHeight = $flavorViews[0].offsetHeight;

			$flavorViews.removeClass('tile-info-isActive');
			$flavorViews.eq(findEnd).addClass('tile-info-isActive');

			var prevLi = $('.tile-info-isActive').prevAll('.js-tiles-trigger').length;

			if ($('.tile-info-isActive').is('.js-tiles-trigger:last-of-type')){
				var isOrphan = true;
			}

			if (hasOrphan && isOrphan){
				var currentRow = Math.ceil(prevLi/liPerRow + 1);	
				console.log('this has and is an orphan');

			} else {
				var currentRow = Math.ceil(prevLi/liPerRow);
			}


			var yOffset = (currentRow * tileHeight) + 1;
			
			Tween.set(this.$el, { y: yOffset });

			Tween.delayedCall(.2, function(){

				self.$el.addClass('flavor-description-isActive');

				var flavorHtml = flavorView.$el.find('.flavor-info').html();

				self.$el.empty();
				self.$el.append(flavorHtml);
			});
		},
		close: function(){
			this.$el.removeClass('flavor-description-isActive');
		}
	});

	return FlavorDetailContainerView;
});
