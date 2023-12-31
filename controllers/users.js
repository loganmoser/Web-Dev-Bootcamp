const User = require('../models/user');

module.exports.renderRegisterForm = (req,res)=>{
    res.render('users/register')
};

module.exports.registerUser = async(req,res, next)=>{
    try{
    const {email, username, password} = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err =>{
        if(err) return next(err);
        req.flash('success', 'Welcome to YelpCamp!');
        res.redirect('/campgrounds')
    });
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('register')
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render('users/login');
};

module.exports.loginUser = (req,res)=>{
    req.flash('Welcome back!');
    const returnUrl = req.session.returnTo || '/campgrounds';
    res.redirect(returnUrl);
};

module.exports.logoutUser = (req,res)=>{
    req.logout();
    req.flash('success', 'Logged out!')
    res.redirect('/campgrounds')
};