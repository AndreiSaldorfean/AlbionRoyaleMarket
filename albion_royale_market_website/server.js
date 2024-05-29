const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static('build'));

app.listen(420, () => {
  console.log('App listening on port 420');
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'),(err)=>
  {
    if(err)
    res.status(500).send(err);
  }
  );
  //Catch-all server route
  //useful when loading different endpoint in Single Page Applications
});