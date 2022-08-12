const db = require("../../config/db.config")
const { validationResult } = require("express-validator");
const errorFormatter = require("../../utils/validationErrorFormatter");

exports.addProductGetController = async (req, res, next) => {

  db.query("select * from categories;",(e,results)=>{
      if(results.length > 0){
        let errors = validationResult(req).formatWith(errorFormatter);
  
        res.render("admin/pages/product/add-product", {
          title: "Add Product",
          error: errors.mapped(),
          value: {},
          categories:results,
          slugError: "",
          customError:"",
          category:""
        });
      }
  })

  };
  exports.addProductPostController = async (req, res, next) => {
    let {
      product_name,
      category,
      old_price,
      new_price,
      product_desc,
      product_image,
    } = req.body;
  
    let customError = ''
    if(parseInt(old_price) < parseInt(new_price)){
     customError = "Old price cannot be greater than new price"
    }
  
    let errors = validationResult(req).formatWith(errorFormatter);
  
    if (!errors.isEmpty() || (parseInt(old_price) < parseInt(new_price))) {
      fs.unlink(`./${req.file.path}`, function (err) {
        if (err && err.code == "ENOENT") {
          // file doens't exist
          console.info("File doesn't exist, won't remove it.");
        } else if (err) {
          // other errors, e.g. maybe we don't have enough permission
          console.error("Error occurred while trying to remove file");
        } else {
          console.info(`removed`);
        }
      });
  
      console.log("im here 3434")
  
      let categories = await Category.find();
      return res.render("admin/pages/product/add-product", {
        title: "Add Product",
        error: errors.mapped(),
        value: {
          product_name,
          old_price,
          new_price,
          product_desc,
          category,
        },
        categories,
        slugError: "",
        customError,
        category
      });
    }
  
    let slug = slugify(product_name, {
      replacement: "-",
      lower: true,
      strict: true,
      trim: true,
    });
  
    let checkSlugExists = await Product.findOne({ slug });
  
    console.log(req.file);
  
    if (checkSlugExists) {
      fs.unlink(`./${req.file.path}`, function (err) {
        if (err && err.code == "ENOENT") {
          // file doens't exist
          console.info("File doesn't exist, won't remove it.");
        } else if (err) {
          // other errors, e.g. maybe we don't have enough permission
          console.error("Error occurred while trying to remove file");
        } else {
          console.info(`removed`);
        }
      });
      let categories = await Category.find();
      return res.render("admin/pages/product/add-product", {
        title: "Add Product",
        error: errors.mapped(),
        value: {
          product_name,
          old_price,
          new_price,
          product_desc,
          slug,
          category,
        },
        categories,
        slugError: "Product name exists, try different name",
        customError,
        category
      });
    }
  
    let product = new Product({
      product_name,
      slug,
      category,
      old_price,
      new_price,
      product_desc,
      product_image,
    });
  
    if (req.file) {
      product.product_image = `/uploads/${req.file.filename}`;
    }
  
    try {
      let createdProduct = await product.save();
      let findCategory = await Category.findOne({ category });
  
      console.log(findCategory)
      await Category.findOneAndUpdate(
        { _id: findCategory._id },
        { $push: { products: createdProduct._id } }
      );
      res.redirect("/admin/products");
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  

  exports.allProductGetController = async (req, res, next) => {
    try {
      db.query("select * from products",(e,rows)=>{
        if(e){
          console.log(e)
        }else{
          res.render("admin/pages/product/all-product-admin", { products:rows });
        }
      })
  
      
    } catch (error) {
      console.log(error);
      next(error);
    }
  };