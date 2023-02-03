# andrewslai

My personal website's frontend

Eventually, I hope to turn this project into a blogging platform where users can
easily create and publish blog content.

## What's included:

     Front end: Re-frame SPA written in Clojurescript

# Installation
## Clojurescript


# Development
For local development using Storybook
``` sh
// Rebuild every time the program is changed and start Storybook
npm run watch
npm run storybook

// Serve from andrewslai for E2E development
cd <PATH>/andrewslai
source .env.local
lein run

```
# Deployment
To deploy,
(1) Build a `release` artifact.
(2) Deploy the release artifact to S3.

``` sh
npm run build-release
npm run deploy
```

