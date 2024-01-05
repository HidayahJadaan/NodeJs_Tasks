const router = require('express').Router();
const { createCategoryCtrl, getAllCategoriesCtrl, deleteCategoryCtrl } = require('../controllers/categoriesContollser');
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken')
const validateObjectID = require('../middlewares/validateObjectID');

//  api/categories

router.route("/")
.post(verifyTokenAndAdmin, createCategoryCtrl)
.get(getAllCategoriesCtrl)

// api/categories/:id
router.route("/:id").delete(validateObjectID, verifyTokenAndAdmin, deleteCategoryCtrl)
module.exports = router;
