$(function () {
//数据加载动画
    $('.loading .loading-ele').animate({
        width: '100%'
    }, 500, function () {
        $('.loading').fadeOut();
    });
    //角色列表
    var num = -3.6;
    var liIndex = 0;
    $(".tabLeft").click(function () {
        liIndex = $(".role>ul>li[class*='tabLi_on']").index();
        var num1 = liIndex - 1;
        if (num1 <= -1) {
            num1 = $(".role>ul>li").length - 1;
        }
        role(num1);
        var he;
        if (liIndex == 0 || liIndex > $(".role>ul>li").length - 3) {
            liIndex = $(".role>ul>li").length - 3;
        } else if (liIndex < 3) {
            liIndex = 3;
        }
        he = num * (liIndex - 3);
        $(".role>ul").css("transform", "translateX(" + he + "rem)");
        $(".role>ul>li").removeClass("tabLi_on");
        $(".role>ul>li").eq(num1).addClass("tabLi_on");
    });
    $(".tabRight").click(function () {
        liIndex = $(".role>ul>li[class*='tabLi_on']").index();
        var num1 = liIndex + 1;
        if (num1 >= $(".role>ul>li").length) {
            num1 = 0;
        }
        role(num1);
        var he;
        if (liIndex >= $(".role>ul>li").length - 1 || liIndex < 3) {
            liIndex = 2;
        } else if (liIndex > $(".role>ul>li").length - 4) {
            liIndex = $(".role>ul>li").length - 4;
        }
        he = num * (liIndex - 2);
        $(".role>ul").css("transform", "translateX(" + he + "rem)");
        $(".role>ul>li").removeClass("tabLi_on");
        $(".role>ul>li").eq(num1).addClass("tabLi_on");
    });
    //获取蒙德城数据
    $.get("https://www.fastmock.site/mock/a4e19c4194b3d0a0d24dd94959a7b0cc/yuanshen/role", function (res) {
        var ress = res.role1;
        for (let i = 0; i < ress.length; i++) {
            var $tabLi = $("<li><img src=" + ress[i].roleHeadImg + "><p>" + ress[i].roleName + "</p></li>");
            $(".role>ul").append($tabLi);
            $(".role>ul>li:eq(0)").addClass("tabLi_on");
            var $introduce = $("<li style='display: none'><div class='Introduce'><img src=" + ress[i].roleLogo + "><img class='roleImg' src=" + ress[i].roleImg + "><div class='Introduce1'><img src=" + ress[i].roleNameImg + "><div><div class='name'>CV:&nbsp;<span>" + ress[i].roleCVNameCN + "</span><span style='display: none'>" + ress[i].roleCVNameJP + "</span></div><div class='audio_on_off'><i></i></div><div class='audio'><p class='audio_on'>中</p><p>日</p></div></div><div><i></i><div class='roleP'></div></div></div></div><div class='audio_CN'></div><div class='audio_JP'></div></li>");
            $(".roleIntroduce>ul").append($introduce);
            $(".roleIntroduce>ul>li:eq(0)").css("display", "block");
            $(".roleIntroduce>ul>li:eq(0) .roleImg").addClass("roleDH");
            for (let j = 0; j < ress[i].roleCVAudioCN.length; j++) {
                var $CN = $("<audio src=" + ress[i].roleCVAudioCN[j] + "></audio>");
                $(".audio_CN").eq(i).append($CN);
            }
            for (let j = 0; j < ress[i].roleCVAudioJP.length; j++) {
                var $JP = $("<audio src=" + ress[i].roleCVAudioJP[j] + "></audio>");
                $(".audio_JP").eq(i).append($JP);
            }
            for (let j = 0; j < ress[i].roleIntroduce.length; j++) {
                var $txtP = $("<p>" + ress[i].roleIntroduce[j] + "</p>")
                $(".roleP").eq(i).append($txtP);
            }
        }
        //点击切换中/日语音
        let CN_JP = true;
        $(".audio").click(function () {
            $(this).find("p").toggleClass("audio_on");
            $(".name span").toggle();
            if (CN_JP) {
                CN_JP = false;
            } else {
                CN_JP = true;
            }
        });
        //角色列表点击切换
        $(".role>ul>li").click(function () {
            liIndex = $(this).index();
            role(liIndex);
            if (liIndex < 3) {
                liIndex = 2;
            } else if (liIndex > $(".role>ul>li").length - 4) {
                liIndex = $(".role>ul>li").length - 4;
            }
            var num1 = num * (liIndex - 2);
            $(".role>ul").css("transform", "translateX(" + num1 + "rem)");
            $(".role>ul>li").removeClass("tabLi_on");
            $(this).addClass("tabLi_on");
        });
        //获取音频时长
        var aidNum = 0;
        $(".audio_on_off").click(function () {
            for (var i = 0; i < $(".roleIntroduce>ul>li").length; i++) {
                if ($(".roleIntroduce>ul>li").eq(i).css("display") == 'block') {
                    liIndex = $(".roleIntroduce>ul>li").eq(i).index();
                }
            }
            if (CN_JP) {
                var aidCN = document.getElementsByClassName("audio_CN")[liIndex].children[aidNum];
                var aidCNa = document.getElementsByClassName("audio_CN")[liIndex].children[aidNum - 1];
            } else {
                var aidCN = document.getElementsByClassName("audio_JP")[liIndex].children[aidNum];
                var aidCNa = document.getElementsByClassName("audio_JP")[liIndex].children[aidNum - 1];
            }
            var aidS = Math.ceil(aidCN.duration * 1000);
            if ($(this).find("i").css("display") == "none") {
                $(this).find("i").show();
                aidCN.play();
                aidNum++;
                f(aidS);
                if (aidNum == 3) {
                    aidNum = 0;
                }
            } else {
                aidCNa.pause();
                $(this).find("i").hide();
                clearTimeout(auto);
            }
        });

        function f(aidS) {
            auto = setTimeout(function () {
                $(".audio_on_off").find("i").hide();
            }, aidS)
        }
    });

    //角色切换
    function role(index) {
        var roleIntroduce = $(".roleIntroduce>ul>li");
        roleIntroduce.css("display", "none");
        roleIntroduce.find(".roleImg").removeClass("roleDH");
        roleIntroduce.eq(index).css("display", "block");
        roleIntroduce.eq(index).find(".roleImg").addClass("roleDH");
    }


});
