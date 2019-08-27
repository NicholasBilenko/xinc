const Counter = require("../models/counter");
const User = require("../models/user");
const increment = 2;
exports.get_counter = (req, res) => {
    const userModel = User.getUser().find((el) => el.token === req.headers.authorization);
    if (userModel) {
        const counterModel = Counter.getCounter().find((el) => el.userId === userModel.userId);

        return res.status(200).json(counterModel);
    }

    return res.status(401).json({message: "Auth failed"});
};


exports.post_counter = (req, res) => {
    const userModel = User.getUser().find((el) => el.token === req.headers.authorization);
    if (userModel) {
        const counterModel = Counter.getCounter().find((el) => el.userId === userModel.userId);

        if (counterModel) {
            if (counterModel.counter) {
                counterModel.counter *= increment;
                counterModel.nextCounter *= increment
            } else {
                counterModel.counter = 1;
                counterModel.nextCounter = increment;
            }
        }
        return res.status(200).json(counterModel);
    }

    return res.status(401).json({message: "Auth failed"});
};