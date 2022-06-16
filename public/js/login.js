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
        let username = user.val().trim()
        let password = pword.val().trim()


        // TODO: ADD 5 SAMPLE USERS
        
        // sample 1s
        if (username === 'sample' && password === '123') {
            $.get('/home', (data, status)=>{
                if(status == 'success') {
                    console.log("Logged in succesful")
                    window.location.href = "/home"
                }
                else console.log("Cannot log in.");
            });
        }
    }

    function setBoxRed(input_field) {
        input_field.css("background-color", "rgba(255, 0, 0, 0.41)")
    }

    function setBoxDefault(input_field) {
        input_field.css("background-color", "white")
    }
})