const express = require('express');
const app = express();
const port = 8080;
const ec2 = require('./routes/ec2');
const path = require('path');
const s3 = require('./routes/s3');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 127.0.0.1:3000/ec2/
app.use('/ec2', ec2);

// 127.0.0.1:3000/s3/
app.use('/s3', s3);

app.listen(port, () => console.log(`Running on port : ${port}`));
