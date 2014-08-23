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

			var flavorIndex = $flavorViews.index(flavorView.$el) + 1;

			var ulWidth = $flavorsView.width();
			var liWidth = $flavorViews.width();
			var liPerRow = Math.floor(ulWidth/liWidth);

			var findEnd = Math.ceil(flavorIndex/liPerRow) * liPerRow -1;
			var tileHeight = $flavorViews[0].offsetHeight;

			$flavorViews.removeClass('tile-info-isActive');
			$flavorViews.eq(findEnd).addClass('tile-info-isActive');

			var prevLi = $('.tile-info-isActive').prevAll('.js-tiles-trigger').length;
			var currentRow = Math.ceil(prevLi/liPerRow);
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
