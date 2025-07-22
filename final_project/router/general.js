const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  try {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({message: "username or password is empty"});
    }
    if (!isValid(username)) {
        return res.status(400).json({message: "username is used"});
    }
    users.push({username: username, password: password});
    return res.status(200).json({message: "ok"});
  }
  catch (e) {
    return res.status(500).json({message: "please try again later"});
  }
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  //Write your code here
  try {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return res.status(200).json({data: books, message: "ok"});
  }
  catch {
    return res.status(500).json({message: "please try again later"});
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  //Write your code here
  try {
    await new Promise((resolve) => setTimeout(resolve, 10));
    const isbn = parseInt(req.params.isbn);
    if (!(isbn in books)) {
        return res.status(400).json({message: "isbn not exist"});  
    }
    return res.status(200).json({data: books[isbn], message: "ok"});
  }
  catch {
    return res.status(500).json({message: "please try again later"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  //Write your code here
  try {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return res.status(200).json({data: Object.values(books).filter(book => book.author == req.params.author), message: "ok"});
  }
  catch {
    return res.status(500).json({message: "please try again later"});
  }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  //Write your code here
  try {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return res.status(200).json({data: Object.values(books).filter(book => book.title == req.params.title), message: "ok"});
  }
  catch {
    return res.status(500).json({message: "please try again later"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = parseInt(req.params.isbn);
  if (!(isbn in books)) {
    return res.status(400).json({message: "isbn not exist"});  
  }
  return res.status(200).json({data: books[isbn].reviews, message: "ok"});
});

module.exports.general = public_users;
