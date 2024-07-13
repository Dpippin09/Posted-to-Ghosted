// These variables are for importing the necessary modules, and the endpoints will use the /api/User route.
const router = require('express').Router();
const { User } = require('../../models');
// Route to get all User and exclude the password column.
router.get('/', async (_, res) => {
  try {
    // The user data is found using the findAll method excluding the password column.
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// route to create a new user and create a session for the user using the session middleware.
router.post('/', async (req, res) => {
  try {
    // The user data is created using the create method.
    const userData = await User.create(req.body);
    // The user_id and logged_in properties are set on the session object.
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      // The user data is sent back as a JSON response.
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// Route to login a user and create a session for the user.
router.post('/login', async (req, res) => {
  try {
    // The user data is found using the findOne method.
    const userData = await User.findOne({ where: { username: req.body.username } });
    // If the user data does not exist, a 400 status code is sent back to the client.
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    // The checkPassword method is called on the user data object to verify the password.
    const validPassword = await userData.checkPassword(req.body.password);
    // If the password is incorrect, a 400 status code is sent back to the client.
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    // The user_id and logged_in properties are set on the session object.
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      // A 200 status code is sent back to the client along with the user data.
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// Route to logout a user and destroy the session.
router.post('/logout', async (req, res) => {
  try {
    // The session is destroyed using the destroy method.
    req.session.destroy(() => {
      // A 204 status code is sent back to the client.
      res.status(204).end();
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Exports the router.
module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { User } = require('../../models');
// const withAuth = require('../../utils/auth');

// // POST register a new user
// router.post('/register', async (req, res) => {
//   console.log(req.body);
//   try {
//     const newUser = await User.create(req.body);
//     req.session.save(() => {
//       req.session.userId = newUser.id;
//       req.session.username = newUser.username;
//       req.session.loggedIn = true;

//       res.status(200).json(newUser);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // POST login
// router.post('/login', async (req, res) => {
//   try {
//     const user = await User.findOne({ where: { email: req.body.email } });
//     if (!user) {
//       res.status(400).json({ message: 'No user account found!' });
//       return;
//     }

//     const validPassword = await user.checkPassword(req.body.password);
//     if (!validPassword) {
//       res.status(400).json({ message: 'Incorrect password!' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.userId = user.id;
//       req.session.username = user.username;
//       req.session.loggedIn = true;

//       res.json({ user: user, message: 'You are now logged in!' });
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // POST logout
// router.post('/logout', (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// // PUT update a user's profile (with authentication)
// router.put('/:id', withAuth, async (req, res) => {
//   try {
//     const userData = await User.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!userData[0]) {
//       res.status(404).json({ message: 'No user found with this id!' });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;