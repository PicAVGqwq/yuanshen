$(function () {
    var audio = document.getElementById("audio");
    $("#music").click(function () {
        if (audio.paused) {
            audio.play();
            $("#music").attr("src", "../images/nav/on_music.png");
        } else {
            audio.pause();
            $("#music").attr("src", "../images/nav/off_music.png");
        }
    });
    $(window).on('load resize', function () {
        var $thisnav = $('.wee:first').offset().left;
        $('.menu-item').mouseover(function () {
            var $left = $(this).offset().left - $thisnav;
            var $width = $(this).outerWidth();
            $('.wee').css({'left': $left, 'width': $width});
        });
        $('.menu').mouseleave(function () {
            var $initwidth = $('.current-menu-item').width();
            $('.wee').css({'left': '0', 'width': $initwidth});
        })
    });
    $(document).scroll(function () {
        var scroH = $(document).scrollTop();  //滚动高度
        if (scroH > 400) {  //距离顶部大于100px时
            $("#nav").css("background-color", "rgba(17, 17, 17, 0.85)")
        } else {
            $("#nav").css("background-color", "rgba(17, 17, 17, 0.75)")
        }
    });
    $("#sign_in").click(function () {
        $("article").css("display", "block");
        $("body").css("overflow", "hidden")
    });
    $(".sing_in > i ").click(function () {
        $("article").css("display", "none");
    });
});