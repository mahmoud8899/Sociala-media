import { Fragment, useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import "./MessageListUserSearch.css"
import {useSelector, useDispatch} from "react-redux"
import {CreateChatAction} from "../../../../redux/Action/chat_Action"
import {LazyLoadImage} from "react-lazy-load-image-component"
const MessageListUserSearch = ({ list, setCloseListUser, closeListUser,openChatMessage }) => {
    // user info
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

     const dispatch = useDispatch()

    const [searchInput, setSearchInput] = useState('')
    const [objectUsers, setObjectUsers] = useState()
  



   // console.log('searchInput',searchInput)


    useEffect(() => {

    
            if (searchInput) {
                 console.log(searchInput)
             setObjectUsers(list?.filter((val) => val?.username?.toLowerCase()?.includes(searchInput?.toLowerCase())))
                setCloseListUser(true)
             } else {
                 setSearchInput('')
                 setObjectUsers('')
                 return setCloseListUser(false)
             }
     
        

     


    }, [searchInput,userInfo,list,setCloseListUser])





    // close search... users... 
    const HandleCloseFilter = (e) => {
        e.preventDefault()
        setSearchInput(e.target.val = '')
        setObjectUsers('')
        return setCloseListUser(false)
    }


    // create user chat... 
    const HandleCreateChat = (e,idx) =>{
        e.preventDefault()

        dispatch(CreateChatAction({
            userId : userInfo?._id,
            lastId: idx,
            
        }))

        setTimeout(() => {
            setSearchInput(e.target.val = '')
            setObjectUsers('')
            return setCloseListUser(false)
        }, 2000);


        

    }








    return (
        <Fragment>
            <div className="top_messge_search">
                <h1>Chats</h1>
                <div className="top_messge_search_Icons">

                    <i className="fas fa-video"></i>
                    <i className="fas fa-edit"></i>
                </div>
            </div>





            <Col xs={10} sm={10} md={12} lg={12}>
                <div className="sEARCH_MESSA">
                    {closeListUser &&
                        <div onClick={(e) => HandleCloseFilter(e)}>
                            <i class="fas fa-long-arrow-alt-left"></i>
                        </div>
                    }
                    <input
                        type="text"
                        placeholder="Search Messenger"
                        className={closeListUser ? "Search_Messenger_add" : "Search_Messenger"}
                        onChange={(e) => setSearchInput(e.target.value)}
                        name="searchInput"
                        value={searchInput}
                    />
                    {!closeListUser && <i className="fas fa-search"></i>}



                </div>
            </Col>


            {closeListUser &&
                <div className="all_user_Image_user_info_xs">


                    {objectUsers?.map((user, userIndex) => (
                        <Row key={userIndex} className="row_xs" onClick={(e)=> HandleCreateChat(e, user?._id)}>

                            <Col xs={3} sm={3} md={3} lg={3} >
                                {user?.profileImage ?

                                    <LazyLoadImage src={user?.profileImage}
                                        className="all_user_Image_user_info_IMAGE_s"
                                        alt={user?.username}
                                    />

                                    :
                                    <LazyLoadImage src={`../Image/user.png`}
                                        className="all_user_Image_user_info_IMAGE_s"
                                        alt={user?.username}
                                    />
                                }

                            </Col>

                            <Col xs={8} sm={8} md={8} lg={8} >
                                <span className="text_Name">{user?.username}</span>
                            </Col>


                        </Row>


                    ))}


                </div>






            }

        </Fragment>

    )
}


export default MessageListUserSearch


