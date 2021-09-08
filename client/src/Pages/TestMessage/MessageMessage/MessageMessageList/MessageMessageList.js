import { format } from "timeago.js"
import { useSelector } from "react-redux"
import { useEffect, Fragment, useRef } from "react"
import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
const MessageMessageList = ({ idChat, userChat, messageAll, userOnline ,setIdChat}) => {



    // user info
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const scrollUseRef = useRef()


    useEffect(() => {

        scrollUseRef.current?.scrollIntoView();
        scrollUseRef.current?.scrollIntoView(false);
        scrollUseRef.current?.scrollIntoView({ block: "end" });
        scrollUseRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        // eslint-disable-next-line
    }, [messageAll])



    return (

        <>


            <div className="top_Imafge_Video" >

                <div className="className_left_message" onClick={()=> setIdChat(null)}>
                <i className="fas fa-arrow-left"></i>
                </div>




                {userChat?.[0]?.profileImage ?
                    <Link to={`/profile/${userChat?.[0]?._id}`}>
                        <LazyLoadImage src={userChat?.[0]?.profileImage}
                            className="top_Imafge_Video_Image"
                            alt={userChat?.[0]?.username}
                        />
                    </Link>
                    :
                    <Link to={`/profile/${userChat?.[0]?._id}`}>
                        <LazyLoadImage src={`../Image/user.png`}
                            className="top_Imafge_Video_Image"
                            alt={userChat?.[0]?.username}
                        />
                    </Link>


                }


                <span>{userChat?.[0]?.username}</span>

                {userOnline?.map((user, userIndex) => (

                    user?.userId === userChat?.[0]?._id ?
                        <span className="green" key={userIndex}>

                        </span>

                        : null

                ))}


                <div className="top_Imafge_Video_Icons">
                    <i class="fas fa-phone-alt"></i>
                    <i className="fas fa-video"></i>
                </div>


            </div>



            <div className="Message_show">



                {messageAll?.map((mss, messIndex) => (

                    <Fragment>

                        <div className={mss?.sender === userInfo._id ? "Message_show_me" : "Message_show_you"} key={messIndex}>

                            {userChat?.map((use) => (
                                use?._id === mss?.sender &&

                                

                                <LazyLoadImage src={use?.profileImage ? use?.profileImage : `../Image/user.png`}
                                    alt={use?.username}
                                    className="Message_show_you_Image"
                                    key={use}
                                />

                                

                               

                            ))}


                            <span ref={scrollUseRef} className={mss?.sender === userInfo._id ? "Text_Message_me" : "Text_Message"}>
                                {mss?.text}
                            </span>

                        </div>

                        <div className="timeChat">
                            <span className={mss?.sender === userInfo._id ? "left_time" : "left_user"}>
                                {format(mss?.date)}
                            </span>

                        </div>

                    </Fragment>

                ))}





            </div>


        </>
    )
}

export default MessageMessageList