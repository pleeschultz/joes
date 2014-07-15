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
			//console.log('flavor', this);

			var type = '-' + this.get('type');
			var imageId = this.get('id').split(type).join('');

			if(!this.get('hasNameplate')) imageId = 'no-nameplate';

			var image = 'images/nameplates/' + imageId + '.jpg';



			this.set({ image: image });

		}
	});

	return FlavorModel;

});
