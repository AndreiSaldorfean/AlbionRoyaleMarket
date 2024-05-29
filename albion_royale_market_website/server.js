<<<<<<< HEAD
const site_input = require('./build/site_input.json');
const final = require('./build/final.json');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 420;

app.use(cors());

app.get('/site_input.json', (req, res) => {
    res.json(site_input);
});

app.get('/final.json', (req, res) => {
  res.json(final);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
=======
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('build'));

app.listen(3000, () => {
  console.log('App listening on port 3000');
>>>>>>> d4579e882e2ab7c8dac5d9140fe0f4c8e80b05de
});