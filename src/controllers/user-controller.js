const express = require("express");
const User = require("../models/user-model.js");
const { body, validationResult } = require('express-validator');


const router = express.Router();

router.get("/", async(req,res) => {
    try {
        const users = await User.find();
        return res.status(200).send({users: users});

    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});


router.get("/:id", async(req,res) => {
    try {
        const users = await User.findById(req.params.id);
        return res.status(200).send({users: users});

    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});


router.post("/", 

body("firstName")  // it is validations and
.notEmpty()
.bail()  // Stops running the validation chain if any of the previous validators failed
.isLength({ min: 4 })
.withMessage("First name must be at least 4 characters"),
body("email")                //it is like middleware
.isEmail()
.custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (user) {
        throw new Error("Email is already taken")
    }
    return true;
}),
body("age")
.notEmpty()
.withMessage("age cannot be empty")
.isNumeric()
.withMessage("Age must be a number between 18-60")
.custom((value) => {
    if (value < 18 || value > 60) {
        throw new Error("Incorrect age provider")
    }
    return true;
}),
body("password")
.notEmpty()
.withMessage("Password is required")
.custom((value) => {
    const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
    if (!value.match(pass)) {
        throw new Error("Password must be strong");
    }
    return true;
})
.custom((value, { req }) => {
    if (value !== req.body.confirmPassword) {
        throw new Error("Password and confirm password should match")
    }
    return true;  // return is necessary
})


    , async (req, res) => {
        try {

            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }

            const user = await User.create(req.body);

            return res.status(201).send(user);

        } catch (error) {
            return res.status(500).send(error.message);
        }
    });



module.exports = router;






