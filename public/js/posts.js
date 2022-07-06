$(document).ready(function(){

    $('.comment-container').on('click', '#addcomment', function (e){
        var comment = $(this).closest("form").children("textarea");
        
        var commentdata = {
            content: comment.val(),
            postOwner: $(this).parents(".post-container").attr("id")
        }
        
        if(comment == "") {return};
        
        comment.val("");

        if (($("body").find(".nav_btns").children(":nth-child(4)").text()) == "LOG OUT") {
            console.log(commentdata);
            addComment(commentdata);
        }
        

        function addComment(commentdata){
            $.get('/addComment', commentdata, function(data, status){
                $("#" + commentdata.postOwner +" .comments-section").append(data);
            })
        } 
    })

    $('.comment-container').on('click', '#cancelcomment', function (e){
        console.log("Cancelling comment...")
        $(this).closest("form").children("textarea").val("");
    })

    $(".upvote").click(function(){ 
        var color = $(this).css("color");
        var siblingcolor = $(this).siblings('.downvote').css("color");
        const black = "rgb(38, 38, 38)";
        const blue = "rgb(0, 0, 255)";

        if (($("body").find(".nav_btns").children(":nth-child(4)").text()) == "LOG OUT") {
            if(siblingcolor != black){
                $(this).siblings('.downvote').attr("style", "color: " + black);
                addUpvote(this)
            }
            if(color == black){
                addUpvote(this)
                $(this).attr("style", "color: " + blue)
            }
            else{
                removeUpvote(this);
                $(this).attr("style", "color: " + black)
            }
        }
        
        function addUpvote(upvote){
            var like = $(upvote).siblings('.likes').text();
            $(upvote).siblings('.likes').text(parseInt(like) + 1);

            //Get the parent div of the upvote. This can either be a comment or post parent
            var parent = getParent(upvote);
            var isAPost = isPost(parent);

            var likes = { 
                _id: parent.attr("id"),
                likes: $(upvote).siblings('.likes').text(),
                isPost: isAPost
            }

            console.log(likes);
            
            $.get("/addUpvote", likes, function(data, status){})
        }   

        function removeUpvote(upvote){
            var like = $(upvote).siblings('.likes').text();
            $(upvote).siblings('.likes').text(parseInt(like) - 1);

            //Get the parent div of the upvote. This can either be a comment or post parent
            var parent = getParent(upvote);
            var isAPost = isPost(parent);

            var likes = {
                _id: parent.attr("id"),
                likes: $(upvote).siblings('.likes').text(),
                isPost: isAPost
            }

            console.log(likes); 
            
            $.get("/removeUpvote", likes, function(data, status){})
        }
    })

    $(".downvote").click(function(){ 
        var color = $(this).css("color");
        var siblingcolor = $(this).siblings('.upvote').css("color"); 
        const black = "rgb(38, 38, 38)";
        const red = "rgb(255, 0, 0)";
        

        if (($("body").find(".nav_btns").children(":nth-child(4)").text()) == "LOG OUT") {
            if(siblingcolor != black){
                $(this).siblings('.upvote').attr("style", "color: " + black)
                addDownvote(this);
            }
    
            if(color == black){
                addDownvote(this)
                $(this).attr("style", "color: " + red)
            }
            else{
                removeDownvote(this);
                $(this).attr("style", "color: " + black)
            }
        }
        
        function removeDownvote(downvote){
            var like = $(downvote).siblings('.likes').text();
            $(downvote).siblings('.likes').text(parseInt(like) + 1);

            //Get the parent div of the upvote. This can either be a comment or post parent
            var parent = getParent(downvote);
            var isAPost = isPost(parent);

            var likes = {
                _id: parent.attr("id"),
                likes: $(downvote).siblings('.likes').text(),
                isPost: isAPost
            }

            console.log(likes);
            
            $.get("/removeDownvote", likes, function(data, status){})
        }
        
        function addDownvote(downvote){
            var like = $(downvote).siblings('.likes').text();
            $(downvote).siblings('.likes').text(parseInt(like) - 1);

            //Get the parent div of the upvote. This can either be a comment or post parent
            var parent = getParent(downvote);
            var isAPost = isPost(parent);

            var likes = {
                _id: parent.attr("id"),
                likes: $(downvote).siblings('.likes').text(),
                isPost: isAPost
            }

            console.log(likes);
            
            $.get("/addDownvote", likes, function(data, status){})
        }
    })

    $(".post-header").on('click', '#deletepost', function(e){
        const parent = $(this).parents(".post-container");
        
        var id = parent.attr("id");

        console.log(id);

        $.get("/deletePost", {postid: id}, function(status){
            if(status) parent.remove();
        })
    })

    function getParent(vote){
        var parentPost = $(vote).parents(".post-container");
        var parentComment = $(vote).parents(".first-tier");

        if(parentComment.length > 0){
            console.log(parentComment);
            return parentComment;
        }
        else if(parentPost.length > 0){
            console.log(parentPost);
            return parentPost;
        }
        else{
            console.log("Error, cannot find parent element");
            return;
        }
    }

    function isPost(parent){
        if(parent.attr("class") == "post-container"){
            return true;
        }
        else{
            return false;
        }

    }
})
