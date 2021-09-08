
const Story = require('../model/StoryModel')


// add story...
exports.addStory = async (req, res) => {
    const { image } = req.body
    try {

        let createStory = await Story.findOne({ user: req.user._id })

        if (createStory) {

            createStory.image.push(image)

            const newSave = await createStory.save()

            await res.status(201).json(newSave)

            setTimeout(async () => {

                if (newSave) {

                    const newStx = await newSave.remove()
                    return console.log('removwe', newStx)
                    // return res.json(newStx)
                }
            }, 24 * 60 * 60 * 1000);

        } else {

            let story = await Story.create({
                image,
                user: req.user._id
            })

            await res.status(201).json(story)

            setTimeout(async () => {

                if (story) {
                    const newStxdws = await story.remove()
                    return console.log('removwe', newStxdws)
                    // return res.json(newStx)
                }

            }, 24 * 60 * 60 * 1000)

        }



    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

/*
 
*/

// show all Story to Users...
//View followers' diaries only
exports.showStoryImage = async (req, res) => {

    let story = await Story.find({}).populate({
        path: 'user', select: 'username profileImage _id'
    })
    if (story) return res.json(story)
    else return res.json({ message: 'Not Story Now...' })



}