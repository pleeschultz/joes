requirejs.config({
    baseUrl: "js",
    paths: {
		// libs
		jquery: 'libs/jquery-1.11.0.min',
		underscore: 'libs/underscore-min',
		backbone: 'libs/backbone-min',
		tween: 'libs/non-amd-tween-loader', // non AMD TweenLite loader
		hammer: 'libs/hammer.min',
        text: 'libs/text'
	},
	shim: {
		tween: {
			deps: [
				'js/libs/TweenMax.min.js'
			]
		}
	}
});
