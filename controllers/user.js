// include library
const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// import user model
const User = require('../models/user');


// middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// defualt route 
// method : get
// url    : /api/user
router.get(
    '/',
    function (req, res) {
        return res.json({
            status: true,
            message: 'hello im the default route for user....'
        });
    }
);


// create new user
// method :post 
// url :'/api/user/create
router.post(
    '/create',
    // validation
    [
        check('username').not().isEmpty().trim().escape(),
        check('password').not().isEmpty().trim().escape(),
        check('email').isEmail().normalizeEmail(),
    ],
    function (req, res) {

        // check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                message: 'form validation error',
                error: errors.array()
            });
        }

        // hash password 
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        // User.create(
        //     {
        //         username: req.body.username,
        //         email: req.body.email,
        //         password:hashedPassword
        //     }, function (error, result) {
        //         if (error) {
        //             return res.status(500).json({
        //                 status: false,
        //                 message: 'Insert failed ....', 
        //                 error:error
        //             })
        //         }
        //         return res.status(201).json({
        //             status: true,
        //             message: 'DB insert success....', 
        //             data:result
        //         })
        //     }
        // );
        var temp = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        // save the data 
        temp.save(function (error, result) {
            if (error) {
                return res.status(500).json({
                    status: false,
                    message: "unabled to insert..",
                    error: error
                })
            }
            // okk
            return res.status(201).json({
                status: true,
                message: "inserted success..",
                data: result
            })
        })
    }
);


// get all user   
// method:get
// url:/api/user

router.get(
    '/find',
    function (req, res) {
        User.find({ email: req.query.email },function (error, result) {
            if (error) {
                return res.status(500).json({
                    status: false,
                    message: "server error",
                    error: error
                });
            }
            return res.status(200).json({
                status: false,
                message: "okk ",
                date:result
            })
        })
    }

);
module.exports = router;