requirejs.config({
    baseUrl: "js/libs",
    paths: {
		// libs
		jquery: 'jquery-1.11.0.min',
		underscore: 'underscore-min',
		backbone: 'backbone-min',
		tween: 'non-amd-tween-loader', // non AMD TweenLite loader
		hammer: 'hammer.min',

		// modules
        app: '../app',
        tiles: '../tiles',
		flavors: '../flavors',
		// tracking: '../tracking'
	},
	shim: {
		tween: {
			deps: [
				'js/libs/TweenMax.min.js'
			]
		}
	}
});

require(['jquery', 'backbone', 'app/controllers/app.controller'],
	function ($, Backbone, AppController) {
		$(function () {
    		// Entry point
    		console.log('entry point');
            AppController.initialize();
		});
	}
);
