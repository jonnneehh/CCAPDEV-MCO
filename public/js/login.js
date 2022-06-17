$(document).ready(function () {
    const form = $("#login_form")
    const user = $("#user")
    const pword = $("#pword")

    user.focus(function (e) { 
        e.preventDefault()
        setBoxDefault(user)
    })

    pword.focus(function (e) {
        e.preventDefault()
        setBoxDefault(pword)
    })

    form.submit(function (e) { 
        e.preventDefault()
        checkInputs()
        getResult()
    })

    function checkInputs() {
        let inputs = [user, pword]

        for (let x of inputs) {
            if (x.val().trim() === '') {
                setBoxRed(x)
            }
        }
    }

    function getResult() {
        var success = false;
        var userdata = {
            username: user.val().trim(),
            password: pword.val()
        }
        
        $.get('/loginUser', userdata, (data, status)=>{
            if(data){
                $.get('/home', (data, status)=>{
                    if(status == 'success') {
                        window.location.href = "/home"
                    }
                    else console.log("Cannot log in.");
                });
            }
            else alert("Cannot Login: Username or Password is Incorrect...");
        })

        console.log("Login status " + success);
    }

    function setBoxRed(input_field) {
        input_field.css("background-color", "rgba(255, 0, 0, 0.41)")
    }

    function setBoxDefault(input_field) {
        input_field.css("background-color", "white")
    }
})