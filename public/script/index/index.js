import {
    getClass,
    getId,
    SelectAll
} from '../comm.js';

$(document).ready(function() {
    var arrowLeft = SelectAll('.carousel_content .arrow_left')[0];

    var arrowRight = SelectAll('.carousel_content .arrow_right')[0];

    var carousel = $('.carousel_content div:first');

    var indicators_content = $('.carousel_content .indicators_content')

    var Pointer = $('.carousel_content .indicators_content>div');

    arrowLeft.onclick = function() {
        var no_paging = $('.carousel_content .no_paging');
        var focus = $('.carousel_content .indicators_content .focus')
        lovingMagic(no_paging.prev(), 'last', focus.prev(), 'last', )
    }

    arrowRight.onclick = function() {
        var no_paging = $('.carousel_content .no_paging');
        var focus = $('.carousel_content .indicators_content .focus')
        lovingMagic(no_paging.next(), 'first', focus.next(), 'first', 'no_paging')
    }

    function lovingMagic(arrow, position, focus, revert, className) {
        var no_paging = $('.carousel_content .no_paging');
        var $focus = $('.carousel_content .indicators_content .focus')
        var arrow = arrow || no_paging.next();
        var position = position || 'first';
        var focus = focus || $focus.next();
        var revert = revert || 'first';
        var className = className || 'no_paging'
        if (arrow.length != 0) {
            arrow
                .addClass(className)
                .siblings()
                .removeClass(className)
        } else {
            carousel.children(`:${position}`)
                .addClass(className)
                .siblings()
                .removeClass(className)
        }
        if (focus.length != 0) {
            focus
                .addClass('focus')
                .siblings()
                .removeClass('focus')
        } else {
            indicators_content.children(`:${revert}`)
                .addClass('focus')
                .siblings()
                .removeClass('focus')
        }
    }

    var timer;

    function AutoTurn() {
        timer = setInterval(lovingMagic, 5000)
    }
    
    AutoTurn()

    function outTurn() {
        clearInterval(timer)
    }
    
    var overTurnDom = [arrowLeft, arrowRight, Pointer, carousel]
    for (let key in overTurnDom) {
        overTurnDom[key] = $(overTurnDom[key]);
        overTurnDom[key].on('mouseover', outTurn)
        overTurnDom[key].on('mouseout', AutoTurn)
    }

    var carousel_two = $('#carousel_container_two')

    var two_arrowLeft = $('#carousel_container_two .arrow_left')

    var two_arrowRight = $('#carousel_container_two .arrow_right')

    var two_carouselchild = $('.carousel_item > div');

    var indicators = $('.carousel_container .indicators_content');

    for (var i = 0; i < two_carouselchild.length; i++) {
        var div = document.createElement('div')
        if (i == 0) {
            $(div).addClass('focus')
        }
        $(div).on("click", function(e) {
            var $this = e.target;
            $($this).addClass('focus').siblings().removeClass("focus")
            var index = $($this).index();
            $(two_carouselchild[index]).addClass('focus').siblings().removeClass("focus")
        })
        indicators.append(div)
    }

    two_arrowLeft.click(function() {
        var carousel_item = $('.carousel_item');
        var focus = $('.carousel_item .focus');
        var indicators_focus = $('.carousel_container .indicators_content .focus');
        twoMagic(focus.prev(), 'last', 'focus', indicators_focus.prev())
    })
    two_arrowRight.click(function() {
        var carousel_item = $('.carousel_item');
        var focus = $('.carousel_item .focus');
        var indicators_focus = $('.carousel_container .indicators_content .focus')
        twoMagic(focus.next(), 'first', 'focus', indicators_focus.next())
    })

    var two_carousel = $('.carousel_item');

    var indicators = $('.carousel_container .indicators_content');

    function twoMagic(arrow, revert, className, foucs) {
        if (arrow.length != 0) {
            arrow.addClass(className).siblings().removeClass(className)
        } else {
            two_carousel.children(`:${revert}`).addClass(className).siblings().removeClass(className)
        }
        if (foucs.length != 0) {
            foucs.addClass(className).siblings().removeClass(className)
        } else {
            indicators.children(`:${revert}`).addClass(className).siblings().removeClass(className)
        }
    }
    var paged_items_paging_pagelink = $(".paged_items_paging_pagelink");
    for (let key of paged_items_paging_pagelink) {
        $(key).on('click', function(e) {
            var $this = e.target;
            $($this).addClass('active').siblings().removeClass('active')
        })
    }
})
