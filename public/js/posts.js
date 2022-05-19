$(document).ready(()=>{

    $(".post-container").each(function (i){
        $(this).clone().attr('id', i).appendTo("body");
        $(this).remove();
    })

    $("#addcomment").click(()=>{
        var comment = $("#add-comment").val();
        var user = "Anjit243"
        var iconsrc = "images/u-profile.png";
        
        var postid = $('#addcomment').closest(".post-container").attr("id");
        console.log(postid);

        if(comment == ""){
            return;
        }
        
        $("#add-comment").val("");
        
        addComment(comment, user, iconsrc, postid);

        //Will be a problem if we change the layout of our comment section
        function addComment(comment, user, iconsrc, postid){
            $("#" + postid +" .comments-section").append(
                '<div class="first-tier">' +
					'<div class=\"comment-card\">' +
						'<img class=\"comment-icon\" src='+ iconsrc +'>' +
						'<span class=\"user-handle">'+ user +'</h3>' +	
					'</div>' +	
					'<div class=\"comment-desc\">' +
						'<span>'+ comment +'</span>' +
					'</div>' +
					'<div class=\"comment-action\">' +
						'<i class=\"fa-solid fa-chevron-up fa-lg\"></i>' +
						'<span class=\"comment-likes\">0</span>' +
						'<i class=\"fa-solid fa-chevron-down fa-lg\"></i>' +
						'<i class=\"fa-solid fa-comments fa-lg\"></i>' +
					'</div>' +
				'</div>'
            );
        }
    })

    $("#cancelcomment").click(()=>{
        $("#add-comment").val("");
    })
})