const PostModel = require('../model/PostModel')
const Object = require('mongoose').Types.ObjectId
const Auth = require('../model/Auth')


// create Post.. 
exports.CreatePost = async (req, res) => {
    const {
        image,
        textpost,


    } = req.body
    try {

        let post = await PostModel({
            image,
            textpost,
            user: req.user._id,
        })

        const savePost = await post.save()

        return res.status(201).json(savePost)

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}




// userId ... 
exports.postUserId = async (req, res) => {

    let post = await PostModel.find({ user: req.params.id }).
        populate({ path: 'user', select: 'profileImage username email' })

        .sort({ createdAt: -1 })
    if (post) {
        return res.json(post)
    } else {
        return res.json('not....')
    }
}

// Get post.
exports.visaPost = async (req, res) => {

    let post = await PostModel.find({})
        .populate({ path: 'user', select: 'profileImage username email' })

        .sort({ createdAt: -1 })

    if (post) return res.json(post)
    else return res.status(404).json({ message: ' Not Post.. New....' })
}



// Update Post.. 
exports.updatePost = async (req, res) => {

    const {
        image,
        textpost,


    } = req.body
    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `Not id ${req.params.id}` })


    try {
        let post = await PostModel.findById({ _id: req.params.id })

        if (post) {
            await PostModel.updateOne({ _id: req.params.id }, {
                image,
                textpost,
                user: req.user._id
            })

            return res.status(201).json(post)

        } else {
            return res.status(404).json({ message: 'Not Post. ' })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

// delete Post... 
exports.deletePost = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `ID : ${req.params.id} ` })

    try {
        let post = await PostModel.findById({ _id: req.params.id })
        if (post) {
            await PostModel.deleteOne({ _id: req.params.id })
            return res.json({ message: 'ReMOVE. post... ' })
        } else {
            return res.status(404).json({ message: 'not Post ... ' })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}




// link unLike  
exports.addLike = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}}` })
    try {

        let post = await PostModel.findById({ _id: req.params.id })
        if (post) {


            const checkien = post.liken.find((xops) => xops.userId === req.user._id.toString())

            if (checkien) {


                const newChx = post.liken.filter((val) => val.userId !== req.user._id.toString())
                if (newChx) {
                    post.liken = newChx

                    const nods = await post.save()

                    //  const newSA =  post.save(nods)

                    return res.status(200).json(nods)

                }


            } else {

                const addLike = {
                    userId: req.user._id,
                    username: req.user.username,
                    image: req.user.profileImage
                }

                post.liken.push(addLike)

                const nsxsd = await post.save()
                return res.status(200).json(nsxsd)
            }


        } else {
            return res.status(404).json({ message: 'noT post.' })
        }

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}





// add comment... from User... 
exports.addComment = async (req, res) => {
    if (!Object.isValid(req.params.id))
        return res.status(404).json({ message: `Id : ${req.params.id}` })

    const {
        textcomment,
        imagecomment
    } = req.body

    try {

        let post = await PostModel.findById({ _id: req.params.id })

        if (post) {

            const newPosc = {
                textcomment,
                imagecomment,
                date: Date.now(),
                userId: req.user._id,
                userName: req.user.username,
                userImage: req.user.profileImage,
            }


            post.comment.push(newPosc)

            const savpost = await post.save()

            return res.json(savpost)




        } else {
            return res.status(404).json({ message: 'Not Post.. ' })
        }

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}


// remove Comment from User... 
exports.UpdateComment = async (req, res) => {
    //   if(!Object.isValid(req.params.id))
    //  return res.status(404).json({message : `Id ${req.params.id}`})
    try {
        let post = await PostModel.findById(req.params.id)
        if (post) {


            const newUpdateComment = post.comment.filter((user) => user._id.toString() !== req.params.commentId.toString())

            if (newUpdateComment) {

                post.comment = newUpdateComment

                const saveComment = await post.save()

                return res.json(saveComment)
            } else {
                return res.json(post)
            }

        } else {
            res.json('no')

        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}


// Edit comment...
exports.EditComment = async (req, res) => {

    const {
        textcomment,
        imagecomment,
    } = req.body

    try {
        let post = await PostModel.findById({ _id: req.params.id })
        if (post) {

            const newsp = post.comment.find((user) => user._id.toString() === req.params.commentxp.toString())

            if (newsp) {



                newsp.textcomment = textcomment
                newsp.imagecomment = imagecomment
                newsp.date = Date.now()

                const newPo = await post.save()
                return res.status(201).json(newPo.comment)
            }
            else return res.json()


        } else {
            return res.status.json({ message: 'Not ' })
        }
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}





exports.createStory = async (req, res) => {
    const { textpost } = req.body
    let nepost = await PostModel({
        textpost,
        user: req.user._id,

    })


    const savepost = await nepost.save()


    await res.status(201).json(savepost)




    setTimeout(function () {
        const ahmed = savepost.remove()

        return console.log(ahmed, Date.now())
    }, 2 * 60 * 1000)

}




// view like ... >
exports.viewsLike = async (req, res) => {

    try {

        let post = await PostModel.findById({ _id: req.params.id })
        if (post) {



            const ViewLike = await Promise.all(
                post.liken.map((us) => {
                    return Auth.findById(us)
                })
            )




            let userLike = []

            ViewLike.map((uses) => {
                const { username, _id, profileImage } = uses
                userLike.push({ username, _id, profileImage })
            })

            return res.json(userLike)

        } else {
            return res.status(404).json({ message: `we have not post` })
        }
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}



// post id ... 
exports.PostIdGet = async (req, res) => {
    try {
        let post = await PostModel.findById({ _id: req.params.id }).populate({ path: 'user', select: '_id username profileImage ' })
        if (post) return res.json(post)
        else return res.status(404).json({ message: 'not post...' })
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}