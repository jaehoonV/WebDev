$(document).ready(function() {

    //상단메뉴
    $(".header_menu li>a.menu_1depth").click(function(e) {
        e.preventDefault();
        
        var $this = $(this);
        var $content = $this.next(".depth_wrap");
        
        $this.toggleClass("active");
        
        if ($content.is(":visible")) {
            $content.stop().fadeOut(400, function() {
                $content.css("display", "none");
            });
        } 
        else {
            $content
                .css("display", "flex")
                .hide()                 
                .stop().fadeIn(400);   
        }
        
        $this.parent().siblings().children("a").removeClass("active").next(".depth_wrap").stop().fadeOut(400, function() {
            $(this).css("display", "none"); 
        });
    });

    //공정이미지 탭
    document.querySelectorAll('.project-photo .img_tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
            const targetId = tab.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                const isActive = targetContent.classList.contains('active');

                if (!isActive) {
                    document.querySelectorAll('.project-photo .image_grid').forEach(function(content) {
                        content.classList.remove('active');
                    });
                    document.querySelectorAll('.project-photo .img_tab').forEach(function(t) {
                        t.classList.remove('active');
                    });

                    targetContent.classList.add('active');
                    tab.classList.add('active');
                }
            }

            updateParentVisibility();
        });
    });

    //프로젝트 개요 팝업
    $(".btn_overview").click(function() {
        $(".pop_overview").show();
        $("#ui-overlay").fadeIn(100);
    });
    $(".pop_close").click(function() {
        $(".pop_overview").hide();
        $("#ui-overlay").fadeOut(100);
    });

    //프로젝트 위치 팝업
    $(".btn_location").click(function() {
        $(".pop_location").show();
        $("#ui-overlay").fadeIn(100);
    });
    $(".pop_close").click(function() {
        $(".pop_location").hide();
        $("#ui-overlay").fadeOut(100);
    });

    //분야별 공정진도 팝업
    $(".project-progress .title_btn").click(function() {
        $(".pop_progress").show();
        $("#ui-overlay").fadeIn(100);
    });
    $(".pop_close").click(function() {
        $(".pop_progress").hide();
        $("#ui-overlay").fadeOut(100);
    });
});
