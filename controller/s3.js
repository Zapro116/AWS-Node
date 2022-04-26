const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

// Set the Region
AWS.config.update({ region: 'us-east-1' });

let s3 = new AWS.S3({ apiVersion: '2006-03-01' });

exports.showS3 = (req, res) => {
  s3.listBuckets((err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.Buckets);
      res.json(data.Buckets);
    }
  });
};

exports.createS3 = (req, res) => {
  const { bucketName } = req.body;
  var bucketParams = {
    Bucket: bucketName,
  };

  // call S3 to create the bucket
  s3.createBucket(bucketParams, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.Location);
      res.json(data.Location);
    }
  });
};

exports.uploadS3 = (req, res) => {
  const { bucketName, file } = req.body;
  const uploadParams = { Bucket: bucketName, Key: '', Body: '' };
  const File = file;

  // Configure the file stream and obtain the upload parameters
  const fileStream = fs.createReadStream(file);
  fileStream.on('error', function (err) {
    console.log('File Error', err);
  });
  uploadParams.Body = fileStream;

  uploadParams.Key = path.basename(file);

  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log('Error', err);
    }
    if (data) {
      console.log('Upload Success', data.Location);
      res.json(data.Location);
    }
  });
};

exports.listBucketItems = (req, res) => {
  const { bucketName } = req.params;
  var bucketParams = {
    Bucket: bucketName,
  };
  s3.listObjects(bucketParams, function (err, data) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data);
      res.json(data);
    }
  });
};

exports.deleteBucket = (req, res) => {
  const { bucketName } = req.params;
  var bucketParams = {
    Bucket: bucketName,
  };
  s3.deleteBucket(bucketParams, function (err, data) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data);
      res.json(data);
    }
  });
};
