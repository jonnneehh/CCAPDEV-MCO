$(document).ready(function () {
    const search = $("#search_bar");

    search.on({
        keyup: function (e) {
            $.get("/searchUser", {username: search.val().trim()}, function (data, status) {
                if (search.val().trim() === '') {
                    setBoxDefault(search)
                }
                else if (data) {
                    setBoxGreen(search)
                    if(e.which == 13){
                        var url = "../profile/" + search.val().trim();
                        window.location = url;
                    }
                }   
                else {
                    setBoxRed(search)
                }
            })
        }
    })

    function setBoxRed(input_field) {
        input_field.css("background-color", "rgba(255, 0, 0, 0.41)")
    }

    function setBoxGreen(input_field) {
        input_field.css("background-color", "rgba(185, 247, 132, 0.85)")
    }

    function setBoxDefault(input_field) {
        input_field.css("background-color", "white")
    }

}) 