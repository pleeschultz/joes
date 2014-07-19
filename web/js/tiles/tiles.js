var Tiles = function(){
    console.log('bite my shiny metal ass');

    setupHandlers();
    enable();

    this.isEnabled = false;

    this.$tileMatrix = $('.js-tiles');
    this.$tiles = $('.js-tiles-trigger');
    this.$window = $(window);

    function setupHandlers (){
        this.eventHandler = $.proxy(toggleSlide, this);
        this.removeInfoHandler = $.proxy(removeInfo, this);
        this.isEnabled = true;

    };

    function enable (){
        $('.js-tiles-trigger').on('click', this.eventHandler);
        $(window).on('resize', this.removeInfoHandler);
    };

    function toggleSlide (e) {
        // console.log('what wat');
        var $this = $(e.currentTarget);
        var index = $('.js-tiles-trigger').index($this) + 1;
        // var infoHeight = $this.find('.flavor-info').outerHeight(true);


        // TOTAL LI
        var totalLi = $('.js-tiles-trigger').length;

        // UL WIDTH
        var ulWidth = $('.js-tiles').width();
        
        // LI WIDTH
        var liWidth = $('.js-tiles').children('li').width();

        // LI PER ROW
        var liPerRow = Math.floor(ulWidth/liWidth);
        // console.log('li per row ' + liPerRow);

        // FIND LAST LI IN CURRENT ROW
        var findEnd = (Math.ceil(index/liPerRow) * liPerRow -1);

        // TOTAL ROWS
        var totalRows = (Math.ceil(totalLi/liPerRow));
        
        //TILE HEIGHT
        var tileHeight = $('.js-tiles-trigger')[0].offsetHeight;

        $('.js-tiles').find('.js-tiles-trigger').removeClass('tile-info-isActive');
        $('.js-tiles').find('.js-tiles-trigger').eq(findEnd).addClass('tile-info-isActive');

        // NUMBER OF PREV LI
        prevLi = $('.tile-info-isActive').prevAll('.js-tiles-trigger').length;
        console.log('num of previous li ' + prevLi);
        console.log('li per row ' + liPerRow);
        // CURRENT ROW
        currentRow = Math.ceil(prevLi/liPerRow);
        
        console.log('current tile height is ' + tileHeight + ' times ' + currentRow);
        console.log('current row is ' + currentRow);

        // OFFSET
        var offset = currentRow * tileHeight;
        console.log('offset is ' + offset)

        $('.flavor-info').css('top',offset);

        // console.log('index is ' + index);
        // console.log('li width ' + liWidth);
        // console.log("ul width " + ulWidth);
    
        // console.log('total number of rows ' + totalRows);

        updateElement($this, index);

        // var $tileInfoContainer = $('.js-tiles-feature');
        // var self = this;

        updateInfo($this, index);

        // this.$tileMatrix
        //     .find($tileInfoContainer)
        //         .addClass('isActive')
        //         .attr('id',index)
        //         .animate({ height: infoHeight }, 350);

        // $tileInfoContainer
        //         .addClass('isActive')
        //         .attr('id',index)
        //         .animate({ height: infoHeight }, 350);

    };

    function updateInfo ($this, index){

        // var $offset = $('.tile-info-isActive').offset();
        // console.log('this is the $offset left ' + $offset.left + ' and offset top ' + $offset.top);
        // $offsetAdj = currentRow * tileHeight;
        // console.log('offset adjust ' + $offsetAdj);

        $('.flavor-info').css({
            // left: $offset.left,
            // top: $offsetAdj
        })    

        

        var currentInfo = $this.find('.tile-content').html();

        // var tileId = (Math.ceil($tileInfoContainer.attr('id')));

        // if ((index) === (tileId)){
        //     closeSlide();
        //     return;
        // }

        // $tileInfoContainer.find('.flavor-info').remove();
        // $tileInfoContainer.find('.feature').append(this.currentInfo);
        // $('.js-tiles-feature .flavor-info').fadeIn(1000);

    };

    function closeSlide (){
        $oldInfo
            .animate({ height: 0 }, 350, function(){
                $(this).remove();
            });
    };

    function removeInfo (){
        $info = $('.js-tiles li.isActive');
        console.log('removeInfo');
        $info.remove();

    };

    function updateElement ($this, index){
        console.log('updateElement has fired');
        // console.log("this is " + $this);
        // console.log("index is " + index);
        // console.log($this.text());
        $oldInfo = $('.js-tiles li.isActive');

        
        // var $insertAfterMe = $this.eq((Math.ceil(index/liPerRow) * liPerRow) - 1)

        // $this.eq(MATH).addClass('boiing');

        // if ($insertAfterMe.length === 0) {
        //     $insertAfterMe = $('.js-tiles li').last();

        //     console.log('is this true');
        // }

        // if ($insertAfterMe.next().hasClass('isActive') || $insertAfterMe.last().hasClass('isActive')){
        //     return;
        //     console.log('is this truer');
        // } else {
        //     closeSlide();
        // }

        // $insertAfterMe.after("<li class='js-tiles-feature blocks-row'><div class='feature'></div></li>");

        return this;

    };
}

