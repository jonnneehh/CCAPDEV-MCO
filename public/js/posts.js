$(document).ready(()=>{
    $("#addcomment").click(function(){
        var comment = $("#add-comment").val();
        var iconsrc = "images/u-profile.png";
        
        var commentdata = {
            commentOwnerDP: iconsrc,
            content: comment,
            postOwner: $(this).closest(".post-container").attr("id")
        }
        
        if(comment == ""){
            return;
        }
        
        $("#add-comment").val("");
        
        addComment(commentdata);

        function addComment(commentdata){
            $.get('/addComment', commentdata, function(data, status){
                $("#" + commentdata.postOwner +" .comments-section").append(data);
            })
        }
    })

    $("#cancelcomment").click(function(){
        $("#add-comment").val("");
    })

    $(".upvote").click(function(){
        var color = $(this).css("color");
        var siblingcolor = $(this).siblings('.downvote').css("color");
        const black = "rgb(38, 38, 38)";
        const blue = "rgb(0, 0, 255)";
        
        if(siblingcolor != black){
            $(this).siblings('.downvote').css("color", black);
            addLike(this)
        }
        if(color == black){
            addLike(this)
            $(this).css("color", blue)
        }
        else{
            removeLike(this);
            $(this).css("color", black)
        }

        function addLike(upvote){
            var like = $(upvote).siblings('.likes').text();
            $(upvote).siblings('.likes').text(parseInt(like) + 1);
        }
        function removeLike(upvote){
            var like = $(upvote).siblings('.likes').text();
            $(upvote).siblings('.likes').text(parseInt(like) - 1);
        }
    })

    $(".downvote").click(function(){
        var color = $(this).css("color");
        var siblingcolor = $(this).siblings('.upvote').css("color");
        const black = "rgb(38, 38, 38)";
        const red = "rgb(255, 0, 0)";
        
        if(siblingcolor != black){
            $(this).siblings('.upvote').css("color", black);
            removeLike(this);
        }

        if(color == black){
            removeLike(this)
            $(this).css("color", red)
        }
        else{
            addLike(this);
            $(this).css("color", black)
        }

        function addLike(downvote){
            var like = $(downvote).siblings('.likes').text();
            $(downvote).siblings('.likes').text(parseInt(like) + 1);
        }
        function removeLike(downvote){
            var like = $(downvote).siblings('.likes').text();
            $(downvote).siblings('.likes').text(parseInt(like) - 1);
        }
    })

    $(".deletepost").click(function(){
        $(this).parents(".post-container").remove();
    })
})