const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).json("Hello World");
});

app.listen(port, ()=>{
    console.log("Server listening at port " + port);
});