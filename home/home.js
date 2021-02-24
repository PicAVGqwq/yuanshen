$(function () {
    //数据加载动画
    $('.loading .loading-ele').animate({
        width: '100%'
    }, 500, function () {
        $('.loading').fadeOut();
    });
    //侧边栏
    $("#btn").click(function () {
        $(this).find("i").toggleClass("icon");
        $("#sidebar>div:first").animate({
            width: 'toggle',
        });
    });

    $(document).scroll(function () {
        var scroH = $(document).scrollTop();
        if (scroH > 400) {
            $("#sidebar").css("opacity", "1");
        } else {
            $("#sidebar").css("opacity", "0");
        }
    });
    // 新闻资讯
    $(".NewsTitle>li").click(function () {
        $(".NewsTitle>li").removeClass("NewsTitle_after");
        $(this).toggleClass("NewsTitle_after");
        let index = $(this).index();
        $(".News").empty();
        News(index);
    });
    News(1);

    function News(index) {
        $.get("https://www.fastmock.site/mock/a4e19c4194b3d0a0d24dd94959a7b0cc/yuanshen/home", function (res) {
            for (let i = 0; i < res.News.length; i++) {
                for (let j = 0; j < res.News[i].NewsSection.length; j++) {
                    if (res.News[i].NewsSection[j] == index) {
                        var $NewsLi = $("<li><a href='javaScript:void (0)'><p>" + res.News[i].NewsTitle + "</p><p>" + res.News[i].NewsDate + "</p></a></li>");
                        $(".News").append($NewsLi);
                    }
                }
            }
        })
    }
});
// 新闻资讯
var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'custom',
        renderCustom: function (swiper, current, total) {
            var paginationHtml = " ";
            for (var i = 0; i < total; i++) {
                // 判断是不是激活焦点，是的话添加active类，不是就只添加基本样式类
                if (i === (current - 1)) {
                    paginationHtml += '<span class="swiper-pagination-customs swiper-pagination-customs-active"></span>';
                } else {
                    paginationHtml += '<span class="swiper-pagination-customs"></span>';
                }
            }
            return paginationHtml;
        },
    },
});