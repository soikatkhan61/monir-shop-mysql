const authRoute = require("./auth.route")
const adminRoute = require("./adminRoute")
const dashboardRoute = require("./dashboardRoute")


//import home page controller
const {renderHome} = require('../controllers/home.controller')

console.log("ami route a")
const routes = [

    {
        path: "/auth",
        handler: authRoute
    },
    
    {
        path: "/dashboard",
        handler: dashboardRoute
    },
    {
        path: "/admin",
        handler: adminRoute
    },

    {
        path: "/",
        handler: renderHome
    }
]


module.exports = app =>{
    routes.forEach(r =>{
        if(r.path === '/'){
            app.get('/',r.handler)
        }else{
            app.use(r.path, r.handler)
        }
    })
}