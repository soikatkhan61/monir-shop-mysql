const db = require("../../config/db.config")

exports.categoryGetController = async (req, res, next) => {

    let sql = "SELECT * FROM categories"
    db.query(sql,(e,rows)=>{
        if(e){
            console.log(e)
        }
        else if(rows.length> 0){
           let categories = rows
           for(let cat of categories){
            console.log(cat.category_name)
           }
           res.render("admin/pages/product/category",{title: "Add new category", msg:"",categories})
        }
    })
}

exports.addNewCategoryController = async (req, res, next) => {

    let {category} = req.body
    
    try {


        let sql = `SELECT * FROM categories where category_name='${category}'`
        db.query(sql, (e, rows) => {
        console.log(rows)
        if (e) {
            console.log(e)
        }
        if (rows.length > 0) {
            return res.render("admin/pages/product/category",{title: "Add new category", msg:"Category alread exists!"})
        }
        })

        let create_category = `INSERT INTO categories(category_name) VALUES ('${category}')`
        db.query(create_category,(e,rows)=>{
                if(e){
                    console.log(e)
                }else{
                    res.render("admin/pages/product/category",{title: "Add new category", msg:""})
                }
        })
    

        // let categoryObj = new Category({category})
        // let createdCategory =  categoryObj.save()
        // res.redirect('/admin/category')

    } catch (error) {
        console.log(error)
    }
}

exports.deleteCategoryController = async (req, res, next) => {

    let {cat_id} = req.body

    try {
        await db.query(`DELETE FROM categories WHERE id=${cat_id}`,(e,rows)=>{
            if(e){
                console.log(e)
            }
        })
        res.redirect('/admin/category')

    } catch (error) {
        console.log(error)
    }
}



