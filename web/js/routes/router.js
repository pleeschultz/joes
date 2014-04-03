define(['underscore', 'backbone'], 

function (_, Backbone) {
	
	var Router = Backbone.Router.extend({
		
		navigationModel: null,
		history: [],
		deepLinkHashBase: '-/',
		initialize: function() {

			console.log('Router.initialize()');
			
// 			this.route(this.deepLinkHashBase + ":first", "page", this.page);
// 			this.route(this.deepLinkHashBase + ":first/:second", "page", this.page);
			
			var router = this; 
			Backbone.history.on('route', function(){
				console.log('Router.route()');
				router.history.push(Backbone.history.location.hash.slice(1));
			});
		},
		routes: {
			"*path": "defaultRoute"
		},
		setNavigationModel: function(navigationModel){
			this.navigationModel = navigationModel;
		},
		updateURLFromInternal: function(){
// 			var router = this;
// 			_.delay(function(){
// 				//console.log('upaate');
// 				var targetLocation = router.deepLinkHashBase + router.navigationModel.get('currentPageIndex') + '/' + router.navigationModel.getCurrentPageModel().id;
// 				router.navigate(targetLocation, { trigger: false });
// 				router.history.push(targetLocation);
// 			}, 750);
		},
		defaultRoute: function(path){
			console.log('Router.defaultRout()', path);
			//console.log('path not recognized', this.navigationModel.pageCollection.models, path);
			this.navigate(this.deepLinkHashBase + 'story/1', { trigger: true });
		}	
	});
	
	return new Router();
});