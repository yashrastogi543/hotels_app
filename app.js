const express = require('express'); //import the package that was installed.
const path = require('path');

const app=express();


app.listen(4001,()=>{
    console.log("Server started on port 4001");
});
const publicDirectory=path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine','hbs');
app.use('/',require('./routes/page'));
