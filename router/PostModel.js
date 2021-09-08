const router = require('express').Router()
const verify = require('../token/jwt_verify')
const postControoler = require('../controller/PostModel')

router.post('/post/create/',   verify, postControoler.CreatePost)
router.get('/post/', postControoler.visaPost)
router.get('/post/:id/', postControoler.PostIdGet)
router.delete('/post/delete/:id/', verify, postControoler.deletePost)
router.put('/post/update/:id/', verify, postControoler.updatePost)
router.get('/post/userid/:id/', postControoler.postUserId)
// add Like to Post... 
router.put('/post/like/:id/', verify, postControoler.addLike)
router.get('/post/liken/user/:id/', postControoler.viewsLike)
router.post('/post/comment/:id/', verify, postControoler.addComment)

router.delete('/post/updatecomment/:id/:commentId/', verify, postControoler.UpdateComment)

router.put('/post/comment/:id/:commentxp/', verify, postControoler.EditComment)

router.post('/post/createStory/', verify, postControoler.createStory)



module.exports = router