const loginController = {
    getRegister: function(req, res){
        res.render('register');
    },

    getHome: function(req, res){
        res.render('home');
    }
}

export default loginController;