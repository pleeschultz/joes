define([
	'text!app/app.config.json',
	// 'routes/router',
	// 'tracking/tracker',
	// 'tcin/tcin',
	// 'modals/controllers/modal.controller',
	// 'app/collections/story.collection',
	// 'content/collections/product.collection',
	'app/app.model',
	// 'app/models/navigation.model',
	'app/app.view'
	// 'app/controllers/navigation.controller',
	// 'app/controllers/pages.controller',
	// 'app/controllers/smokeTest.controller'
], function (
	AppConfig,
	// Router,
	// Tracker,
	// Tcin,
	// ModalController,
	// StoryCollection,
	// ProductCollection,
	AppModel,
	// NavigationModel,
	AppView
	// NavigationController,
	// PagesController,
	// SmokeTestController
) {
	var AppController = function(){

		// app entry point
		function initialize(){

			console.log('AppController.initialize()');

			// parse static config json
			AppModel.addAppConfigData(AppConfig);

			// Load and create the tile collection
			

			// // tracking init
			// Tracker.initialize();
			//
			// // factories
			// //TcinFactory.initialize();
			// Tcin.config();
			//
			// // parse non singleton model info
			// // create user, intro, filters, etc... here
			//
			// // create navigation model
			// var navigationModel = new NavigationModel();
			// AppModel.set('navigationModel', navigationModel);
			//
			// // story collection
			// var storyCollection = new StoryCollection();
			// AppModel.set('storyCollection', storyCollection);
			//
			// // product collection
			// //var productCollection = new ProductCollection();
			// //AppModel.set('productCollection', productCollection);
			//
			// app view
			var appView = new AppView({ model: AppModel });
			appView.render();
			//
			// NavigationController.initialize();
			// ModalController.initialize();
			// SmokeTestController.initialize();
			// PagesController.initialize();
			// NavigationController.begin();
		}

		return {
			initialize: initialize
		}
	}
	return new AppController();
});
