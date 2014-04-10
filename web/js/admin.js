/**
 * Admin module loader.
 * Load the common requireConfig, then the app for index.html
 */
require(['./requireConfig'], function (requireConfig) {

    require(['jquery', 'backbone'],
        function ($, Backbone) {
            $(function () {
                // Entry point for Admin
                console.log('Admin entry point');
                //AppController.initialize();
            });
        }
    );
});
