// These variables are for importing the necessary modules. They will use the endpoint of /api/comments.
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// Route to create a new comment associated with a specific post.
router.post('/newComment', withAuth, async (req, res) => {
  try {
    // Create a new comment with the post ID attached
    const newComment = await Comment.create({
      ...req.body,
      post_id: req.body.post_id,
      user_id: req.session.user_id, // Assuming you want to associate the comment with the logged-in user.
    });
    // Send the new serialized comment back as a JSON response.
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Exports the router.
module.exports = router;





// const express = require('express');
// const router = express.Router();
// const { Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

// // GET all comments
// router.get('/getcomment', async (req, res) => {
//   try {
//     const commentData = await Comment.findAll();
//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // POST a new comment (with authentication)
// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newComment = await Comment.create({
//       ...req.body,
//       userId: req.session.userId,
//     });
//     res.status(200).json(newComment);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // DELETE a comment (with authentication)
// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const commentData = await Comment.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!commentData) {
//       res.status(404).json({ message: 'No comment found with this id!' });
//       return;
//     }
//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;