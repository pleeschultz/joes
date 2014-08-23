define([
	'jquery',
	'text!app/app.config.json',
	'routes/router',
	'flavor/flavor.collection',
	'flavor/flavors.view',
	'flavor/flavor.view',
	'flavor/adminFlavor.view',
	'flavor/flavorsStore.model',
	'flavorDetail/flavorDetailContainer.view',

	'tween'
], function (
	$,
	AppConfigJSON,
	Router,

	FlavorCollection,
	FlavorsView,
	FlavorView,
	AdminFlavorView,
	FlavorsStoreModel,
	FlavorDetailContainerView,

	Tween
) {

	var AppConfig = JSON.parse(AppConfigJSON);
	AppConfig.ADMIN = false;

	var modeTest = __mode || 0;

	if(modeTest) {
		AppConfig.ADMIN = true;
		FlavorView = AdminFlavorView;
	}

	Backbone.AppConfig = AppConfig;

	var AppController = function(){

		return {

			appView: null,
			flavorCollection: null,
			flavorsView: null,
			initialize: function(){

				var self = this;

				// ============ SETUP

				this.flavorsView = new FlavorsView();

				// Load and create the tile collection
				this.flavorCollection = new FlavorCollection();

				this.flavorDetailContainerView = new FlavorDetailContainerView();

				// ============ Events

				this.flavorsView.on('flavor:click', this.onFlavorClick, this);
				Router.on('all:flavors', this.showAllFlavors, this);
				Router.on('franklin:flavors', function(){

					if(Backbone.AppConfig.ADMIN) self.showAdminStoreFlavors('franklin');
					else self.showStoreFlavors('franklin');

				}, this);
				Router.on('linden:flavors', function(){

					if(Backbone.AppConfig.ADMIN) self.showAdminStoreFlavors('linden');
					else self.showStoreFlavors('linden');

				}, this);

				// ============ Init

				// when flavors are loaded start routes
				this.flavorCollection.defferedFetch.done(function(){
					Router.start();
				});
			},

			showAllFlavors: function(){
				this.showHeader('all-flavors');
				this.showFlavors(this.flavorCollection);

			},
			showStoreFlavors: function(store){

				var self = this;
				this.showHeader(store);


				var flavorsStoreModel = new FlavorsStoreModel();
				flavorsStoreModel.url = 'data/' + store + '.json';

				flavorsStoreModel.on('sync', function(){
					var flavorIds = flavorsStoreModel.get('flavorIds');

					var storeFlavorCollection = self.flavorCollection.filter(function(flavorModel){
						if(_.indexOf(flavorIds, flavorModel.id) != -1) return true;
						return false;
					});

					self.showFlavors(new Backbone.Collection(storeFlavorCollection));

				})
				flavorsStoreModel.load();

			},

			showAdminStoreFlavors: function(store){

				var self = this;
				this.showHeader(store);


				var flavorsStoreModel = new FlavorsStoreModel();
				flavorsStoreModel.url = 'data/' + store + '.json';

				flavorsStoreModel.on('sync', function(){
					var flavorIds = flavorsStoreModel.get('flavorIds');

					self.flavorCollection.each(function(flavorModel){

						flavorModel.set({ currentStore: store });

						if(_.indexOf(flavorIds, flavorModel.id) != -1)
							flavorModel.set({ active: true });
						else
							flavorModel.set({ active: false });

					});

					self.showFlavors(self.flavorCollection);

				})
				flavorsStoreModel.load();

			},

			showFlavors: function(flavorCollection){

				this.flavorsView.removeFlavors();
				if(this.flavorDetailContainerView) this.flavorDetailContainerView.close();

				var self = this;
				var flavorView;

				flavorCollection.each(function(flavorModel){

					flavorView = new FlavorView({ model: flavorModel });
					self.flavorsView.addFlavorView(flavorView);
				});
			},
			onFlavorClick: function(flavorModel){
				this.flavorDetailContainerView.showFlavor(flavorModel);
			},
			showHeader: function(location){

				var $menu = $('.menu');
				$menu.find('a').removeClass('active');
				$menu.find('a[data-location="' + location + '"]').addClass('active');
			}
		}
	}
	return new AppController();
});
