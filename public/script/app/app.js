// 商品详情页 脚本

import {
    getClass,
    getId,
    SelectAll
} from '../comm.js'

var selectBorder = $('.select_border');

var sliderLeft = $(".slider_left")[0];

var sliderRight = $(".slider_right")[0];

var stripScroll = $(".strip_scroll")

var handle = $(".handle")

var strip = $(".strip")

var smImgItem = $(".sm_img_item");

var md_item = $(".md_item")
for (let item of smImgItem) {
    $(item).on("click", function(e) {
        e.stopPropagation()
        var $this = $(e.currentTarget);
        var $index = $this.index() - 1;
        var JumpSpace = $index * 118;
        selectBorder.css("left", JumpSpace + "px");
        $(md_item[$index]).addClass("no_none").siblings().removeClass("no_none")
    })
}

$(sliderRight).on('click', function(e) {
    var selectBorder = $('.select_border');
    var stripScrollLeft = stripScroll[0].offsetLeft;
    var selectBorderMove = selectBorder[0].offsetLeft;
    var no_none = $(".no_none");
    if (selectBorderMove < stripScroll.width() - 118) {
        selectBorderMove += 118
    }
    selectBorder.css("left", selectBorderMove + "px")
    var Stripwidth = strip.width() - 118;
    var hidWidth = 0 - (stripScroll.width() - strip.width());
    if (selectBorderMove > Stripwidth && stripScrollLeft > hidWidth) {
        stripScroll.css("left", stripScrollLeft - 118 + "px")
        stripScrollLeft += -118
    } else if (stripScrollLeft <= hidWidth) {
        stripScroll.css("left", 0 + "px");
        selectBorder.css("left", 0 + "px")
    }
    MovedirectionImg(no_none.next(),"first")
})

$(sliderLeft).on('click', function(e) {
    var selectBorder = $('.select_border');
    var stripScrollLeft = stripScroll[0].offsetLeft;
    var selectBorderMove = selectBorder[0].offsetLeft;
    var hidWidth = 0 - (stripScroll.width() - strip.width());
    var no_none = $(".no_none");
    if (selectBorderMove > 0) {
        selectBorderMove += -118
    } else {
        selectBorderMove += stripScroll.width() - 118
    }
    selectBorder.css("left", selectBorderMove + "px")
    if (stripScrollLeft < 0) {
        stripScroll.css("left", stripScrollLeft + 118 + "px")
        stripScrollLeft += 118
    } else if (selectBorderMove == stripScroll.width() - 118) {
        stripScroll.css("left", hidWidth + "px")
    }
    MovedirectionImg(no_none.prev(),"last")
})

function MovedirectionImg(direction,revert) {
    var left_container = $(".left_container")
    if (direction.length > 0) {
        direction.addClass("no_none").siblings().removeClass("no_none")
    } else {
        left_container.children(`:${revert}`).addClass("no_none").siblings().removeClass("no_none")
    }
}

function ScrollStrip(strip, stripScroll, slider, handle, img) {
    if (img[0].className == 'sm_img_item') {
        var boxWidth = img.length * (img[0].offsetWidth + 4);
    }
    stripScroll.style.width = boxWidth + 'px';
    handle.onmousedown = function aa(e) {
        var $this = e.target;
        var bejinX = e.clientX - $this.offsetLeft;
        document.onmousemove = function(e) {
            var endX = e.clientX - bejinX;
            e.preventDefault()
            if (endX < 0) {
                endX = 0
            } else if (endX >= slider.offsetWidth - $this.offsetWidth) {
                endX = slider.offsetWidth - $this.offsetWidth
            }
            $this.style.left = endX + 'px';
            //内容走的距离 = （内容的长度 - 盒子的长度） / (盒子长度 - 滚动条的长度) * 滚动条走的距离
            // var content_len = (strip_scroll.offsetWidth - strip.offsetWidth) / (strip.offsetWidth - handle.offsetWidth) * endX ;
            if (stripScroll.offsetWidth > 606) {
                var content_len = (stripScroll.offsetWidth - strip.offsetWidth) / 464 * endX;
                stripScroll.style.left = -content_len + 'px';
            }
        };
        document.onmouseup = function() {
            document.onmousemove = null
        }
    }
}
ScrollStrip(
    getClass('strip', 0),
    getClass('strip_scroll', 0),
    getClass('slider', 0),
    getClass('handle', 0),
    SelectAll('.strip .sm_img_item')
)
ScrollStrip(
    getClass('recommended_box', 0),
    getClass('recommended_ctn', 0),
    getClass('slider', 1),
    getClass('handle', 1),
    SelectAll('.recommended_ctn a')
)
var heart = getClass('heart', 0)
var heart_switch = false;
heart.onclick = function(e) {
    var $this = e.target;
    if (!heart_switch) {
        heart_switch = true
        $this.style.backgroundImage = 'url(./img/xin_red.png)'
    } else {
        heart_switch = false
        $this.style.backgroundImage = 'url(./img/xin.png)'
    }
}
