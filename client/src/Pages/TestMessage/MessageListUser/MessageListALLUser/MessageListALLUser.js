
import { Row} from "react-bootstrap"
import MessageList from "./MessageList"
const MessageListALLUser = ({ convstationData, setIdChat, closeListUser ,list,openChatMessage }) => {







    return (


        <div className={openChatMessage ? "all_user_Image_user_infooprnNvaBar":"all_user_Image_user_info"}>

            {!closeListUser &&

                <>

                    {convstationData?.map((cov, covIndex) => (
                        <Row className="width_heigth" key={covIndex} onClick={() => setIdChat(cov)}>
                            <MessageList
                                cov={cov}
                                list={list}
                                openChatMessage={openChatMessage}

                            />
                        </Row>
                    ))}

                </>


            }



        </div>






    )
}

export default MessageListALLUser


