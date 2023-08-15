const express = require('express');
const mysql = require('mysql');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('product_images'));

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 // session expires after 24 hours
  }
}));

// create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'posterparadise'
});

// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to app.js!');
});

// login as user
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (error, rows) => {
    if (error) {
      throw error;
    } else if (rows.length > 0) {
      // Match found
      console.log('Login successful!');
	  req.session.isUser = true; // set a session variable
      res.redirect('/home');
    } else {
      // No match found
      console.log('Invalid username or password');
      res.redirect('http://localhost/WebDevProject3/login.html');
    }
  });
});

// register a user
app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      throw err;
    }
    console.log('1 record inserted');
    res.redirect('http://localhost/WebDevProject3/login.html');
  });
});

// log out back to user login
app.get('/logout', (req, res) => {
  req.session.isUser = false;
  res.redirect('http://localhost/WebDevProject3/login.html');
});

app.get('/home', (req, res) => {
  if (!req.session.isUser) { // check whether the isUser session variable is set
    res.redirect('http://localhost/WebDevProject3/login.html');
    return;
  }

  const sql = 'SELECT * FROM users';
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.render('home.ejs', { users: rows });
    }
  });
});

//retrieve poster list
app.get('/shop', (req, res) => {
  if (!req.session.isUser) { // check whether the isUser session variable is set
    res.redirect('http://localhost/WebDevProject3/login.html');
    return;
  }

  db.query('SELECT * FROM posters', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render('shop', { posters: result });
    }
  });
});


app.get('/cart', function(req, res) {
  if (!req.session.isUser) { // check whether the isUser session variable is set
    res.redirect('http://localhost/WebDevProject3/login.html');
    return;
  }
  var cart = req.session.cart || {};  // Get the cart from the session, or create an empty object if it doesn't exist
  res.render('cart', {cart: cart});   // Render the 'cart' template and pass it the cart object
});


// create cart object in session
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = {};
  }
  next();
});

// add item to cart
app.post('/cart/add', (req, res) => {
  const id = req.body.id;
  const sql = 'SELECT * FROM posters WHERE id = ?';
  db.query(sql, [id], (error, rows) => {
    if (error) {
      throw error;
    } else if (rows.length > 0) {
      // Match found
      const poster = rows[0];
      if (req.session.cart[id]) {
        // item already in cart, increase quantity
        req.session.cart[id].qty++;
      } else {
        // item not in cart, add to cart
        req.session.cart[id] = {
          name: poster.name,
          price: poster.price,
          qty: 1,
		  image: poster.image
        };
      }
      res.send('Item added to cart!');
    } else {
      // No match found
      res.send('Invalid item ID!');
    }
  });
});

//remove from cart
app.post('/remove-from-cart', (req, res) => {
    const item = req.body.item;
    delete req.session.cart[item];
    res.redirect('/cart');
});

//Move to process
app.post('/process', function(req, res) {
  if (!req.session.isUser) { // check whether the isUser session variable is set
    res.redirect('http://localhost/WebDevProject3/login.html');
    return;
  }
  else{
  const total = req.body.total;
  res.render('process', { total: total });
  }
});

//Confirmation page
app.get('/confirm', function(req, res) {
  if (!req.session.isUser) { // check whether the isUser session variable is set
    res.redirect('http://localhost/WebDevProject3/login.html');
    return;
  }
  else{
  const total = req.body.total;
  res.render('confirm', { total: total });
  }
});

// log in as admin
app.post('/adminsignin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sql = 'SELECT * FROM admin WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (error, rows) => {
    if (error) {
      throw error;
    } else if (rows.length > 0) {
      // Match found
      console.log('Login successful!');
      req.session.isAdmin = true; // set a session variable
      res.redirect('/adminhome');
    } else {
      // No match found
      console.log('Invalid username or password');
      res.redirect('http://localhost/WebDevProject3/adminlogin.html');
    }
  });
});

app.get('/adminlogout', (req, res) => {
  req.session.isAdmin = false;
  res.redirect('http://localhost/WebDevProject3/adminlogin.html');
});

// retrieve user list
app.get('/adminhome', (req, res) => {
  if (!req.session.isAdmin) { // check whether the isAdmin session variable is set
    res.redirect('http://localhost/WebDevProject3/adminlogin.html');
    return;
  }

  const sql = 'SELECT * FROM users';
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.render('adminhome.ejs', { users: rows });
    }
  });
});

//retrieve poster list
app.get('/adminitems', (req, res) => {
  if (!req.session.isAdmin) { // check whether the isAdmin session variable is set
    res.redirect('http://localhost/WebDevProject3/adminlogin.html');
    return;
  }

  db.query('SELECT * FROM posters', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render('adminitems', { posters: result });
    }
  });
});

app.get('/adminorders', (req, res) => {
  if (!req.session.isAdmin) { // check whether the isAdmin session variable is set
    res.redirect('http://localhost/WebDevProject3/adminlogin.html');
    return;
  }

  const sql = 'SELECT * FROM orders';
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.render('adminorders.ejs', { orders: rows });
    }
  });
});

//delete user
app.delete('/deleteuser/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(`Deleted user with ID ${userId}`);
    res.sendStatus(204);
  });
});

// add a user
app.post('/adduser', (req, res) => {
  const username = req.body.user;
  const password = req.body.pass;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      throw err;
    }
    console.log('1 record inserted');
    res.redirect('/adminhome');
  });
});

//delete poster
app.delete('/deleteposter/:id', (req, res) => {
  const posterId = req.params.id;
  const sql = 'DELETE FROM posters WHERE id = ?';
  db.query(sql, [posterId], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(`Deleted poster with ID ${posterId}`);
    res.sendStatus(204);
  });
});

// add a poster
app.post('/addposter', (req, res) => {
  const name = req.body.name;
  const genre = req.body.genre;
  const price = req.body.price;
  const image = req.body.image;
  const sql = 'INSERT INTO posters (name, genre, price, image) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, genre, price, image], (err, result) => {
    if (err) {
      throw err;
    }
    console.log('1 record inserted');
    res.redirect('/adminitems');
  });
});

//add an order
app.post("/createorder", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const address = req.body.address;
  const total = req.body.total;
  let sql = "INSERT INTO orders (username, email, address, total) VALUES (?, ?, ?, ?)";
  db.query(sql, [username, email, address, total], (err, result) => {
    if (err) throw err;
    console.log("Order created successfully");
    res.redirect('/confirm');
	
  });
});

app.listen("8080", () => {
	console.log("Server is successfully running on port 8080");
});