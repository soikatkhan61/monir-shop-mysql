const User = require('../models/user.model');


exports.bindUserWithRequest = () =>{
   
    return async (req,res,next) =>{
        console.log(req.session)
        if(!req.session.isLoggedIn){
            return next()
        }
        try{
            let user
            await User.findByEmail(req.session.email,(_,data)=>{
                if(data){
                    user = data
                }
            })
            req.user = user
            next()
        }catch(e){
            console.log(e)
            next(e)
        }

    }
}


exports.isAuthenticated = (req,res,next) =>{
    
    if(!req.session.isLoggedIn){
        return res.redirect('/auth/login')
    }
    next()
}

exports.isUnAuthenticated = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/dashboard')
    }

    next()
}

exports.checkAdmin = async(req,res,next) => {
    
    if(req.user != undefined){
        try{
            let user = await User.findById(req.session.user._id)
            if(user.userType == "admin"){
                return next()
            }else{
                res.send("you are not admin")
            }
            
        }catch(e){
            console.log(e)
            next(e)
        }
    }
}