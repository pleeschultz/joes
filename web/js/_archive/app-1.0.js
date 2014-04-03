var APP = APP || {};

(function($) {
    $(function() {
        var Tiles = new APP.Tiles();
    });

})(jQuery);

APP.Tiles = (function($) {
    var Tiles = function () {
        this.$tileMatrix = $('.js-tiles');
        this.$tiles = $('.js-tiles > li');
        this.$tileInfoContainer = $('.js-tileInfo');

        this.init();
    };

    Tiles.prototype.init = function(){
        this
            .setupHandlers()
            .enable();
    };

    Tiles.prototype.setupHandlers = function(){
        this.eventHandler = $.proxy(this.toggleSlide, this);

        return this;
    };

    Tiles.prototype.enable = function(){
        this.$tiles.on('click', this.eventHandler);
    };

    Tiles.prototype.toggleSlide = function(e){

        var $this = $(e.currentTarget);
        var index = this.$tiles.index($this) + 1;
        var infoHeight = $this.find('.flavor-info').get(0).scrollHeight;
        // var infoHeight = $this.find('.flavor-info').outerHeight();
        console.log('info height', infoHeight);

        var self = this;
        
        if (!this.$tileInfoContainer.hasClass('isActive')){
            this.$tileMatrix
                .find(this.$tileInfoContainer)
                .addClass('isActive')
                .attr('id',index)
                .animate({ height: infoHeight }, 350, function(){
                    self.appendInfo($this, index);
                });

            } else {
                this.$tileMatrix
                    .find(this.$tileInfoContainer)
                    .removeClass('isActive')
                    .animate({ height: 0 }, 350, function(){
                        self.removeInfo($this);
                    })
                    .delay(200)
                    .addClass('isActive')
                    .attr('id',index)
                    .animate({ height: infoHeight }, 350, function(){
                        self.appendInfo($this, index);
                    });
            }
    };

    Tiles.prototype.appendInfo = function($this, index){

        var ulWidth = this.$tileMatrix.width();
        console.log('width', ulWidth);

        var liPerRow = Math.floor(ulWidth/150);
        console.log('liPerRow', liPerRow);

        var $insertAfterMe = $('.blocks-cell').eq((Math.ceil(index/liPerRow) * liPerRow) - 1);
        console.log('$insertAfterMe', $insertAfterMe);

        this.currentInfo = $this.find('.tile-content').html();
        this.$tileInfoContainer.append(this.currentInfo);
        $('.js-tileInfo .flavor-info').fadeIn();

    };

        Tiles.prototype.removeInfo = function($this){

        this.$activeTileInfo = this.$tileInfoContainer.find('.flavor-info');
        this.$tileInfoContainer.find(this.$activeTileInfo).remove();

    };

    return Tiles;

})(jQuery);