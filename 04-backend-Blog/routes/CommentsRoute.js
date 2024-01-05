const { createCommentCtrl, getAllCommentsCtrl, deleteCommentCtrl, updateCommentCtrl } = require('../controllers/CommentsController');
const { verifyToken, verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const validateObjectID = require('../middlewares/validateObjectID');
const router = require('express').Router();



router.route("/")
.post(verifyToken, createCommentCtrl)
.get(verifyTokenAndAdmin, getAllCommentsCtrl)

//  api/comments/:id
router.route("/:id")
.delete(validateObjectID, 
    verifyToken,
     deleteCommentCtrl)
     .put(validateObjectID, verifyToken,
        updateCommentCtrl)

module.exports = router;