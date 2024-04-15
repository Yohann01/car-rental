exports.getHomepage = async (req, res) => {
    res.render('index');
};

exports.getSignIn = async (req, res) => {
    res.render('login');
}
exports.getSignUp = async (req, res) => {
    res.render('signup');
}

