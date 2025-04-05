"use strict";

$(document).ready(function () {
    const clickSound = new Audio("click.mp3");

    if (window.innerWidth < 768) {
        $(".mouse").hide();
        $("*").css("cursor", "default");

        // Optional: turn off trail/click effects for mobile
        $(window).off("mousemove");
        $("body").off("click");
    }

    $(".loading").height($(window).height());
    $(".loading").width($(window).width());
    $(".loading img").css({
        paddingTop: ($(".loading").height() - $(".loading img").height()) / 2,
        paddingLeft: ($(".loading").width() - $(".loading img").width()) / 2
    });

    $(window).resize(function () {
        "use strict";
        $(".loading").height($(window).height());
        $(".loading").width($(window).width());
        $(".loading img").css({
            paddingTop: ($(window).height() - $(".loading img").height()) / 2,
            paddingLeft: ($(window).width() - $(".loading img").width()) / 2
        });
    });

    $(window).mousemove(function (e) {
        "use strict";
        $(".original").css({
            left: e.pageX - 16,
            top: e.pageY - 16
        });
    });

    $("body").on("click", function (e) {
        clickSound.currentTime = 0;
        clickSound.play();

        // Generate random color
        const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`;

        $(".original").clone(true)
            .appendTo("body")
            .css({
                left: e.pageX - 16,
                top: e.pageY - 16,
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`
            })
            .removeClass("original")
            .fadeOut(1000, function () {
                $(this).remove();
            });

        // Sparkle effect - 5 sparkles per click
        for (let i = 0; i < 5; i++) {
            const sparkle = $("<div class='sparkle'></div>");
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * 50;
            const x = Math.cos(angle) * distance + "px";
            const y = Math.sin(angle) * distance + "px";

            sparkle.css({
                left: e.pageX + "px",
                top: e.pageY + "px",
                "--x": x,
                "--y": y
            });

            $("body").append(sparkle);

            setTimeout(() => {
                sparkle.remove();
            }, 600);
        }
    });
});
