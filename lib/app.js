require('dotenv').config();
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const uuid = require('uuid');
const app = express();

app.use(require('cors')());
app.use(express.json());

AWS.config.update({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: 'us-west-2'
});

const s3= new AWS.S3();
const storage = multer.memoryStorage({
    destination: function(req, file, callback){
        callback(null, '')
    }
})

const upload = multer({storage}).single('image')

app.post('/upload', upload, (req, res) => {
    let fileToUpload = req.file.originalname.split('.')
    const fileType = fileToUpload[fileToUpload.length - 1]
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer
    }

    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error)
        }
        res.status(200).send(data)
    }) 
})

app.get('/gallery', (req, res) => {
    AWS.config.setPromisesDependency();
    const params = {
  Bucket: "greetingart",
 };
 
 s3.listObjectsV2(params, function(err, data) {
   if (err) res.send(err)
	else res.send(data);
});
})

app.use('/send', require('cors')(), require('./controllers/sendGrid'))
module.exports = app;
