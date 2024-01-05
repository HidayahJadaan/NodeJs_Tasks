const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const {
  Post,
  ValidateCreatePost,
  ValidateUpdatePost,
} = require("../models/Post");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");

const {Comment} = require('../models/Comment')
/**--------------------------
* @desc Create New Post
* @route /api/posts
* @method POST
* @access private (only logged in user)
-----------------------------*/

module.exports.createPostCtrl = asyncHandler(async (req, res) => {
  // 1. Validation For Image
  // 2. Validation For Data
  // 3. Upload Photo
  // 4. Create New Post And Save It To DB
  // 5. Send Response To The Client
  // 6. Remove Image Form The Server

  // STEP 1:

  if (!req.file) {
    return res.status(400).json({ message: "No Image Provided" });
  }

  // STEP 2:
  const { error } = ValidateCreatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // STEP 3:
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  // STEP 4:
  // const post = new Post({
  //     title: req.body.title,

  // });

  // await post.save();

  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  // STEP 5:

  res.status(200).json(post);

  // STEP 6:
  fs.unlinkSync(imagePath);
});

/**--------------------------
* @desc Get All Posts
* @route /api/posts
* @method GET
* @access public
-----------------------------*/

module.exports.getAllPostsCtrl = asyncHandler(async (req, res) => {
  const POSTS_PER_PAGE = 3;
  const { pageNumber, category } = req.query;

  let posts;
  // GET ==>  127.0.0.1:8000/api/posts?pageNumber=1
  if (pageNumber) {
    posts = await Post.find()
      .skip((pageNumber - 1) * POSTS_PER_PAGE)
      .limit(POSTS_PER_PAGE)
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }
  // GET ==> 127.0.0.1:8000/api/posts?category=Technology
  else if (category) {
    posts = await Post.find({ category: category })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }
  // GET ==> 127.0.0.1:8000/api/posts
  else {
    // posts= await Post.find()
    // posts= await Post.find().sort({createdAt: -1})

    // To View User Data (without his password) Not His Id When I See Posts
    posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }

  res.status(200).json(posts);
});

/**--------------------------
* @desc Get Single Post
* @route /api/posts/:id
* @method GET
* @access public
-----------------------------*/

module.exports.getSinglePostsCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user", [
    "-password",
  ]).populate("comments");

  if (!post) {
    return res.status(404).json({ message: "No post found" });
  }

  res.status(200).json(post);
});

/**--------------------------
* @desc Get Post Count
* @route /api/posts/:id
* @method GET
* @access public
-----------------------------*/

module.exports.getPostCountCtrl = asyncHandler(async (req, res) => {
  const postCount = await Post.countDocuments();

  res.status(200).json(postCount);
});

/**--------------------------
* @desc Delete Post
* @route /api/posts/:id
* @method DELETE
* @access private(only admin or owner of the post)
-----------------------------*/

module.exports.deletePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: " Post Not Found" });
  }
  if (req.user.isAdmin || req.user.id === post.user.toString()) {
    await Post.findByIdAndDelete(req.params.id);
    await cloudinaryRemoveImage(post.image.publicId);

    // DELETE COMMENTS

    await Comment.deleteMany({
      postId: post._id,

    });
    

    res.status(200).json({
      message: "Post Has Been Deleted Successfully",
      postId: post._id,
    });
  } else {
    res.status(403).json({ message: "Access Denied", postId: post._id });
  }
});

/**--------------------------
* @desc  Update Post
* @route /api/posts/:id
* @method PUT
* @access private(only owner of the post)
-----------------------------*/

module.exports.updatePostCtrl = asyncHandler(async (req, res) => {
  // 1. Validation
  const { error } = ValidateUpdatePost(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // 2. Check if the post exists in DB

  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post Not Found" });
  }
  //  3. Check if the post is for this user(authorization)

  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "Access Denied, You Are Not Alllowed!!" });
  }

  // 4. Update The Post
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true }
  ).populate("user", ["-password"]);

  // 5. Send Response

  res.status(200).json(updatedPost);
});

/**--------------------------
* @desc  Update Post Image
* @route /api/posts/upload-image/:id
* @method PUT
* @access private(only owner of the post)
-----------------------------*/

module.exports.updatePostImageCtrl = asyncHandler(async (req, res) => {
  // 1. Validation

  if (!req.file) {
    return res.status(400).json({ message: "No Image Provided" });
  }

  // 2. Check if the post exists in DB

  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post Not Found" });
  }
  //  3. Check if the post is for this user(authorization)

  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "Access Denied, You Are Not Alllowed!!" });
  }

  // 4. Delete Old Image
  await cloudinaryRemoveImage(post.image.publicId);

  // 5. Upload New Image
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  // 6. Update The Post Image Feild In The DB
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      },
    },
    { new: true }
  );

  // 7. Send Response
  res.status(200).json(updatedPost);

  //   8. Remove Image from The Server
  fs.unlinkSync(imagePath);
});

/**--------------------------
* @desc  Toggle Like
* @route /api/posts/like/:id
* @method PUT
* @access private(only logged in user)
-----------------------------*/
module.exports.toggleLikeCtrl = asyncHandler(async (req, res) => {
  const loggedInUser = req.user.id;
  const { id: postId } = req.params;
  let post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ message: "Post Not Found" });
  }
  const isPostAlreadyLikes = post.likes.find(
    (user) => user.toString() === loggedInUser);

    if(isPostAlreadyLikes){
        // pull --> Remvoe From The Array
        post = await Post.findByIdAndUpdate(postId,{
            $pull:{
                likes: loggedInUser
            }
        }, {new: true});
    }
    else{
        // push --> Add To The Array
        post = await Post.findByIdAndUpdate(postId,{
            $push:{
                likes: loggedInUser
            }
        }, {new: true});
    }

    res.status(200).json(post);
});
