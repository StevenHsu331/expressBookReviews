const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const JWT_PRIVATE_KEY = "myPrivateKey";

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    return users.filter(user => user.username == username).length == 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    return users.filter(user => user.username == username && user.password == password).length == 1;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const {username, password} = req.body;
  if (authenticatedUser(username, password)) {
    const token = jwt.sign({username}, JWT_PRIVATE_KEY, {expiresIn: "1h"});
    req.session.user = username;
    return res.status(400).json({token: token, message: "ok"});
  }
  else {
    return res.status(400).json({message: "authentication failed"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const review = req.body.review;
  const isbn = parseInt(req.params.isbn);
  if (!(isbn in books)) {
    return res.status(400).json({message: "isbn not exist"});
  }
  books[isbn].reviews[req.session.user] = review;
  return res.status(200).json({message: "ok"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = parseInt(req.params.isbn);
    if (!(isbn in books)) {
        return res.status(400).json({message: "isbn not exist"});
    }
    delete books[isbn].reviews[req.session.user];
    return res.status(200).json({message: "ok"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
