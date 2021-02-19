// required because it's a route that is being created
const router = require('express').Router();
// uses the User model
let User = require('../models/user.model');

// handles get http requests
router.route('/').get((req, res) => {
    // '.find()' is a mongoose command
    User.find()
        // returns the users in json format
        .then(users => res.json(users))
        // return if there is an error
        .catch(err => res.status(400).json('Error: ' + err));
});

// handles post http requests.  POST on Postman: http://localhost:5000/user/add
router.route('/add').post((req, res) => {
    const username = req.body.username;
    //create new instance of user
    const newUser = new User({ username });
    //save user to db
    newUser.save()
        // return 
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// export router
module.exports = router;