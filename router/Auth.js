const express = require('express')
const router = express.Router()
const AuthModel = require('../controller/Auth')
const verify = require('../token/jwt_verify')
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})


function checkFileTypes(file, cb) {
    const fileTypes = /jpg|jpeg|png/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if (extname && mimetype) {
        cb(null, true)
    } else {
        cb('Image Only')
    }
}


const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileTypes(file, cb)
    }
})


// Strat.. create User and Login....
router.post('/login/', AuthModel.login)
router.post('/singup/', AuthModel.singup)
// End.. create User and Login....


router.post('/change/:id/', AuthModel.ChangeName)


// Uploads Image...
router.post('/upload/:id/', AuthModel.updateImage)

// users List
router.get('/listusers/', AuthModel.listUser)
router.put('/send/friends/:id/', AuthModel.RequiresFriends)



router.get('/userid/:id/', AuthModel.profileId)
router.post('/coverphoto/:id/', upload.single('image'), AuthModel.coverPhotos)


router.put('/send/waitfriends/:id/', AuthModel.addFriendOrNot)
router.post('/addadress/:id/', AuthModel.AddAddressNew)


router.put('/RemoveFriends/removefriends/:id/', AuthModel.RemoveFriends)

// Show all Freinds to user....
router.get('/allfriends/:id/', AuthModel.AllFriends)



// Show All Requires from me 
router.get('/requires/:id/', AuthModel.ShowALLrequires)



// show all som await for att jag bestamm
router.get('/showawait/:id/', AuthModel.ShowWait)


// after filter some send require me ....
router.get('/allasendfriend/',  verify, AuthModel.onlysendFriends)



module.exports = router