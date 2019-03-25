const mongoose = require('mongoose')
const aws = require('aws-sdk')
const fs = require('fs')
const { promisify }  = require('util')
const path = require('path')

const s3 = new aws.S3()
const PostSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  URL: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

PostSchema.pre('save', function () {
  if (!this.url && process.env.STORAGE_TYPE === 'local') {
    this.URL = `${process.env.MONGO_URL}/files/${this.key}`
  }
})

PostSchema.pre('remove', function () {
  if (process.env.STORAGE_TYPE === 's3') {
    return s3.deleteObject({
      Bucket: process.env.NAME_BUCKET,
      Key: this.key
    }).promise()
  } else {
    return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key))
  }
})

module.exports = mongoose.model("Post", PostSchema)