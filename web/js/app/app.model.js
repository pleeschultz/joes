/* AppModel holds app config data packaged with the app and contains global app info */

define([
	'underscore',
	'backbone'
], function(
	_,
	Backbone
){

	var AppModel = Backbone.Model.extend({

		defaults: {

			firstResize: true,
			dimensions: { width: 0, height: 0 },
			grid: { columns: 8, size: 128 },
			retina: false,
			touch: false
		},
		initialize: function() {
			//console.log('AppModel.initialize()');
			if(window.devicePixelRatio > 1){
				this.attributes.retina = true;
			}
			this.set({ touch: 'ontouchstart' in window });
			//console.log('-- RETINA:', this.get('retina'), '\n-- TOUCH:', this.get('touch'));
		},
		addAppConfigData: function(appConfigData){
			appConfigData = JSON.parse(appConfigData);

			var self = this;
			var keys = _.keys(appConfigData);
			_.each(keys, function(key) {
				self.set(key, appConfigData[key]);
			});
		}
	});

	return new AppModel();
});
