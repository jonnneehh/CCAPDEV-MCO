$(document).ready(function () {

    $(".post-container").on("click", function (e) { 
        e.preventDefault();
        $("#interact_modal").show();
        $(".screen_block").show();
    });

    $(".screen_block").on("click", function (e) {
        e.preventDefault();
        $(".modal").hide();
        $(this).hide();
    });
    
    // removing this will let you click the button which redirects you to /addpost
    $(".addPostdiv").on("click", function (e) {
        if (!($(".addPostdiv").attr("id"))) {
            e.preventDefault();
        }
        $("#addpost_modal").show();
        $(".screen_block").show()
        
    });
    
});
