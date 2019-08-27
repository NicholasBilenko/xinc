const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.user_login = (req, res) => {
    const userModel = User.getUser().find((el) => el.username === req.body.username);

    if (userModel) {
        bcrypt.compare(req.body.password, userModel.password, (err, result) => {
            if(err) {
                return res.status(401).json({message: "Auth failed - 0"});
            }
            if(!result) {
                const token = jwt.sign(
                    {
                        email: userModel.email,
                        userId: userModel.userId
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                userModel.token = token;
                res.set("Authorization", token);
                return res.status(200).json({message: "Auth successful"});
            } else {
                return res.status(401).json({ message: result });
            }
        });
    } else {
        return res.status(401).json({ message: "Auth failed" });
    }
};