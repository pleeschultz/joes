var Tiles = function(){
    console.log('bite my shiny metal ass');

    setupHandlers();
    enable();

    this.$tileMatrix = $('.js-tiles');
    this.$tiles = $('.js-tiles-trigger');
    this.$window = $(window);

    function setupHandlers (){
        this.eventHandler = $.proxy(toggleSlide, this);
    };

    function enable (){
        $('.js-tiles-trigger').on('click', this.eventHandler);
        $(window).on('resize', this.removeInfoHandler);
    };

    function toggleSlide (e) {
        var $this = $(e.currentTarget);

        /* 
            MEASUREMENTS
        */

        // DETERMINE EQ OF THE TRIGGERED LI
        var index = $('.js-tiles-trigger').index($this) + 1;

        // TOTAL LI
        var totalLi = $('.js-tiles-trigger').length;

        // UL WIDTH
        var ulWidth = $('.js-tiles').width();
        
        // LI WIDTH
        var liWidth = $('.js-tiles').children('li').width();

        // LI PER ROW
        var liPerRow = Math.floor(ulWidth/liWidth);

        // FIND LAST LI IN CURRENT ROW
        var findEnd = (Math.ceil(index/liPerRow) * liPerRow -1);

        // TOTAL ROWS
        var totalRows = (Math.ceil(totalLi/liPerRow));
        
        //TILE HEIGHT
        var tileHeight = $('.js-tiles-trigger')[0].offsetHeight;

        /* 
            CLASS SWAP
        */
        $('.js-tiles').find('.js-tiles-trigger').removeClass('tile-info-isActive');
        $('.js-tiles').find('.js-tiles-trigger').eq(findEnd).addClass('tile-info-isActive');

        /*
            DETERMINE OFFSET
        */

        // NUMBER OF PREV LI
        prevLi = $('.tile-info-isActive').prevAll('.js-tiles-trigger').length;

        // CURRENT ROW
        currentRow = Math.ceil(prevLi/liPerRow);

        // OFFSET
        var offset = currentRow * tileHeight;

        // APPLY OFFSET
        $('.flavor-description').css('top', offset);

        updateInfo($this, index);

    };

    function updateInfo ($this, index){
        /*
            GET THAT CURRENT FLAVOR INFO
            SET IT IN THE FLAVOR DESCRIPTION
        */
        var currentInfo = $this.find('.flavor-info').html();
        $('.flavor-description').html(' ');

        $('.flavor-description').append(currentInfo);

    };

    function closeSlide (){
       // CUZ PEOPLE JUST WANT TO CLOSE SHIT SOMETIMES
       // COMING SOON
    };

}

