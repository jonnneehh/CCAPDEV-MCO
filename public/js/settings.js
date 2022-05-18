$(document).ready(function () {
    $('#save_signindetails').click(()=>{
        var email = $('#email');
        var pword = $('#pword');
        var newpword = $('#newpword');
        var cnewpword = $('#cnewpword');

        //Code that changes the email and password

        //Clears the textboxes
        email.val("");
        pword.val("");
        newpword.val("");
        cnewpword.val("");
    })

    $('#save_information').click(()=>{
        var username = $('#username');
        var about = $('#about');

        //Code that changes the username and about

        //Clears the textboxes
        username.val("");
        about.val("");
    })

    $('#save_displayphoto').click(()=>{
        var fd = new FormData();
        var files = $('#fileupload')[0].files;
        
        // Check file selected or not
        if(files.length > 0 ){
           fd.append('file',files[0]);

           $.ajax({
              url: 'upload.php',
              type: 'post',
              data: fd,
              contentType: false,
              processData: false,
              success: function(response){
                 if(response != 0){
                    $("#displayphoto").attr("src",response); 
                    $(".preview img").show(); // Display image element
                 }else{
                    alert('file not uploaded');
                 }
              },
           });
        }else{
           alert("Please select a file.");
        }
    })
})