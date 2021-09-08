import { Col } from "react-bootstrap"
import "./HomeChat.css"
import NavBarChatBottom from "./NavBarChatBottom/NavBarChatBottom"
import { useSelector, useDispatch } from "react-redux"
import { Fragment, useContext, useEffect, useState } from "react"
import { ShowUserChatAction } from "../../../redux/Action/chat_Action"
import HomeChatListUsers from "./HomeChatListUsers/HomeChatListUsers"
import axios from "axios"
import io from "socket.io-client"
import { textCount } from "../../../App"
import useSound from "use-sound"
import usexxMps from "../../sound/sound.mp3"
const HomeChat = () => {





    const [play] = useSound(usexxMps)

    const dispatch = useDispatch()

   

    //  const dispatch = useDispatch()
    const [openSearch, setOpenSearch] = useState(false)
    const [openChat, setOpenChat] = useState(false)
    const [socket, setSocket] = useState(null)
    // userINFO
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // all users.. 
    const listSUsers = useSelector((state) => state.listSUsers)
    const { list } = listSUsers

    // list chat user... 
    const listchat = useSelector((state) => state.listchat)
    const { listChatUser: convstationData } = listchat

    // console.log(listChatUser)

    const chatcreateID = useSelector((state)=>state.chatcreateID)
    const {createChat ,error } = chatcreateID



    // console.log('list',list)
    // /api/chat/611fcae2a1d38c06740e25bf
    // const [convstationData, setConvstationData] = useState()
    const [idChat, setIdChat] = useContext(textCount)
    const [messagerallt, setMessagerallt] = useState([])
    const [userOpenImage, setUserOpenImage] = useState(null)
    const [userOnlien, setUserOnlien] = useState()
    const [uplodaData, setUplodaData] = useState()



    useEffect(()=>{

        if(error){
            console.log(error)
        }

    },[error])


    const setupSocket = () => {
        const newSocket = io.connect(`https://mahmoud-uppsala.herokuapp.com/`, { reconnect: true })
        newSocket.on('disconnect', () => {
            setSocket(null)
            setTimeout(setupSocket, 3000);
            console.log('disconnect', 'socket Disconnect !')
        })

        newSocket.on('connect', () => {
            console.log('succest')
        })

        setSocket(newSocket)
    }

    useEffect(() => {
        setupSocket()
        // eslint-disable-next-line
    }, [])



    useEffect(() => {

        if (socket) {

            socket.emit('join', userInfo?._id)

            socket.on('getUser', (users) => {
                setUserOnlien(users)
                // console.log('user Online', users)
            })

            socket.on('sendigen', (data) => {
               
                    setUplodaData({
                        sender: data.userId,
                        text: data.text,
                        date: Date.now()
                    })
                   
                    play()
              

            })

        }

    }, [socket, userInfo, play])



    useEffect(() => {

        uplodaData && idChat?.users?.includes(uplodaData?.sender) &&
            setMessagerallt(prev => [...prev, uplodaData])

    }, [uplodaData, idChat])







    
    // set all users ....
    useEffect(() => {

        if (userInfo) {

            dispatch(ShowUserChatAction(userInfo._id))






        }


    }, [userInfo, dispatch,createChat])




    //  show chat... .. 
    useEffect(() => {

        if (idChat && userInfo) {


            let FilterUserCheck = idChat?.users?.filter((usxs) => usxs !== userInfo._id)

            setUserOpenImage(list?.filter((userx) => userx?._id === FilterUserCheck?.toString()))

            const addChatUser = async () => {

                try {
                    const { data } = await axios.get(`api/chat/chat/${idChat?._id}`)
                    setMessagerallt(data.message)
                    setOpenChat(true)
                } catch (error) {
                    console.log(error)
                }
            }
            addChatUser()
        } else {

            setOpenChat(false)
            return setUserOpenImage(null)
        }

    }, [idChat,list,userInfo])









    return (

        <Fragment>
            {userInfo &&
                <>

                    <Col xs={12} sm={12} md={3} lg={3} className="d-none d-lg-block" >

                        <div className="test_mahmoud">
                            <div className="List_Chat_userInfo">

                                <div className="first_search_chat">
                                    <span>Contacts</span>
                                    <span className="search_video">
                                        <i className="fas fa-video"></i>
                                        <i className="fas fa-search" onClick={() => setOpenSearch(true)}></i>
                                        
                                    </span>
                                </div>


                                <div className="list_user_chat_xs">
                                    {convstationData?.map(cov => (

                                        <span onClick={() => setIdChat(cov)}>
                                            <HomeChatListUsers
                                                cov={cov}
                                                userInfo={userInfo}
                                                list={list}
                                                userOnlien={userOnlien}

                                            />
                                        </span>


                                    ))}
                                </div>




                                <div className="edit_add_chat" onClick={() => setOpenSearch(true)}>
                                    <i className="far fa-edit"></i>
                                </div>

                            </div>
                        </div>


                    </Col>


                    <NavBarChatBottom
                        list={list}
                        openSearch={openSearch}
                        setOpenSearch={setOpenSearch}
                        userInfo={userInfo}
                        openChat={openChat}
                        setIdChat={setIdChat}
                        messagerallt={messagerallt}
                        userOpenImage={userOpenImage}
                        socket={socket}
                        idChat={idChat}
                        setMessagerallt={setMessagerallt}
                        userOnlien={userOnlien}
                    />

                </>

            }
        </Fragment>
    )
}


export default HomeChat


