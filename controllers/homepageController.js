exports.getHomepage = async (req, res) => {
    res.render('index');
};

exports.getSignIn = async (req, res) => {
    res.render('signin');
}
exports.getSignUp = async (req, res) => {
    res.render('signup');
}