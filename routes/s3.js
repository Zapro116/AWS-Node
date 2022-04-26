const router = require('express').Router();
const {
  showS3,
  createS3,
  listBucketItems,
  uploadS3,
  deleteBucket,
} = require('../controller/s3');

router.get('/', showS3);

router.post('/', createS3);

router.get('/:bucketName', listBucketItems);

router.post('/:bucketName', uploadS3);

router.delete('/:bucketName', deleteBucket);

module.exports = router;
