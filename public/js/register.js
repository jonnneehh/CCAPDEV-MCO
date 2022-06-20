$(document).ready(function () {
    const form = $("#reg_form")
    const user = $("#user")
    const email = $("#email")
    const pword = $("#pword")
    const cpword = $("#cpword")

    var us, em, pw, cpw

    
    user.on({
        focus: function() {
            setBoxDefault(user)
        },
        blur: function() {
            $.get("/findUser", {username: user.val().trim()}, function(data, status){
                if (user.val().trim() === '') {
                    setBoxRed(user)
                    $("#userError").text("Must not be empty.");
                    us = 0
                }
                else if(data){
                    setBoxRed(user)
                    $("#userError").text("Username is taken!");
                    us = 0
                }
                else {
                    setBoxGreen(user)
                    $("#userError").empty();
                    us = 1
                }
            })
        }
    })

    email.on({
        focus: function() {
            setBoxDefault(email)
        },
        blur: function() {
            if (email.val().trim() === '') {
                setBoxRed(email)
                $("#emailError").text("Must not be empty.")
                em = 0
            }
            else if (!(isEmail(email.val().trim()))) {
                setBoxRed(email)
                $("#emailError").text("Must be valid. e.g. abc@dlsu.edu.ph")
                em = 0
            }
            else {
                setBoxGreen(email)
                $("#emailError").empty();
                em = 1
            }
        }
    })

    pword.on({
        focus: function() {
            setBoxDefault(pword)
        },
        blur: function() {
            if (pword.val() === '') {
                setBoxRed(pword)
                $("#pwordError").text("Must not be empty.")
                pw = 0
            }
            else if (pword.val() !== cpword.val()) {
                setBoxRed(cpword)
                setBoxGreen(pword)
                $("#cpwordError").text("Password does not match.")
                pw = 1
                cpw = 0
            }
            else {
                setBoxGreen(pword)
                $("#pwordError").text("");
                pw = 1
            }
        }
    })

    cpword.on({
        focus: function() {
            setBoxDefault(cpword)
        },
        blur: function() {
            if (cpword.val() === '') {
                $("#cpwordError").text("Must not be empty.")
                setBoxRed(cpword)
                cpw = 0
            }
            else if (pword.val() !== cpword.val()) {
                setBoxRed(cpword)
                $("#cpwordError").text("Password does not match.")
                cpw = 0
            }
            else {
                setBoxGreen(cpword)
                $("#cpwordError").text("");
                cpw = 1
            }
    
        }
    }) 

    form.on("submit", function (e) { 
        checkInputs() 
        if(us && em && pw && cpw) getResult();
        // Prevents the form from submitting if there are errors
        else e.preventDefault();
    })

    function getResult() {

        $.get("/findUser", {username: user.val().trim()}, function(data, status){
            if(status == 'success'){
                console.log(data);
                alert("You have successfully registered");
            }
            else{
                console.log("Unable to register user...");
                alert("Could not properly register user...");
            }
        })
    }

    function checkInputs() {

        let inputs = [user, email, pword, cpword]
        let msgs = [$("#userError"), $("#emailError"), $("#pwordError"), $("#cpwordError")]

        let i = 0
        for (let x of inputs) {
            if (x.val().trim() === '') {
                setBoxRed(x)
                setErrorMsg(msgs[i])
            }
            else if (x === email) {
                if (!(isEmail(x.val().trim()))) {
                    setBoxRed(x)
                }
            }
            else if (x === cpword) {
                if (x.val().trim() !== pword.val().trim()) {
                    setBoxRed(x)
                }
            }
            i++
        }

    }

    function setErrorMsg(input_field) {
        input_field.text("Must not be empty.");
    }

    function setBoxRed(input_field) {
        input_field.css("background-color", "rgba(255, 0, 0, 0.41)")
    }

    function setBoxGreen(input_field) {
        input_field.css("background-color", "rgba(185, 247, 132, 0.85)")
    }

    function setBoxDefault(input_field) {
        input_field.css("background-color", "white")
    }

    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    }
});
