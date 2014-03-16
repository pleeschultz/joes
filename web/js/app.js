var APP = APP || {};

(function($) {
    $(function() {
        var Tiles = new APP.Tiles();
    });

})(jQuery);

var flavorboardApp = angular.module('flavorboardApp', [
  'ngRoute',
  'flavorboardControllers'
]);

flavorboardApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/flavors', {
        templateUrl: 'partials/flavorList.html',
        controller: 'FlavorListCtrl'
      })
      .otherwise({
        redirectTo: '/flavors'
      });
}]);

/**
 * @fileOverview Tiles View Module File
 *
 * @authors Peter Schultz Matt Duffin
 * @version 1.0
 */
APP.Tiles = (function($) {
    'use strict';

    var Tiles = function(options) {

        this.init();
    };

    /**
     * Initializes the UI Component View
     * Runs a single setupHandlers call, followed by createChildren and layout
     *
     * @returns {Tiles}
     * @since 1.0
     */
    Tiles.prototype.init = function(options) {
        this.isEnabled = false;

        this.$tileMatrix = $('.js-tiles');
        this.$tiles = $('.js-tiles-trigger');
        this.$window = $(window);

        return this
            .createChildren(options)
            .setupHandlers()
            .enable();
    };

    /**
     * Binds the scope of any handler functions
     * Should only be run on initialization of the view
     *
     * @returns {Tiles}
     * @since 1.0
     */
    Tiles.prototype.setupHandlers = function() {

        this.eventHandler = $.proxy(this.toggleSlide, this);
        this.removeInfoHandler = $.proxy(this.removeInfo, this);
        this.isEnabled = true;

        return this;
    };

    /**
     * Create any child objects or references to DOM elements
     * Should only be run on initialization of the view
     *
     * @returns {Tiles}
     * @since 1.0
     */
    Tiles.prototype.createChildren = function(options) {
        // Create any other dependencies here

        return this;
    };

    /**
     * Enables the view
     * Performs any event binding to handlers
     * Exits early if it is already enabled
     *
     * @returns {Tiles}
     * @since 1.0
     */
    Tiles.prototype.enable = function() {
        if (this.isEnabled) {

            this.$tiles.on('click', this.eventHandler);
            this.$window.on('resize', this.removeInfoHandler);

            return this;
        }

        this.isEnabled = true;

        return this;
    };

    /**
     * Closes and opens panels
     *
     * @returns {Tiles}
     * @since 1.0
     */
    Tiles.prototype.toggleSlide = function(e) {
        var $this = $(e.currentTarget);
        var index = this.$tiles.index($this) + 1;
        var infoHeight = $this.find('.flavor-info').outerHeight(true);

        this.updateElement($this, index);

        var $tileInfoContainer = $('.js-tiles-feature');
        var self = this;

        self.updateInfo($this, index, $tileInfoContainer);

        // this.$tileMatrix
        //     .find($tileInfoContainer)
        //         .addClass('isActive')
        //         .attr('id',index)
        //         .animate({ height: infoHeight }, 350);

        $tileInfoContainer
                .addClass('isActive')
                .attr('id',index)
                .animate({ height: infoHeight }, 350);

        return this;
    };

    /**
     * Adds content to the new element, taken from the targetted element.
     *
     * @returns {Tiles}
     * @since 1.0
     */
    Tiles.prototype.updateInfo = function($this, index, $tileInfoContainer){

        this.currentInfo = $this.find('.tile-content').html();

        var tileId = (Math.ceil($tileInfoContainer.attr('id')));

        if ((index) === (tileId)){
            this.closeSlide();
            return;
        }

        $tileInfoContainer.find('.flavor-info').remove();
        $tileInfoContainer.find('.feature').append(this.currentInfo);
        $('.js-tiles-feature .flavor-info').fadeIn(1000);

        return this;

    };

    /**
     * Closes slide
     *
     * @returns {Tiles}
     * @since 1.0
     */
    Tiles.prototype.closeSlide = function(){
        this.$oldInfo
            .animate({ height: 0 }, 350, function(){
                $(this).remove();
            });
 
        return this;

    };

    /**
     * Removes flavor info on window resize.
     * This is primarily to prevent the info element from breaking pattern fidelity. 
     *
     * @returns {Tiles}
     * @since 1.0
     */
    Tiles.prototype.removeInfo= function(){
        this.$info = $('.js-tiles li.isActive');

        this.$info.remove();
 
        return this;

    };

    /**
     * Adds new list item that features content about the selected element.
     *
     * @returns {Tiles}
     * @since 1.0
     */
    Tiles.prototype.updateElement = function($this, index){
        this.$oldInfo = $('.js-tiles li.isActive');

        var ulWidth = this.$tileMatrix.width();
        var liWidth = this.$tileMatrix.children('li').width();
        var liPerRow = Math.floor(ulWidth/liWidth);
        var $insertAfterMe = $('.js-tiles-trigger').eq((Math.ceil(index/liPerRow) * liPerRow) - 1);

        if ($insertAfterMe.length === 0) {
            $insertAfterMe = $('.js-tiles li').last();
        }

        if ($insertAfterMe.next().hasClass('isActive') || $insertAfterMe.last().hasClass('isActive')){
            return;
        } else {
            this.closeSlide();
        }

        $insertAfterMe.after("<li class='js-tiles-feature blocks-row'><div class='feature'></div></li>");

        return this;

    };

    return Tiles;

})(jQuery);