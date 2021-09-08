const ChatModel = require('../model/ChatModel')


// create message 
const SendMess = async (userId, chatId, text) => {


    let chat = await ChatModel.findById({ _id: chatId })
    if (chat) {

        const newSendMessge = {
            sender: userId,
            text: text,
            date: Date.now()
        }

        chat.lastMessage = text
        chat.message.push(newSendMessge)
        const saveChat = await chat.save()
        return { saveChat }

    } else {

        return { error: 'not Have Chat...' }
    }
}





const sistaMessage = async (userId) => {

    let chat = await ChatModel.find({ users: userId }).select('-message')
    if (chat) {

        return { chat }
    } else {
        return { 'Error': 'Not Fount' }
    }
}


module.exports = {
    SendMess,
    sistaMessage
}