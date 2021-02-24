$(function () {
//数据加载动画
    $('.loading .loading-ele').animate({
        width: '100%'
    }, 500, function () {
        $('.loading').fadeOut();
    });
    $.get("https://www.fastmock.site/mock/a4e19c4194b3d0a0d24dd94959a7b0cc/yuanshen/cartoon", function (res) {
        var ress = res.cartoon;
        for (let i = 0; i < ress.length; i++) {
            console.log(ress[i]);
            var $li = $("<li><img src=" + ress[i].cartoonImg + "><h3>" + ress[i].cartoonName + "</h3><i></i></li>");
            $(".catalog>div>ul").append($li);
        }
    })
});