$(document).ready(function () {

    $(".post-container").click(function (e) { 
        e.preventDefault();
        $(".modal").show();
        $(".screen_block").show();
    });

    $(".screen_block").click(function (e) {
        e.preventDefault();
        $(".modal").hide();
        $(this).hide();
    });
    
    // removing this will let you click the button which redirects you to /addpost
    $("#addPostdiv").on("click", function (e) {
        e.preventDefault();
        $(".modal").show();
        $(".screen_block").show()
    });
    
});
