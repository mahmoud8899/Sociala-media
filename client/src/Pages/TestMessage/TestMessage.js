import "./TestMessage.css"
import { Row, Container } from "react-bootstrap"
import MessageListUser from "./MessageListUser/MessageListUser"
import MessageMessage from "./MessageMessage/MessageMessage"
import io from "socket.io-client"
import { useEffect, useState, useContext } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import useSound from "use-sound"
import usex from "../sound/sound.mp3"
import { textCount } from "../../App"
const TestMessage = () => {

    // user info
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    const [play] = useSound(usex)
    // all users.. 
    const listSUsers = useSelector((state) => state.listSUsers)
    const { list } = listSUsers



    // create chat.. 
    const chatcreateID = useSelector((state) => state.chatcreateID)
    const { createChat } = chatcreateID



    const [idChat, setIdChat] = useContext(textCount)
    const [socket, setSocket] = useState(null)
    const [convstationData, setConvstationData] = useState([])
    const [messageAll, setMessageAll] = useState([])
    const [userChat, setUserChat] = useState(null)
    const [userOnline, setUserOnline] = useState()
    const [updateMessage, setUpdateMessage] = useState()




    const supSocket = () => {
        if (!socket) {

            const newSocket = io.connect(`https://mahmoud-uppsala.herokuapp.com/`, { reconnect: true })
            newSocket.on('disconnect', () => {
                setSocket(null)
                setTimeout(supSocket, 3000)
                console.log('disconnect', 'socket Disconnect !')
            })

            newSocket.on('connect', () => {
                console.log('success')
            })
            setSocket(newSocket)

        }

    }




    // connect socket.....
    useEffect(() => {
        supSocket()
        // eslint-disable-next-line
    }, [])


    useEffect(() => {

        if (socket && userInfo) {

            socket.emit('join', userInfo._id)

            socket.on('getUser', (users) => {
                setUserOnline(users)
            })


            socket.on('sendigen', (data) => {

                setUpdateMessage({
                    sender: data.userId,
                    text: data.text,
                    date: Date.now()
                })
                play()
            })

        }

    }, [socket, userInfo, play])



    // check message... 
    useEffect(() => {

        updateMessage && idChat?.users?.includes(updateMessage?.sender) &&
            setMessageAll(prev => [...prev, updateMessage])

    }, [idChat, updateMessage])

    // userList 
    // convstion 
    // get //api/chat/611fcae2a1d38c06740e25bf
    useEffect(() => {
        if (userInfo) {


            const AddconvstationData = async () => {
                try {
                    const { data } = await axios.get(`/api/chat/${userInfo?._id}`)
                    setConvstationData(data)
                } catch (error) {
                    console.log(error)
                }
            }

            AddconvstationData()


        }

    }, [userInfo, createChat])



    // message users.. 
    useEffect(() => {

        if (idChat && userInfo) {


            let userChckFilter = idChat?.users?.filter((usx) => usx !== userInfo._id)

            setUserChat(list?.filter((check) => check?._id === userChckFilter.toString()))


            const ADDmessage = async () => {
                try {
                    const { data } = await axios.get(`/api/chat/chat/${idChat?._id}`)
                    setMessageAll(data.message)
                } catch (error) {
                    console.log(error)
                }
            }

            ADDmessage()
        } else {

            setUserChat(null)

            return setIdChat(null)
        }

    }, [idChat, userInfo, list, setIdChat])






    return (
        <Container fluid>
            <Row className="row_Message">

                {!idChat &&
                    <MessageListUser
                        socket={socket}
                        convstationData={convstationData}
                        setIdChat={setIdChat}
                        list={list}
                    />
                }


                {idChat &&
                    <MessageMessage
                        idChat={idChat}
                        userChat={userChat}
                        messageAll={messageAll}
                        socket={socket}
                        userInfo={userInfo}
                        setMessageAll={setMessageAll}
                        userOnline={userOnline}
                        setIdChat={setIdChat}
                    />
                }


            </Row>
        </Container>
    )
}

export default TestMessage