import { Col, Image } from "react-bootstrap"
import { CreateChatAction } from "../../../../redux/Action/chat_Action"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"


const HomeChatSearchUser = ({ list, userInfo, setOpenSearch }) => {


    const dispatch = useDispatch()

    // search from user. and create Chat.

    const [searchInput, setSearchInput] = useState()
    const [objectList, setObjectList] = useState()
    useEffect(() => {

        if (searchInput) {
            setObjectList(searchInput ? list?.filter((val) => val?.username.toLowerCase().includes(searchInput?.toLowerCase())) : null)
        }

    }, [searchInput, list])


    // create chat with user.
    const HandleCreateUser = (e, idx) => {
        e.preventDefault()
        dispatch(CreateChatAction({
            userId: idx,
            lastId: userInfo._id,
        }))
        return setOpenSearch(false)


    }



    return (
        <Col xs={10} sm={6} md={6} lg={3} className="div_flex" >


            <div className="Chat_info">

                <div className="Chat_info_User_top">

                    <span className="Chat_info_User_username asxsss">Search Messenger</span>

                    <span className="Chat_info_User_Icons" onClick={() => setOpenSearch(false)}>
                        <i class="fas fa-times color_eee"></i>
                    </span>

                </div>

                <div className="search_list_users">
                    <input
                        type="text"
                        className="search_list_users_Search"
                        placeholder="Search for a name or group"
                        onChange={(e) => setSearchInput(e.target.value)}
                        name="searchInput"
                    />
                </div>


                <div className="message_user_all">



                    {objectList?.map((resu, resuIndex) => (
                        <div className="all_list_search" key={resuIndex} onClick={(e) => HandleCreateUser(e, resu?._id)}>
                            {resu?.profileImage ?

                            
                                <Image src={resu?.profileImage} alt={resu?.username} className="Chat_info_User_Image" />
                                :
                                <Image src={`../Image/user.png`} alt={resu?.username} className="Chat_info_User_Image" />

                            }

                            <span className="message_user_One_text">{resu?.username}</span>
                        </div>

                    ))}




                </div>







            </div>






        </Col>
    )
}


export default HomeChatSearchUser