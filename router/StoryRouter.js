const router = require('express').Router()
const controllerStory = require('../controller/StoryController')
const verify = require('../token/jwt_verify')

router.post('/story/', verify, controllerStory.addStory)
router.get('/story/story/',  controllerStory.showStoryImage)


module.exports = router