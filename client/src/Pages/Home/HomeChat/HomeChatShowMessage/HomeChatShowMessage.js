import { useRef, useEffect } from "react"
import { Image } from "react-bootstrap"
import { format } from "timeago.js"
import "./HomeChatShowMessage.css"
const HomeChatShowMessage = ({ messagerallt, userInfo, userOpenImage }) => {

    const scrollUseRef = useRef()

    useEffect(() => {

        scrollUseRef.current?.scrollIntoView();
        scrollUseRef.current?.scrollIntoView(false);
        scrollUseRef.current?.scrollIntoView({ block: "end" });
        scrollUseRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        // eslint-disable-next-line
    }, [messagerallt])


    return (
        <>
            {
                userInfo ?

                    <div className="message_user_all">

                        {
                            messagerallt?.map((mess, messIndex) => (

                                <div className={mess?.sender === userInfo._id ? "message_user_athor" : "message_user_One"} key={messIndex}>


                                    {userOpenImage?.map((user, userIndex) => (

                                        mess?.sender === user?._id ?
                                            <Image
                                                src={user?.profileImage ? user?.profileImage : `../Image/user.png`}
                                                alt="hello photo"
                                                className="Chat_info_User_Image"
                                                key={userIndex}
                                            />
                                            : null

                                    ))}

                                    <span
                                        className={mess?.sender === userInfo._id ? "message_user_One_text" : "message_user_One_text"}
                                        ref={scrollUseRef}
                                    >{mess?.text}</span>

                                    <p className="time_chat">{format(mess?.date)}</p>
                                </div>

                            ))
                        }




                    </div >
                    : null
            }

        </>

    )
}


export default HomeChatShowMessage