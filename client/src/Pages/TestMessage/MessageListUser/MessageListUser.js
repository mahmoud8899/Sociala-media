import { Col } from "react-bootstrap"
import MessageListUserSearch from "./MessageListUserSearch/MessageListUserSearch"
import MessageListALLUser from "./MessageListALLUser/MessageListALLUser"
import { useState } from "react"
const MessageListUser = ({ convstationData, setIdChat, list, openChatMessage }) => {


    const [closeListUser, setCloseListUser] = useState(false)
    // console.log(closeListUser)


   


    return (
        <Col xs={openChatMessage ? "10" : "12"}
            sm={openChatMessage ? "10" : "12"}
            md={openChatMessage ? "10" : "4"}
            lg={openChatMessage ? "10" : "4"}
            className={openChatMessage ? null : "styole_width"} >
            <MessageListUserSearch
                list={list}
                setCloseListUser={setCloseListUser}
                closeListUser={closeListUser}
                openChatMessage={openChatMessage}
            />



            <MessageListALLUser

                convstationData={convstationData}
                setIdChat={setIdChat}
                closeListUser={closeListUser}
                list={list}
                openChatMessage={openChatMessage}
                

            />



            {openChatMessage ? null :
                !closeListUser &&
                <Col md={12} lg={12} className="d-none d-md-block app_loading" >
                    <i className="fab fa-windows"></i>
                    <span>New Messenger app for Windows</span>
                </Col>

            }



        </Col>
    )
}


export default MessageListUser