//

router.post('/okej/:id/', AuthModel.okejFriends)
// confirm freinds..
exports.okejFriends = async (req, res) => {
    const { userId } = req.body

    if (!ObjectID.isValid(req.params.id))
        return res.status(404).json({ message: `id${req.params.id}` })


    try {

        let user = await User.findById({ _id: req.params.id })
        if (user.AddFrindes.includes(userId)) {

            // delete from send friends...
            await User.updateOne({ _id: req.params.id }, { $pull: { AddFrindes: userId } })
            await User.updateOne(
                { _id: userId }, {
                $push: { Frindes: req.params.id },
                $pull: { awaitFrindes: req.params.id }

            }
            )
            user.Frindes.push(userId)
            let Savefirend = await user.save()

            return res.status(201).json(Savefirend)
        } else {
            return res.json('no')
        }
    } catch (error) {

        return res.status(404).json({ message: error.message })
    }
}



// delete Friends...
router.put('/delete/:id/', AuthModel.deleteFirends)
// Delete add  Friend  
exports.deleteFirends = async (req, res) => {
    const { deleteUser } = req.body
    if (!ObjectID.isValid(req.params.id))
        return res.status(404).json({ message: `id${req.params.id}` })
    try {

        let user = await User.findById({ _id: req.params.id })
        if (user.AddFrindes.includes(deleteUser)) {
            await User.updateOne({ _id: req.params.id }, { $pull: { AddFrindes: deleteUser } })
            return res.json({ message: 'Remove User...' })
        } else {
            return res.json({ message: 'we have not id  User...' })
        }

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

router.put('/onlyfriend/:id/', AuthModel.deleteOnlyFirend)
// Delet Friend Only .... 
exports.deleteOnlyFirend = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(404).json({ message: `we have not ID ${req.params.id}` })
    const { deleteOnlyFriend } = req.body
    try {

        let user = await User.findById({ _id: req.params.id })
        if (user.Frindes.includes(deleteOnlyFriend)) {

            await User.updateOne({ _id: req.params.id }, { $pull: { Frindes: deleteOnlyFriend } })
            await User.updateOne({ _id: deleteOnlyFriend }, { $pull: { Frindes: req.params.id } })
            return res.json({ message: 'Remove Firends.....' })
        } else {
            return res.json({ message: 'We Have not Firends.....' })
        }

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}


router.get('/showfriends/:id/', AuthModel.ShowFriends)
// Show friends
exports.ShowFriends = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(404).json({ message: `Id ${req.params.id}` })
    try {
        let user = await User.findById({ _id: req.params.id }).select('-password')
        if (user) {
            const Friends = await Promise.all(
                user.Frindes.map((FriendId) => {
                    return User.findById(FriendId)
                })
            )

            let listFirends = []
            Friends.map((firend) => {
                const { _id, username, image } = firend
                listFirends.push({ _id, username, image })
            })

            return res.json(listFirends)
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}





router.get('/showsendfriends/:id/', AuthModel.ShowSendFriends)
// show Send friends =..>
exports.ShowSendFriends = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(404).json({ message: `Id ${req.params.id}` })
    try {
        let user = await User.findById({ _id: req.params.id })

        const SendFriends = await Promise.all(
            user.AddFrindes.map((addfriendsId) => {
                return User.findById(addfriendsId)
            })
        )
        const SendListFriends = []
        SendFriends.map((fri) => {
            const { _id, username, image } = fri
            SendListFriends.push({ _id, username, image })
        })

        return res.json(SendListFriends)
    } catch (error) {
        return res.status(404).json({ message: 'Server Error...' })
    }
}


// add Followare 
router.post('/followers/:id/', AuthModel.UserFollowers)
// followers... 
exports.UserFollowers = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(404).json({ message: `not id ${req.params.id}` })

    const { userFollowers } = req.body
    try {
        let user = await User.findById({ _id: req.params.id })
        if (!user.followings.includes(userFollowers)) {

            await User.updateOne({ _id: userFollowers }, { $push: { followers: req.params.id } })

            user.followings.push(userFollowers)
            const saveUser = await user.save()
            return res.status(201).json(saveUser)


        } else {


            await User.updateOne({ _id: req.params.id }, { $pull: { followings: userFollowers } })
            await User.updateOne({ _id: userFollowers }, { $pull: { followers: req.params.id } })


            return res.json({ message: 'Remove Following' })



        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}



// list Followare... .
router.get('/followings/list/:id/', AuthModel.listFollowings)
//  show followings... 
exports.listFollowings = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(404).json({ message: `id ${req.params.id}` })

    try {
        let user = await User.findById({ _id: req.params.id })
        if (user) {

            const followareId = await Promise.all(
                user.followings.map((follow) => {
                    return User.findById(follow)
                })
            )

            const addList = []
            followareId.map((followar) => {
                const { _id, username, image } = followar
                return addList.push({ _id, username, image })
            })

            return res.json(addList)
        } else {
            return res.status(404).json({ message: 'Not Have a User Id....' })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}


router.get('/followare/list/:id/', AuthModel.listFollware)
// show followare .... 
exports.listFollware = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(404).json({ message: `id ${req.params.id}` })

    try {
        let user = await User.findById({ _id: req.params.id })
        if (user) {

            const followareId = await Promise.all(
                user.followers.map((follow) => {
                    return User.findById(follow)
                })
            )

            const addList = []
            followareId.map((followar) => {
                const { _id, username, image } = followar
                return addList.push({ _id, username, image })
            })

            return res.json(addList)
        } else {
            return res.status(404).json({ message: 'Not Have a User Id....' })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

router.post('/addfriends/:id/', AuthModel.AddFriend)
// add Friend.... 
exports.AddFriend = async (req, res) => {

    const { addFriend } = req.body
    if (!ObjectID.isValid(req.params.id))
        return res.status(404).json({ message: `Id ${req.params.id}` })
    try {
        let user = await User.findOne({ _id: req.params.id })

        if (user.AddFrindes.includes(addFriend)) {
            return res.json({ message: 'Your send Add Frind' })
        } else {


            await User.updateOne({ _id: addFriend }, { $push: { awaitFrindes: req.params.id } })

            user.AddFrindes.push(addFriend)
            let saveUser = await user.save()
            return res.json(saveUser)
        }

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

/*
followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
*/


