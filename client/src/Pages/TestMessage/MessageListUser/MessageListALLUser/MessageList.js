import {  Col } from "react-bootstrap"
import { Fragment, useEffect, useState } from "react"

import { useSelector } from "react-redux"
import { LazyLoadImage } from "react-lazy-load-image-component"
const MessageList = ({ cov, list, openChatMessage }) => {


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const [userGet, setUserGet] = useState(null)





    useEffect(() => {
        if (userInfo) {

            const listFilterUsers = cov?.users?.find((user) => user !== userInfo._id)

            setUserGet(list?.filter((uxs) => uxs?._id?.toString() === listFilterUsers?.toString()))
            // console.log('userGet', userGet)


        }
    }, [userInfo, cov, list])

    return (
        <>

            {userGet?.map((user, userIndex) => (
                <Fragment key={userIndex}>
                    <Col xs={openChatMessage ? "3" : "3"} sm={3}  md={3} lg={3} >
                        {user?.profileImage ?
                            <LazyLoadImage src={user?.profileImage}
                                className="all_user_Image_user_info_IMAGE"
                                alt={user?.username}
                            />

                            :
                            <LazyLoadImage src={`../Image/user.png`}
                                className="all_user_Image_user_info_IMAGE"
                                alt={user?.username}
                            />

                        }

                    </Col>

                    <Col xs={openChatMessage ? "7": "7"}  sm={7} md={7}  lg={7} >
                        {openChatMessage ?
                            <div className="add_lastMessage">
                                <span className="text_Name">{user?.username}</span>

                                <span>{cov?.lastMessage}</span>


                            </div>
                            :
                            <span className="text_Name">{user?.username}</span>
                        }


                    </Col>
                    <Col xs={openChatMessage ? "2": "2"} sm={2} md={2}  lg={2} >
                        <i className="fas fa-check"></i>
                    </Col>

                </Fragment>

            ))}

        </>
    )
}


export default MessageList

