$(function () {
    //数据加载动画
    $('.loading .loading-ele').animate({
        width: '100%'
    }, 500, function () {
        $('.loading').fadeOut();
    });
    //全屏滚动
    $('#fullPage').fullpage({
        anchors: ['page1', 'page2', 'page3'],
        menu: '#menu'
    });
});

//关闭遮罩层
function btnX() {
    $(".detailsIntroduce").css("display", "none");
}

//显示详情
function details(num) {
    $.get("https://www.fastmock.site/mock/a4e19c4194b3d0a0d24dd94959a7b0cc/yuanshen/world", function (res) {
        var ress = res.world[num];
        console.log(ress.region);
        $(".detailsIntroduce>div").empty();
        var $Div = $("<div><h3>" + ress.city + "</h3><button onclick='btnX()'></button></div>");
        $(".detailsIntroduce>div").append($Div);
        var $regionDiv = $("<div class='regionDiv'></div>");
        for (let i = 0; i < ress.region.length; i++) {
            var $regionDiv_div = $("<div class='region'><h3>" + ress.region[i].regionName + "</h3></div>");
            for (let j = 0; j < ress.region[i].regionIntroduce.length; j++) {
                var $regionDiv_p = $("<p>" + ress.region[i].regionIntroduce[j] + "</p>");
                $regionDiv_div.append($regionDiv_p);
            }
            var $regionDiv_img=$("<img src="+ress.region[i].regionImg+">");
            $regionDiv_div.append($regionDiv_img);
            $regionDiv.append($regionDiv_div);
        }
        $(".detailsIntroduce>div").append($regionDiv);
    });
    $(".detailsIntroduce").css("display", "block");
}