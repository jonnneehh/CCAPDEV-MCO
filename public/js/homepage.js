$(document).ready(function () {

    $(".post-container").on("click", function (e) { 
        if (($("body").find(".nav_btns").children(":nth-child(4)").text()) != "LOG OUT")
            e.preventDefault();

        $("#interact_modal").show();
        $(".screen_block").show();
    });

    $(".screen_block").on("click", function (e) {
        e.preventDefault();
        $(".modal").hide();
        $(this).hide();
    });
    
    $(".addPostdiv").on("click", function (e) {
        if (!($(".addPostdiv").attr("id"))) {
            e.preventDefault();
        }
        $("#addpost_modal").show();
        $(".screen_block").show()
        
    });
    
});
