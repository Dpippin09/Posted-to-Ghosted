 const router = require('express').Router();

 const userRoutes = require('./user-routes');
// const homeRoutes = require('./home-routes');

 router.use('/user', userRoutes);
// router.use('/api', apiRoutes);

const postRoutes = require('./post-routes');

router.use('/post', postRoutes);

const commentRoutes = require('./comment-routes');

router.use('/comment', commentRoutes);

 module.exports = router;