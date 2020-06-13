const express = require("express");
const router = express.Router();
const operation = require("../operation/operation");

router.post("/create", operation.postRegister);
router.post("/login", operation.postLogin);
router.post("/articles", operation.postArticle);
router.get("/articles", operation.getArticles);

module.exports = router;
