const router = require('express').Router();

router.get("/",(req, res) => {
    res.send("HEY")
})

module.exports = router;