const express = require("express");
const router = express.Router();

const CounterController = require('../controllers/counter');
const checkAuth = require('../middleware/check-auth');

router.get("/counter", checkAuth, CounterController.get_counter);
router.post("/counter", checkAuth, CounterController.post_counter);
module.exports = router;