$(document).ready(()=>{

    $(".post-container").each(function (i){
        $(this).clone().attr('id', i).appendTo("body");
        $(this).remove();
    })

    $("#addcomment").click(function(){
        var comment = $("#add-comment").val();
        var user = "Anjit243"
        var iconsrc = "images/u-profile.png";
        
        var postid = $(this).closest(".post-container").attr("id");

        if(comment == ""){
            return;
        }
        
        $("#add-comment").val("");
        
        addComment(comment, user, iconsrc, postid);

        //Will be a problem if we change the layout of our comment section
        function addComment(comment, user, iconsrc, postid){
            $("#" + postid +" .comments-section").append(
                '<div class="first-tier">'+
					'<div class="comment-card">'+
						'<img class="comment-icon" src="'+iconsrc+'">'+
						'<span class="user-handle">'+user+'</h3>'+
					'</div>'+
					'<div class="comment-desc">'+
						'<span>'+comment+'</span>'+
					'</div>'+
					'<div class="comment-action">'+
						'<span class="upvote"><i class="fa-solid fa-chevron-up fa-lg"></i></span>'+
						'<span class="likes">0</span>'+
						'<span class="downvote"><i class="fa-solid fa-chevron-down fa-lg"></i></span>'+
						'<span class="comment"><i class="fa-solid fa-comments fa-lg"></i></span>'+
					'</div>'+
				'</div>'
            );
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