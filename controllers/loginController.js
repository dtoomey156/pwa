const loginView = (req, res) => {
    res.render("pages/login", {

    });
}

const registerView = (req, res) => {
    res.render("pages/register", {

    });
}




module.exports = {
    loginView,
    registerView
};