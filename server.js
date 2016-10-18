let express = require('express');
let path = require('path');
let app = express();

app.get('/', function (req, res) {
  	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use(express.static(path.join(__dirname, 'public')))
let server = app.listen(8888);

console.log("Start server with port:8888")
