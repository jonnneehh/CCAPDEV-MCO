const controller = {
    getFavicon: function (req, res) {
        res.status(204);
    },  

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `index.hbs` with all
            transactions currently stored in the database.
    */
    getIndex: function(req, res) {
        res.render('login');
    },
}
export default controller;