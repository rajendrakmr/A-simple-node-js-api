// include library
const router = require("express").Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

// import user model
const User = require("../models/user");

// middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// defualt route
// method : get
// url    : /api/user
router.get("/", function (req, res) {
  User.find(function (error, result) {
    if (error) {
      return res.status(500).json({
        status: false,
        message: "server error",
        error: error,
      });
    }
    return res.status(200).json({
      status: false,
      message: "okk ",
      data: result,
    });
  });
});

// create new user
// method :post
// url :'/api/user/create
router.post(
  "/create",
  // validation
  [
    check("username").not().isEmpty().trim().escape(),
    check("password").not().isEmpty().trim().escape(),
    check("email").isEmail().normalizeEmail(),
  ],
  function (req, res) {
    // check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: false,
        message: "form validation error",
        error: errors.array(),
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
      password: hashedPassword,
    });

    // save the data
    temp.save(function (error, result) {
      if (error) {
        return res.status(500).json({
          status: false,
          message: "unabled to insert..",
          error: error,
        });
      }
      // okk
      return res.status(201).json({
        status: true,
        message: "inserted success..",
        data: result,
      });
    });
  }
);

// get all user
// method:get
// url:/api/user
router.get("/find", function (req, res) {
  User.find(function (error, result) {
    if (error) {
      return res.status(500).json({
        status: false,
        message: "server error",
        error: error,
      });
    }
    return res.status(200).json({
      status: false,
      message: "okk ",
      date: result,
    });
  });
});

// update user
// method:get
// url:/api/user/update

router.put(
  "/update/:email",
  [
    check("username").not().isEmpty().trim().escape(),
    check("email").isEmail().normalizeEmail(),
  ],
  function (req, res) {
    User.update(
      { email: req.params.email },
      {
        username: req.body.username,
      },
      function (error, result) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({
            status: false,
            message: "form validation error",
            error: errors.array(),
          });
        }
        if (error) {
          return res.json({
            status: false,
            message: "DB failed..",
            error: error,
          });
        }
        return res.json({
          status: true,
          message: "succes update",
          data: result,
        });
      }
    );
  }
);

// delete user
// method:get
// url:/api/user/id

router.delete(
  "/:id",
  [check("id").not().isEmpty().trim().escape()],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: false,
        error: errors,
      });
    }
    User.remove(
      { _id: req.params.id },
      // check validation
      function (error, result) {
        if (error) {
          return res.json({
            status: false,
            message: "DB failed..",
            error: error,
          });
        }
        return res.json({
          status: true,
          message: "succes deleted",
          data: result,
        });
      }
    );
  }
);

// login api
// method : post
// url: /api/user/login
router.post(
  "/login",
  [
    check("password").not().isEmpty().trim().escape(),
    check("email").isEmail().normalizeEmail(),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: false,
        messge: "validation error",
        error: errors,
      });
    }
    // hash password
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    User.findOne(
      {
        _id: req.body.id,
      },
      function (error, result) {
        if (error) {
          return res.status(500).json({
            status: false,
            messge: "validation error",
            error: errors,
          });
        }
        return res.status(200).json({
          status: false,
          messge: "login succes",
          data: result,
        });
      }
    );
  }
);
module.exports = router;
