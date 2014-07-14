define([
	'jquery',
	'backbone'
], function(
	$,
	Backbone
){
	var AppView = Backbone.View.extend({

		el: '[data-view="app-view"]',

		resizeDelay: 50,
		resizeTimeout: null,

		initialize: function() {

			var self = this;
			this.$el.css({ opacity: 0 });

			this.$el.prepend([
				'<!--',
				'\n\tenvironment: ' + this.model.get('environment'),
				'\n\tversion: ' + this.model.get('version'),
				'\n-->'
			].join(''));

			$(window).on('resize', function(){
				self.resize();
			});

			// initial resize
			this.resize();
		},
		// find the actual size of the window including scrollbars
		windowSizeFinder: (function(){
			var sizeFinder = document.createElement("div");
			sizeFinder.setAttribute("style", "visibility:hidden;position:fixed;bottom:0px;right:0px;");
			document.getElementsByTagName("body")[0].appendChild(sizeFinder);
			return sizeFinder;
		})(),

		render: function(){},
		resize: function(){

			var self = this;
			var dimensions = {  width: this.windowSizeFinder.offsetLeft, height: this.windowSizeFinder.offsetTop };

			// if never sized before, do it immediately
			if(this.model.get('firstResize')){
				this.model.set({ firstResize: false });
				//console.log('====== INITIAL WINDOW SIZE', dimensions);
				this.$el.css({ opacity: 1 });
				this.model.set({ dimensions: dimensions });
				return;
			}

			// if it's not the first resize, delay timeout
			clearTimeout(this.resizeTimeout);
			this.resizeTimeout = _.delay(function(){
				self.model.set({ dimensions: dimensions });
				console.log('resize window', dimensions);
			}, this.resizeDelay);
		}
	});

	return AppView;
});
