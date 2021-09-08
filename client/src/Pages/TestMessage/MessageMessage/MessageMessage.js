import { Col } from "react-bootstrap"
import MessageMessageList from "./MessageMessageList/MessageMessageList"
import MessageMessageListSend from "./MessageMessageListSend/MessageMessageListSend"


const MessageMessage = ({
    idChat,
    userChat,
    messageAll,
    socket,
    userInfo,
    setMessageAll,
    userOnline,
    setIdChat
}) => {




    return (
        <Col xs={12} sm={12} md={12} lg={12} className="styole_width_message">





            <MessageMessageList
                idChat={idChat}
                userChat={userChat}
                messageAll={messageAll}
                userOnline={userOnline}
                setIdChat={setIdChat}
            />
            <MessageMessageListSend
                idChat={idChat}
                socket={socket}
                userInfo={userInfo}
                setMessageAll={setMessageAll}
                messageAll={messageAll}

            />



        </Col>
    )
}


export default MessageMessage