const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()




mongoose.connect(process.env.MONGOOSE_URL,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, info) => {
        if (!err) console.log('mongoose......')
    })

app.use([
    express.json(),
    express.urlencoded({ extended: true }),
    morgan('dev'),
    cors({
        origin: "https://mahmoud-uppsala.herokuapp.com/",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    })
])

app.use('/*', (req, res, next) => {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
})

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Rouering... 
const AuthRouter = require('./router/Auth')
const ChatRouter = require('./router/ChatModel')
const PostRouter = require('./router/PostModel')
const uploading = require('./router/upload')
const storyRouter = require('./router/StoryRouter')
app.use('/api/',[
    AuthRouter,
    ChatRouter,
    PostRouter,
    uploading,
    storyRouter
])




if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('*', (req, res) =>
    
        res.sendFile(path.resolve(__dirname,  'client', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}



const { SendMess, sistaMessage } = require('./socket/SendMessage')
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: "https://mahmoud-uppsala.herokuapp.com/",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
})


let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};


io.on('connection', socket => {



    // online users... visa user..
    socket.on('join', async (userId) => {


        addUser(userId, socket.id)
        io.emit('getUser', users)
        console.log(users)


    })

    


    socket.on('firstSend', async ({userId, chatId, text, lastUser})=>{

        const {error, saveChat} = await SendMess(userId, chatId, text)
        if(!error){

            socket.emit('loadingMessage', saveChat)
            const user = await getUser(lastUser)
            if(user){

               io.to(user.socketId).emit('sendigen',{userId, text})
                console.log('user is here...')
            }else{
                console.log('user is not here.....')
            }

        }else{


            console.error('error', error)

        }
    })






    // disconnect users...
    socket.on('disconnect', () => {
        removeUser(socket.id)
        io.emit('getUser', users)
        console.log('logout...')
    })


})


/*
MONGOOSE_URL= "mongodb+srv://mahmoud:Aa102030@cluster0.qzw8p.mongodb.net/myproduct?retryWrites=true&w=majority"
*/

http.listen(process.env.PORT, () => console.log(`server Ring`))
