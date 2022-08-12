const router = require("express").Router()

const {
    adminHome
} = require("../controllers/admin/adminController")

const {
    addProductGetController,allProductGetController
} = require("../controllers/product/productCrud")

const {categoryGetController,addNewCategoryController,deleteCategoryController} = require("../controllers/product/categoryController")

const {
    isUnAuthenticated,
    isAuthenticated,
    checkAdmin
} = require('../middlewares/authMiddleware')

router.get("/add-product",addProductGetController)


router.get("/category",categoryGetController)
router.post("/add-category",addNewCategoryController)
router.post("/category/delete",deleteCategoryController)

router.get("/products",allProductGetController)

router.get('/',adminHome)



module.exports = router