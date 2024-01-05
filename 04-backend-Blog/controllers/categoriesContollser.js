const asyncHandler = require("express-async-handler");
const { Category,
    validateCreateCategory} = require('../models/Category');
/**--------------------------
* @desc Create a new category
* @route /api/categories
* @method POST
* @access private (only admin)
-----------------------------*/
module.exports.createCategoryCtrl = asyncHandler(async(req,res)=>{
const {error} = validateCreateCategory(req.body);
if(error){
    return res.status(400).json({message: error.details[0].message});
}

const category = await Category.create({
    title: req.body.title,
    user: req.user.id
})
return res.status(200).json(category);



});

/**--------------------------
* @desc Get All  categories
* @route /api/categories
* @method GET
* @access public
-----------------------------*/
module.exports.getAllCategoriesCtrl = asyncHandler(async(req,res)=>{
   
    const categories = await Category.find();

    res.status(200).json(categories);
    });

    /**--------------------------
* @desc Delete Category
* @route /api/categories/:id
* @method Delete
* @access private (only admin)
-----------------------------*/
module.exports.deleteCategoryCtrl = asyncHandler(async(req,res)=>{
   
const category = await Category.findById(req.params.id);

if(!category){

    res.status(404).json({message: "Category Not FOUND !!"});
}
await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({message:
    "Category deleted successfully",
    categoryId: category._id
    });
    
    });
    
    
