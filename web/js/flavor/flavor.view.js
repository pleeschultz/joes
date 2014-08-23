define([
	'underscore',
	'backbone',
	'text!flavor/flavor.template.html',
	'tween'
], function(
	_,
	Backbone,
	FlavorTemplate,
	Tween
){
	var FlavorView = Backbone.View.extend({

		events: {
			'click': 'onTileClick'
		},
		initialize: function() {

			var self = this;

			this.template = _.template(FlavorTemplate);
			this.render();

			Tween.set(this.$el, { opacity: 0 });

			this.waitForImages(function(){

				Tween.set(self.$el, { opacity: 1 });
			});

		},
		render: function(){

			this.setElement(this.template({ data: this.model.attributes }));
		},

		waitForImages: function(callback){

			if(!callback || typeof callback !== 'function') return;

			var $imgs = this.$('img');
			var loadedImgs = 0;
			if(!$imgs.length){
				callback.call(this);
			}

			var self = this;

			$imgs.each(function() {
				var image = new Image(),
					imgElement = this;

				image.onerror = image.onload = function() {
					loadedImgs++;
					if(loadedImgs == $imgs.length) {
						callback.call(self);
						return false;
					};
				};
				image.src = this.src;
			});
		},

		onTileClick: function(event){
			event.preventDefault();
			this.trigger('flavor:click', this);
		}
	});

	return FlavorView;
});
