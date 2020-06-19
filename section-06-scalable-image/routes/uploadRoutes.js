const AWS = require('aws-sdk')
const keys = require('../config/keys')
const uuid = require('uuid/v1')
const requireLogin = require('../middlewares/requireLogin')

// s3 object has all functionality do make presigned URL
const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
    region: "eu-central-1"
})

module.exports = app => {
    app.get('/api/upload', requireLogin, async (req, res) => {

        if(!req.query.fileType){
            return res.status(400).send({ error: 'No file type passed' });
        }
        
        // Get two elements array - ex. [image, png]. Remove last elements and return it - ex: 'png'.
        const extension = req.query.fileType.split('/').pop(); 
        const key = `${req.user._id}/${uuid()}.${extension}`

        s3.getSignedUrl('putObject', {
            Bucket: 'node-advanced-concepts',
            ContentType: 'image/*',
            Key: key,
            
        }, (err, url) => res.send({key, url}))
    })
}

