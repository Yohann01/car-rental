exports.getHomepage = async (req, res) => {
    res.render('index');
};

exports.getSignIn = async (req, res) => {
    res.render('login');
}
exports.getSignUp = async (req, res) => {
    res.render('signup');
}
exports.getAbout= async (req, res) => {
    res.render('about', {layout: './layouts/about-contact-main'});
}
exports.getContact = async (req, res) => {
    res.render('contact', {layout: './layouts/about-contact-main'});
}

