import { Col, Row } from "react-bootstrap"
import "./NavBarChatBottom.css"
import HomeChatSearchUser from "../HomeChatSearchUser/HomeChatSearchUser"
import HomeChatUserTop from "../HomeChatUserTop/HomeChatUserTop"
import HomeChatShowMessage from "../HomeChatShowMessage/HomeChatShowMessage"
import HomeChatSendMessageFormUser from "../HomeChatSendMessageFormUser/HomeChatSendMessageFormUser"




const NavBarChatBottom = ({
    list,
    openChat,
    openSearch,
    setOpenSearch,
    userInfo,
    setIdChat,
    messagerallt,
    userOpenImage,
    socket,
    idChat,
    setMessagerallt,
    userOnlien,
}) => {








    return (



        <Row>
            {openSearch && userInfo &&
                <HomeChatSearchUser
                    list={list}
                    setOpenSearch={setOpenSearch}
                    userInfo={userInfo}
                />
            }




            {openChat &&
                <Col xs={10} sm={6} md={6} lg={3} className="div_flex" >


                    <div className="Chat_info">

                        <HomeChatUserTop
                            setIdChat={setIdChat}
                            userOpenImage={userOpenImage}
                            userOnlien={userOnlien}

                        />

                        <HomeChatShowMessage
                            userInfo={userInfo}
                            messagerallt={messagerallt}
                            userOpenImage={userOpenImage}
                        />

                        <HomeChatSendMessageFormUser
                         userInfo={userInfo}
                         socket={socket}
                         idChat={idChat}
                         setMessagerallt={setMessagerallt}
                         messagerallt={messagerallt}
                        />

                    </div>

                </Col>
            }




        </Row>







    )
}


export default NavBarChatBottom

