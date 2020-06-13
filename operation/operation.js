const user = require("../model/user");
const article = require("../model/article");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postRegister = async (req, res) => {
  console.log("in register");
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const address = req.body.address;

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, 12);

    const us = new user({
      email: email,
      password: hashedPassword,
      username: username,
      address: address,
    });
    us.save()
      .then(() =>
        res.status(201).send({
          message: "New User Created!",
        })
      )
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  user
    .find({ username: username })
    .then((us) => {
      if (us.length == 0) {
        res.status(404).send({
          message: "Username or Password Incorrect",
        });
      }
      bcrypt.compare(password, us[0].password).then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign(
            {
              username: username,
            },
            "User Found!!"
          );
          res.status(200).send({
            message: "Success",
            access_token: token,
          });
        } else {
          res.status(404).send({
            message: "Username or Password Incorrect",
          });
        }
      });
    })
    .catch((err) => console.log(err));
};

exports.postArticle = (req, res, next) => {
  const title = req.body.title;
  const body = req.body.body;
  const author = req.body.author;
  const token = req.body.access_token;

  const art = new article({
    title: title,
    body: body,
    author: author,
    access_token: token,
  });
  art
    .save()
    .then(() =>
      res.status(201).send({
        message: "New Article Created",
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

exports.getArticles = (req, res, next) => {
  article
    .find()
    .then((art) => {
      let arts = [];
      for (let i = 0; i < art.length; i++) {
        const a = {
          title: art[i].title,
          body: art[i].body,
          author: art[i].author,
        };
        arts.push(a);
      }
      res.status(200).send({
        data: arts,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
