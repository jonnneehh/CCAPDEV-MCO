$(document).ready(function () {

    $("#content").change(function (e) { 
         let x = URL.createObjectURL(e.target.files[0])
         $("#preview").attr("src", x)
    })
});