$(document).ready(function () {
    const form = $("#login_form")
    const user = $("#username")
    const pword = $("#password")

    user.on("focus", function (e) { 
        //e.preventDefault()
        setBoxDefault(user)
    })

    pword.on("focus", function (e) {
        //e.preventDefault()
        setBoxDefault(pword)
    })

    form.on("submit", function (e) { 
        checkInputs()
        //getResult()
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
        
        /*$.get('/login', userdata, (data, status)=>{
            if(data){
                $.get('/', (data, status)=>{
                    if(status == 'success') {
                        $("#login_pwordError").html("");
                        window.location.href = "/"
                    }
                    else console.log("Cannot log in.");
                });
            }
            //else alert("Cannot Login: Username or Password is Incorrect...");
            else $("#login_pwordError").html("Login failed: <br>Incorrect username or password. ");
        }) */

        console.log("Login status " + success);
    }

    function setBoxRed(input_field) {
        input_field.css("background-color", "rgba(255, 0, 0, 0.41)")
    }

    function setBoxDefault(input_field) {
        input_field.css("background-color", "white")
    }
})
