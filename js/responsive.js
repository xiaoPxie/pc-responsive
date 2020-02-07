!(function () {

    // 左侧导航栏
    var $navBar = $(".common-nav");
    // 顶部信息栏
    var $topBar = $(".top-bar");
    // 模态层
    var $modal = $(".modal");
    // 左侧导航栏列表容器
    var $navWrap = $(".nav-wrap");
    // 左侧导航栏列表项
    var $navObj = $navWrap.find(".nav-item");
    // 操作集合按钮
    var $operationSetBtn = $("#operation-set");
    // 显示/隐藏左侧导航栏按钮
    var navCtrBtn = $("#nav-ctr-btn");

    /* 显示/隐藏左侧导航栏 */
    navCtrBtn.on('click', function (ev) {
        // 没被隐藏
        if($navBar.css("left") !== '0px'){
            // 移动端，展开左侧导航栏，添加模态层，隐藏操作面板
            if($(document).width() <= pad_mobile) {
                $navBar.removeClass('hide').css({
                    "left": "0"
                });
                $modal.addClass("show").css({
                    "opacity": "1",
                    "z-index": "99"
                });
                $operationSetBtn.removeClass("active");
                $topBar.find(".warp-r").css({
                    "display": "none"
                });
            }else { // 其余的设备展开左侧导航栏以及缩进top-bar
                $navBar.removeClass('hide').css({
                    "left": "0"
                });
                $topBar.find(".wrap").css({
                    "margin-left": $navBar.width() + 'px'
                });
            }
        }else {
            $navBar.addClass('hide').css({
                "left": '-' + $navBar.width() + 'px'
            });
            $topBar.find(".wrap").css({
                "margin-left": "0"
            });
        }
    });

    var navListLength = $navObj.length;
    var navItemActiveIndex = 0;
    for(var i=0; i < navListLength; i++){
        if($navObj.eq(i).hasClass("active")){
            navItemActiveIndex = i;
        }
    }
    // 点击左侧导航栏
    $navWrap.on('click', '.nav-item', function (ev) {
        navItemActiveIndex = $(ev.currentTarget).index();
        $(ev.currentTarget).addClass("active").find("span").addClass("active");
        $(ev.currentTarget).siblings('li').removeClass("active").find("span").removeClass("active");
    });
    // 划过导航栏选项
    $navWrap.on('mouseenter', '.nav-item', function (ev) {
        var obj = $navObj.eq(navItemActiveIndex);
        $(ev.currentTarget).addClass("active").find("span").addClass("active");
        $(ev.currentTarget).siblings('li').not(obj).removeClass("active").find("span").removeClass("active");

    });
    $navWrap.on('mouseleave', '.nav-item', function (ev) {
        var obj = $navObj.eq(navItemActiveIndex);
        $(ev.currentTarget).not(obj).removeClass("active").find("span").removeClass("active");
    });

    // 点击操作按钮
    $operationSetBtn.on("click", function () {
        if($modal.hasClass("show")) {
            $(this).removeClass("active");
            $modal.removeClass("show").css({
                "opacity": "0",
                "z-index": "-1"
            });
            $topBar.find(".warp-r").css({
                "display": "none"
            });
        }else {
            // 移动端，隐藏左侧导航栏
            if($(document).width() <= pad_mobile) {
                $navBar.addClass('hide').css({
                    "left": '-' + $navBar.width() + 'px'
                });
            }
            $(this).addClass("active");
            $modal.addClass("show").css({
                "opacity": "1",
                "z-index": "50"
            });
            $topBar.find(".warp-r").css({
                "display": "block"
            });
        }
    });

    // 点击模态层，关闭模态层和左侧导航栏
    $modal.on("click", function () {
        $modal.removeClass("show").css({
            "opacity": "0",
            "z-index": "-1"
        });
        $navBar.addClass('hide').css({
            "left": '-' + $navBar.width() + 'px'
        });
        $operationSetBtn.removeClass("active");
        $topBar.find(".warp-r").css({
            "display": "none"
        });
    })
})()