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
       
    })
})