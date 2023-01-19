const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true });

// Create a Mongoose schema for the user
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
});

// Create a Mongoose model for the user
const User = mongoose.model('User', UserSchema);

// Serve the registration page
app.get('/singup', (req, res) => {
    res.sendFile(__dirname + "/singup.html");
});

// Handle registration form submission
app.post('/singup', (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const user = new User({ name, email, password, phoneNumber });
  user.save()
    .then(() => res.send("User created successfully"))
    .catch(err => res.status(400).send(err.message));
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
