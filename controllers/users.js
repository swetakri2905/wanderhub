const User = require("../models/user");

module.exports.renderSignupForm = (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req,res)=>{
    try{
    let {username , email , password} = req.body; //destructing these info from frontened
    const newUser = new User({ email , username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => { //req.login is a passport method which automatically login as we signup
        if(err) {
            return next(err);
        }
        req.flash("success","Welcome to WanderLust");
        res.redirect("/listings");
    });
   
    } catch(e){
       req.flash("error", e.message);
       res.redirect("/signup"); 
    }
};

module.exports.renderLoginForm = (req,res) =>{
    res.render("users/login.ejs");
};

module.exports.Login = async(req,res)=>{
    req.flash("success","Welcome back to WanderLust");
     let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.Logout =  (req,res,next)=>{
    req.logout((err)=>{ //method of passport in which callback is called immediately logged out
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })
};