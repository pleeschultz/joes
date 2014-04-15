define([
	'text!app/app.config.json',
	'app/app.model',
	'app/app.view',
	'flavor/flavor.collection',
	'flavor/flavors.view',
	'flavor/flavor.view'
], function (
	AppConfig,
	AppModel,
	AppView,
	FlavorCollection,
	FlavorsView,
	FlavorView
) {
	var AppController = function(){

		// app entry point
		function initialize(){

			console.log('AppController.initialize()');

			// parse static config json
			AppModel.addAppConfigData(AppConfig);

			// Load and create the tile collection
			var flavorCollection = new FlavorCollection();

			// app view
			var appView = new AppView({ model: AppModel });
			appView.render();

			var flavorsView = new FlavorsView();

			var flavorView;
			// when flavors are loaded, build them here
			flavorCollection.defferedFetch.done(function(){

				flavorCollection.each(function(flavorModel){

					flavorView = new FlavorView({ model: flavorModel });
					flavorsView.$el.append(flavorView.$el);
				});

			});

		}

		return {
			initialize: initialize
		}
	}
	return new AppController();
});
