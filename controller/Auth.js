const User = require('../model/Auth')
const bcrypt = require('bcrypt')
const getToken = require('../token/jwt_sing')
const mongoose = require("mongoose")
const ObjectID = require("mongoose").Types.ObjectId;









// okej friend or not 
exports.addFriendOrNot = async (req, res) => {
    // requiresFriends
    //hereallawait
    //Friends

    const { userId } = req.body

    try {
        let user = await User.findById({ _id: req.params.id })
        if (user) {

            const ChecksendFriends = user.hereallawait.find((val) => val.toString() === userId.toString())
            if (ChecksendFriends) {



                await User.updateOne(
                    { _id: req.params.id },
                    { $pull: { hereallawait: userId }, $push: { Friends: userId } },


                )

                await User.updateOne(
                    { _id: userId },
                    { $pull: { requiresFriends: req.params.id }, $push: { Friends: req.params.id } },



                )



                return res.json('add Requires Friend')

            } else {


                //  await User.updateOne({ _id: req.params.id }, { $push: { requiresFriends: sendFriend } })
                // await User.updateOne({ _id: sendFriend }, { $push: { hereallawait: req.params.id } })


                return res.json('not............')
            }

        } else {
            return res.json('not user')
        }
    } catch (error) {

        return res.status(404).json({ message: error.message })
    }





}



// remove friends
exports.RemoveFriends = async (req, res) => {

    // requiresFriends
    //hereallawait
    //Friends

    const { removeid } = req.body
    try {
        let user = await User.findById({ _id: req.params.id })
        if (user) {

            const chsasad = user.Friends.find((vcs) => vcs.toString() === removeid.toString())

            if (chsasad) {
                await User.updateOne({ _id: req.params.id }, { $pull: { Friends: removeid } })
                await User.updateOne({ _id: removeid }, { $pull: { Friends: req.params.id } })
                return res.json('remove friends..')
            } else {
                // let nowx =    await User.updateOne({ _id: removeid }, {$pull :{Friends :user._id } })
                return res.json('not firends...')
            }




        } else {
            return res.json('we have not friends....')
        }
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })

    }
}
































// add  require friend.... me add to anther user..
exports.RequiresFriends = async (req, res) => {

    // requiresFriends
    //hereallawait
    //Friends

    const { sendFriend } = req.body

    try {
        let user = await User.findById({ _id: req.params.id })
        if (user) {

            const ChecksendFriends = user.requiresFriends.find((val) => val.toString() === sendFriend.toString())
            if (ChecksendFriends) {

                await User.updateOne({ _id: req.params.id }, { $pull: { requiresFriends: sendFriend } })
                await User.updateOne({ _id: sendFriend }, { $pull: { hereallawait: req.params.id } })



                return res.json(ChecksendFriends)

            } else {


                await User.updateOne({ _id: req.params.id }, { $push: { requiresFriends: sendFriend } })
                await User.updateOne({ _id: sendFriend }, { $push: { hereallawait: req.params.id } })


                return res.json(ChecksendFriends)
            }

        } else {
            return res.json('not user')
        }
    } catch (error) {

        return res.status(404).json({ message: error.message })
    }
}



// Show All firends to User.....
exports.AllFriends = async (req, res) => {
    // requiresFriends
    //hereallawait
    //Friends
    try {
        let user = await User.findById({ _id: req.params.id })
        if (user) {


            const checkFrindsInfo = await Promise.all(

                user.Friends.map((usx) => {

                    return User.findById(usx)
                })

            )


            let filterOnly = []

            checkFrindsInfo.map((xxp) => {
                const { _id, username, profileImage } = xxp
                filterOnly.push({ _id, username, profileImage })
            })

            return res.json(filterOnly)
        } else {
            return res.json('not user..')
        }
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}




// Show All Requires from me 
exports.ShowALLrequires = async (req, res) => {
    // requiresFriends
    //hereallawait
    //Friends
    try {
        let user = await User.findById({ _id: req.params.id })
        if (user) {


            const checkFrindsInfo = await Promise.all(

                user.requiresFriends.map((rex) => {

                    return User.findById(rex)
                })

            )


            let filterOnly = []

            checkFrindsInfo.map((xxp) => {
                const { _id, username, profileImage } = xxp
                filterOnly.push({ _id, username, profileImage })
            })

            return res.status(200).json(filterOnly)
        } else {
            return res.json('not user..')
        }
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


// Show all requires some send me .....
exports.ShowWait = async (req, res) => {
    // requiresFriends
    //hereallawait
    //Friends
    try {
        let user = await User.findById({ _id: req.params.id })
        if (user) {


            const newShowAwait = await Promise.all(

                user.hereallawait.map((aws) => {

                    return User.findById(aws)
                })

            )


            let filterOnlyaws = []

            newShowAwait.map((xxp) => {
                const { _id, username, profileImage } = xxp
                filterOnlyaws.push({ _id, username, profileImage })
            })

            return res.status(200).json(filterOnlyaws)
        } else {
            return res.status(200).json('not user..')
        }
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}






// requires friends... 
exports.onlysendFriends = async (req, res) => {

    //  if (!ObjectID.isValid(req.params.id))
    // return res.status(404).json({ message: `id is valid ${req.parmas.id}` })


    try {
        let user = await User.find({})
        if (user) {


            const checkFilterfirst = user.filter((ope) =>
                ope.requiresFriends.toString() !== req.user._id.toString() && ope.Friends.toString() !== req.user._id.toString()
                && ope.hereallawait.toString() !== req.user._id.toString() && ope._id.toString() !== req.user._id.toString()
            )

            if (checkFilterfirst) {

                return res.status(200).json(checkFilterfirst)
            } else {

                return res.json([])
            }



        } else {

            return res.status(404).json({ message: 'not ...' })
        }
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }


}




// Login 
// Post.... 
exports.login = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: `we have not your ${email}` })
        const IsMatch = await bcrypt.compare(password, user.password)
        if (!IsMatch) return res.status(404).json({ message: `Password Dont it Match` })

        return res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            profileImage: user.profileImage,
            token: getToken(user._id)
        })

    } catch (error) {

        return res.status(400).json({
            message: error.message
        })
    }
}


// Sing up 
exports.singup = async (req, res) => {
    const { username, email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (user) return res.status(404).json({ message: `we have not ${email}` })
        const hasPassword = await bcrypt.hash(password, 10)
        user = new User({
            _id: mongoose.Types.ObjectId(),
            username,
            email,
            password: hasPassword
        })

        const newUser = await user.save()
        return res.json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser._id)
        })

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

// list Users...
exports.listUser = async (req, res) => {

    let user = await User.find({}).select('-password').sort({ createdAt: -1 })
    if (user) return res.json(user)
    else return res.status(404).json({ message: 'error' })
}




// change only description 
exports.descriptionOnly = async (req, res) => {

}



//   uplading image cover and profile.... 
exports.updateImage = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(404).json({ message: `id is valid ${req.parmas.id}` })

    const { coverPhoto, profileImage } = req.body

    // Albums
    try {
        const user = await User.findById(req.params.id)
        if (user) {

            if (profileImage) {
                user.profileImage = profileImage

                user.Albums.push(profileImage)

                const NowUser = await user.save()
                return res.status(201).json({
                    _id: NowUser._id,
                    username: NowUser.username,
                    email: NowUser.email,
                    isAdmin: NowUser.isAdmin,
                    profileImage: NowUser.profileImage,
                    token: getToken(NowUser._id)
                })
            } else {
                if (coverPhoto) {

                    user.coverPhoto = coverPhoto
                    user.Albums.push(coverPhoto)

                    const AlusUser = await user.save()
                    return res.status(201).json({
                        _id: AlusUser._id,
                        username: AlusUser.username,
                        email: AlusUser.email,
                        isAdmin: AlusUser.isAdmin,
                        profileImage: AlusUser.profileImage,
                        token: getToken(AlusUser._id)
                    })

                } else {
                    return res.status(404).json({ message: 'not .' })
                }

            }



        } else {
            return res.status(404).json({ message: 'vi har inte samma User' })
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }

}


// Profile Id
exports.profileId = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}` })
    let user = await User.findById({ _id: req.params.id }).select('-password')
    if (user) return res.json(user)
    else return res.status(404).json({ message: `We have not User....` })
}


// cover Photo  //  i closee  this
exports.coverPhotos = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(404).json({ message: `Id ...${req.params.id}` })



    let user = await User.findById({ _id: req.params.id })
    if (user) {

        user.coverPhoto = `/${req.file.path}`
        const saveCoverPhoto = await user.save()
        return res.status(201).json(saveCoverPhoto)
    } else {
        return res.status(404).json({ message: 'not user....id' })
    }
}






// change Addres...
exports.AddAddressNew = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(404).json({ message: `Id ${req.params.id}` })

    const {
        University,
        living,
        job,

    } = req.body

    try {
        let user = await User.findById({ _id: req.params.id })
        if (user) {
            const addnew = {
                University,
                living,
                job,
            }
            user.AddAddress = addnew
            const saveAdress = await user.save()
            return res.status(201).json(saveAdress)

        } else {
            return res.status(404).json({ message: 'Not Here User Id...' })
        }
    } catch (error) {

        return res.status(404).json({ message: error.message })
    }
}





// Change username and dessription...
exports.ChangeName = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(404).json({ message: `Id ${req.params.id}` })
    const { username, description } = req.body
    try {
        let user = await User.findById({ _id: req.params.id })
        if (user) {



            user.username = username

            if (description) {

                user.AddAddress[0].description = description
                const savUser = await user.save()
                return res.status(201).json(savUser)
            }
            const savUser = await user.save()
            return res.status(201).json(savUser)



        } else {
            return res.status(404).json({ message: 'not have some User Name..' })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}



//   1....   requires.. to   2..   andra user vantar    3... friends....
//   





