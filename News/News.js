$(function () {
    var ress;
    let NewsTitle = ["新闻", "公告", "活动"];
    let NewsTitleColor = ["#ffc000", "#bc80ff", "#99cc33"];
    //数据加载动画
    $('.loading .loading-ele').animate({
        width: '100%'
    }, 500, function () {
        $('.loading').fadeOut();
    });

    // 页面顶部和新闻数据
    $.get("https://www.fastmock.site/mock/a4e19c4194b3d0a0d24dd94959a7b0cc/yuanshen/news", function (res) {
        ress = res.News;
        //页面顶部数据
        for (var i = 0; i < 3; i++) {
            var $NewsDiv = $("<div><div><img src=" + ress[i].NewsImg + "></div><h3>" + ress[i].NewsTitle + "</h3><p>" + ress[i].NewsTxt + "</p><div><span>" + ress[i].NewsDate + "</span><span style='color: " + NewsTitleColor[ress[i].NewsSection] + "'>" + NewsTitle[ress[i].NewsSection] + "</span></div></div>");
            $("#news_top>div").append($NewsDiv);
        }
        News0(ress, 0, 5);
    });

    function News0(res, num0, num1) {
        for (let i = num0; i < num1; i++) {
            var $NewsLi = $("<li><img src=" + res[i].NewsImg + "><div><h3>" + res[i].NewsTitle + "</h3><p>" + res[i].NewsTxt + "</p></div><div><span>" + res[i].NewsDate + "</span><span style='color: " + NewsTitleColor[ress[i].NewsSection] + "'>" + NewsTitle[ress[i].NewsSection] + "</span></div><i></i></li>");
            $(".NewsContent").append($NewsLi);
        }
    }

    //加载更多
    function load(data) {
        var num1 = $(".NewsContent>li").length;
        var num2 = num1 + 5;
        if (data.length < num2) {
            $(".NewsLoad").css("opacity", "0");
        } else {
            $(".NewsLoad").css("opacity", "1");
            News0(data, num1, num2)
        }
    }

    $(".NewsLoad").click(function () {
        load(ress);
    });

    $("#NewsT>li").click(function () {
        $("#NewsT>li").removeClass("NewsTitle_on");
        $(this).addClass("NewsTitle_on");
        var num = $(this).index() - 1;
        var data = [];
        var num1 = 0;
        if (num == -1) {
            $(".NewsContent").empty();
            News0(ress, 0, 5);
        } else {
            $(".NewsContent").empty();
            for (var i = 0; i < ress.length; i++) {
                if (ress[i].NewsSection == num) {
                    data[num1] = ress[i];
                    num1++;
                }
            }
            console.log(data);
            News0(data, 0, 5);
        }
    });
    $(document).scroll(function () {
        var scroH = $(document).scrollTop();
        if (scroH > 400) {
            $("#sidebar").css("opacity", "1");
        } else {
            $("#sidebar").css("opacity", "0");
        }
    });
    $("#sidebar").click(function () {
        $("body,html").animate({
            scrollTop: 0
        },500)
    })
});