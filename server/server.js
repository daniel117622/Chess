const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const cookieSession = require('cookie-session');
const port = 5000;

app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your React app's URL
  credentials: true,  // Allow sending of cookies
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/static/chess_pieces', (req, res, next) => {
  const pieceName = req.url.split('/').pop();
  console.log(`Requested piece: ${pieceName}`);
  next();
});

// Serve static files
app.use(express.static('static'));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'], // Replace these with your own secret keys
  maxAge: 24 * 60 * 60 * 1000 // Cookie expires after one day
}));

// Then, define the routes that depend on the middleware
app.get('/session', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.json({ user: null });
  }
});

app.post('/sign-in', (req, res) => {
  const { password, email } = req.body;
  console.log('Received data:', { password, email });

  if(email === 'admin@email.com' && password === 'password'){
    req.session.user = email; // Store user email in the session
    res.sendStatus(200);
  } else {
    res.status(401).send({error: 'Invalid email or password.'});
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
