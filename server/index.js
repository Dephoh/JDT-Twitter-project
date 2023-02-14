var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.json({
        message: 'Hi'
    })
})

app.post('/tweet',(req,res) => {
    console.log(req.body)
})

app.listen(8000, () => {
    console.log('Listening on port 8000 ...')
});