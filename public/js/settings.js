$(document).ready(function () {
    const user = $("#username")
    const pword = $("#password")
    const newpword = $("#newpword")
    const cnewpword = $("#cnewpword")

    const info_form = $("#information-form")
    const email = $("#email")
    const about = $("#about")

    const submit_username = $("#save-username");
    const submit_password = $("#save-password");
    const submit_Info = $("#save_information");

    submit_username.prop('disabled', true);
    submit_password.prop('disabled', true);
    submit_Info.prop('disabled', true);
    newpword.prop('disabled', true)
    cnewpword.prop('disabled', true)

    //Change sign-in details functions (username and password)
    user.on({
        focus: function() {
            setBoxDefault(user)
        },
        blur: function() {
            $.get("/findUser", {username: user.val().trim()}, function(data, status){
                if(data){
                    setBoxRed(user)
                    $("#save-username").prop('disabled', true);
                }
                else {
                    setBoxDefault(user)
                    $("#save-username").prop('disabled', false);
                }
            })
        }
    })

    pword.on({
        focus: function() {
            setBoxDefault(pword)
        },
        blur: function() {
            if(pword.val() != ''){
                newpword.prop('disabled', false)
                cnewpword.prop('disabled', false)

            }
        }
    }) 

    newpword.on({
        focus: function() {
            setBoxDefault(newpword)
        },
        blur: function() {
            if (newpword.val() == '') {
                setBoxRed(newpword)
                $("#save-password").prop('disabled', true);
            }
            else {
                setBoxDefault(newpword)
                $("#save-password").prop('disabled', false);
            }
        }
    }) 
    
    cnewpword.on({
        focus: function() {
            setBoxDefault(cnewpword)
        },
        blur: function() {
            if (newpword.val() !== cnewpword.val() || cnewpword.val() == '') {
                setBoxRed(cnewpword)
                $("#save_signindetails").prop('disabled', true);
            }
            else {
                setBoxDefault(cnewpword)
                $("#save_signindetails").prop('disabled', false);
            }
        }
    })

    //Change information functions (email and about)
    email.on({
        focus: function() {
            setBoxDefault(email)
        },
        blur: function() {
            if (email.val().trim() == '') {
                $("#save_information").prop('disabled', true);
            }
            else if (!(isEmail(email.val().trim()))) {
                setBoxRed(email);
                $("#save_information").prop('disabled', true);
            }
            else {
                $("#save_information").prop('disabled', false);
            }
        }
    })

    about.on({
        focus: function() {
            setBoxDefault(about)
        },
        blur: function() {
            if (about.val() == '') {
                $("#save_information").prop('disabled', true);
            }
            else {
                $("#save_information").prop('disabled', false);
            }
        }
    })

    info_form.submit(function(e){
        e.preventDefault();
        if (email.val().trim() != '') 
            changeEmail()
        if (about.val() != '') 
            changeAbout()
        clearInfoTextbox();
    })

    function changeEmail(){
        $.get('/changeEmail', {email: email.val().trim()}, function(data, status){
            if(data) alert("Email changed succesfully!");
            else alert("Error: Could not change your email");
        })
    }
    
    function changeAbout(){
        $.get('/changeAbout', {bio: about.val()}, function(data, status){
            if(data) alert("Your about bio was changed succesfully!");
            else alert("Error: Could not change your about bio");
        })
    }

    function clearInfoTextbox(){
        email.val('');
        about.val('');
    }

    //Change Display Photo Functions
    $("#dp_upload").change(function (event) { 
        let x = URL.createObjectURL(event.target.files[0])
        $("#displayphoto").attr("src", x)
    })

    //Utility Functions
    function setBoxRed(input_field) {
        input_field.css("background-color", "rgba(255, 0, 0, 0.41)")
    }

    function setBoxDefault(input_field) {
        input_field.css("background-color", "white")
    }

    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    }
})
