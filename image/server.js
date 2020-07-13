const express = require('express');
const formidable = require('formidable');
const sequelize = require('./db/db');
const User = require('./model/user');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/', (req, res)=> {
    const form = formidable({ multiples: true });

    
    const result = User.build ({
        u_name: req.body.u_name,
        
    })
    const finalResult = result.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    })
    res.send(req.body);
});

sequelize
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
}); 

sequelize.sync()
    .then(result =>{
        console.log(result);
    }).catch(err =>{
        console.log(err);
    }); 

app.listen(5000, () => {
console.log('Running');
})