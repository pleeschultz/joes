/**
 * Index module loader.
 * Load the common requireConfig, then the app for index.html
 */
require(['requireConfig'], function (requireConfig) {

    /**
     * load app module dependencies and begin
     */
    require(['jquery', 'backbone', 'app/app.controller'],
        function ($, Backbone, AppController) {
            $(function () {
                // Entry point
                //console.log('entry point');
                AppController.initialize();
            });
        }
    );
});
