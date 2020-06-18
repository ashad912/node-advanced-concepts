const AWS = require('aws-sdk')
const keys = require('../config/keys')
const uuid = require('uuid/v1')
const requireLogin = require('../middlewares/requireLogin')

// s3 object has all functionality do make presigned URL
const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
})

module.exports = app => {
    app.get('/api/upload', requireLogin, async (req, res) => {
        const key = `${req.user._id}/${uuid()}.jpeg`

        s3.getSignedUrl('putObject', {
            Bucket: 'node-advanced-concpets',
            ContentType: 'jpeg',
            Key: key
        }, (err, url) => res.send({key, url}))
    })
}

