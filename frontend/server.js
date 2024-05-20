const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('build'));

app.listen(420, () => {
  console.log('App listening on port 420');
});