const express = require('express');
const app = express();

// create new route handler
app.get('/', (req, res) => {
  res.send({ hello: 'world.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
