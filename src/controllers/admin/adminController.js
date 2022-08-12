exports.adminHome = async(req,res,next) =>{

    try {
        res.render("admin/index")
    } catch (error) {
        console.log(error)
    }
   
}