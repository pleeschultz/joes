define(['underscore', 'backbone'],

function (_, Backbone) {

	var Router = Backbone.Router.extend({

		history: [],
		initialize: function() {
			var router = this;
			Backbone.history.on('route', function(){
				router.history.push(Backbone.history.location.hash.slice(1));
			});
		},
		routes: {
			"all-flavors": "allFlavorsRoute",
			"franklin": "franklinStore",
			"linden": "lindenStore",
			"*path": "defaultRoute"
		},
		start: function(){
			Backbone.history.start();
		},
		allFlavorsRoute: function(){
			this.trigger('all:flavors');
		},
		franklinStore: function(){
			this.trigger('franklin:flavors');
		},
		lindenStore: function(){
			this.trigger('linden:flavors');
		},
		defaultRoute: function(path){

			if(!Backbone.AppConfig.ADMIN)
				this.navigate('all-flavors', { trigger: true });
			else
				this.navigate('franklin', { trigger: true });
		}
	});

	return new Router();
});
