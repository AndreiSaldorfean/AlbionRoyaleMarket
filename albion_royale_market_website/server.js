const site_input = require('./build/site_input.json');
const final = require('./build/final.json');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5555;

app.use(cors());

app.get('/site_input.json', (req, res) => {
    res.json(site_input);
});

app.get('/final.json', (req, res) => {
  res.json(final);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});