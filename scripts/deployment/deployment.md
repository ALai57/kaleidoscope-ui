# Deployment

First, cut a release.
```
lein release
```

Then, upload the resulting JS file to the S3 bucket that it is served from.
`./deploy-to-s3`
