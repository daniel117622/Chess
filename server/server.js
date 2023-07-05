const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process'); // Import the 'spawn' function
const app = express();
const cookieSession = require('cookie-session');
const port = 5000;

app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your React app's URL
  credentials: true, // Allow sending of cookies
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/static/chess_pieces', (req, res, next) => {
  const pieceName = req.url.split('/').pop();
  console.log(`Requested piece: ${pieceName}`);
  next();
});

// Serve static files
app.use(express.static('static'));
app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'], // Replace these with your own secret keys
    maxAge: 24 * 60 * 60 * 1000, // Cookie expires after one day
  })
);

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

  if (email === 'admin@email.com' && password === 'password') {
    req.session.user = email; // Store user email in the session
    res.sendStatus(200);
  } else {
    res.status(401).send({ error: 'Invalid email or password.' });
  }
});

app.post('/api/fetch_best_move', (req, res) => {
  const  json  = req.body;
  console.log('Received JSON:', json);

  try {
    const jsonInput = JSON.stringify(json);
    console.log(jsonInput)
    const pythonProcess = spawn('python', ['script.py', jsonInput]);

    let pythonOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      pythonOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('Error from Python script:', data.toString());
      // Handle any error output from the Python script
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        let modifiedJson;
        try {
          modifiedJson = JSON.parse(pythonOutput);
        } catch (error) {
          console.error('Error parsing modified JSON:', error);
          return res.status(500).json({ error: 'Failed to parse modified JSON.' });
        }

        console.log(modifiedJson);
        // Handle the modified JSON as needed

        res.sendStatus(200);
      } else {
        console.error('Python script process exited with code', code);
        res.status(500).json({ error: 'Python script process exited with an error.' });
      }
    });
  } catch (error) {
    console.error('Error serializing JSON:', error);
    res.status(500).json({ error: 'Failed to serialize JSON.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
