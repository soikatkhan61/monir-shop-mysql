const User = require('../models/user.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');

exports.renderSignUp = (req,res,next) =>{
    console.log(req.session)
    res.render("pages/auth/sign-up",{flashMessage:""})
}

exports.signup = (req, res) => {

    const { firstname, lastname, email, password,c_password } = req.body;

    const hashedPassword = hashPassword(password.trim());

    const user = new User(firstname.trim(), lastname.trim(), email.trim(), hashedPassword);

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            const token = generateToken(data.id);
            res.status(201).send({
                status: "success",
                data: {
                    token,
                    data
                }
            });
        }
    });
};

exports.renderSignIn = (req,res,next) =>{
  
    res.render("pages/auth/signin",{flashMessage:""})
}

exports.signin = (req, res) => {
   
    const { email, password } = req.body;
    User.findByEmail(email.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            if (comparePassword(password.trim(), data.password)) {

                const token = generateToken(data.id);
              
                req.session.isLoggedIn = true
                req.session.email = data.email
                req.session.user = data
                req.session.save(err=>{
                     if(err){
                         console.log(err)
                         return next(err)
                     }
                    })
               return res.redirect("/dashboard")
            }

            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
    });

}

exports.logoutController = (req,res,next) =>{
    req.session.destroy(err =>{
        if(err){
            return next(err)
        }
        return res.redirect('/auth/login')
    })
}