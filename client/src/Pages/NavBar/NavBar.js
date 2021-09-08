import "./NavBar.css"
import { Container, Row, Navbar, Nav, Form,  Col } from "react-bootstrap"
import { useEffect, useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { LogoUt_action, ListUsersAction } from "../../redux/Action/Auth_action"
import MessageListUser from "../TestMessage/MessageListUser/MessageListUser"
import { textCount, noeXOS } from "../../App"
import Notifications from "./Notifications/Notifications"
import { LazyLoadImage } from "react-lazy-load-image-component"

const NavBar = () => {







    const [isProfile, setIsProfile] = useContext(noeXOS)
    const [idChat, setIdChat] = useContext(textCount)

    // console.log(isProfile)

    // list chat user... 
    const listchat = useSelector((state) => state.listchat)
    const { listChatUser: convstationData } = listchat








    const dispatch = useDispatch()



    // userInfo.. 
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    // all users.. 
    const listSUsers = useSelector((state) => state.listSUsers)
    const { list } = listSUsers



    // all post 
    const listpost = useSelector((state) => state.listpost)
    const { post } = listpost



    // all users...
    useEffect(() => {
        dispatch(ListUsersAction())
    }, [dispatch])













    const [openSearch, setOpenSearch] = useState(false)
    const [searchInput, setSearchInput] = useState()
    const [objectList, setObjectList] = useState()



    useEffect(() => {

        if (searchInput) {
            setObjectList(searchInput ? list?.filter((val) => val?.username.toLowerCase().includes(searchInput?.toLowerCase())) : null)
        }

    }, [searchInput, userInfo, list])
    // let mahmodu = 
    // console.log('searchInput', objectList)
    const HandleSearch = (e) => {
        e.preventDefault()
    }



    // open chat message ... 
    const [openChatMessage, setOpenChatMessage] = useState(false)
    const HandleOpenChatMessage = (e) => {
        e.preventDefault()
        if (openChatMessage) {
            return setOpenChatMessage(false)
        } else {
            return setOpenChatMessage(true)
        }
    }



    // natifation ... 
    const [openNotification, setOpenNotification] = useState(false)

    const HandelNotifation = (e) => {
        e.preventDefault()
        if (openNotification) {


            return setOpenNotification(false)



        } else {

            return setOpenNotification(true)

        }
    }



    // show User List profile
    const [listNavBar, setListNavBar] = useState(false)
    const HandleOpen = (e) => {
        e.preventDefault()

        if (listNavBar) {
            return setListNavBar(false)
        } else {
            return setListNavBar(true)
        }

    }




    useEffect(() => {

        if (openNotification) {
            setListNavBar(false)
            setOpenChatMessage(false)
        }

        if (listNavBar) {
            setOpenNotification(false)
            setOpenChatMessage(false)
        }

        if (openChatMessage) {
            setOpenNotification(false)
            setListNavBar(false)
        }

    }, [openNotification,
        listNavBar,
        openChatMessage,

    ])



    return (
        <Container>
            {idChat && <span className="add_hidden"></span>}
            {setIsProfile && <span className="add_hidden"></span>}
            <Row>

                <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top">


                    <Col xs={8} sm={1} md={3} lg={3}>
                        <Form className="nav_bar_Search">
                            <Link className="Link_Home" to={'/'}>
                                {openSearch ?
                                    <i className="fas fa-arrow-left addColor_color"
                                        onClick={() => setOpenSearch(false)}></i>
                                    :
                                    <h1>PL</h1>

                                }

                            </Link>
                            <div className="search_box_navbar" onClick={() => setOpenSearch(true)}>
                                <input
                                    type="email"
                                    placeholder="Search"
                                    className={openSearch ? "input_search_navbar left_left" : "input_search_navbar"}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    name="search"
                                    onKeyPress={(e) => e.key === 'Enter' ? HandleSearch(e) : null}
                                />
                                {!openSearch && <i className="fas fa-search"></i>}

                            </div>
                            {openSearch &&

                                <div className="Search_result_users">
                                    <ul className="Search_result_users_lIST">

                                        {objectList?.map((user, userIndex) => (
                                            <Link className="Link_navBAR" to={`/profile/${user?._id}`}
                                                onClick={() => setOpenSearch(false)}>
                                                <li key={userIndex}  >
                                                    {user?.profileImage ?
                                                        <LazyLoadImage src={user?.profileImage} alt={user?.username} className="Search_result_usersImage" />
                                                        :
                                                        <LazyLoadImage src={`../Image/user.png`} alt={user?.username} className="Search_result_usersImage" />

                                                    }

                                                    <span>{user?.username}</span>
                                                </li>
                                            </Link>
                                        ))}


                                    </ul>

                                </div>
                            }

                        </Form>

                    </Col>



                    <Navbar.Toggle className="x_bav" />

                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav className="me-auto List_NavBAR">
                            <span className={isProfile === null ? "addBorder_bottom" : ""} >

                                <i className={isProfile === null ? "fas fa-home" : "fas fa-home addColor_mexxxx"}></i>

                            </span>
                            <span>
                                <i className="fas fa-users"></i>
                            </span>
                            <span>
                                <i className="fas fa-heart"></i>
                            </span>
                        </Nav>


                    </Navbar.Collapse>



                    {
                        userInfo ?


                            <div className="x_filex">

                                <div className={isProfile ? "First_userLogin addColor_Profile_User" : "First_userLogin"}>
                                    {userInfo?.profileImage ?
                                        <Link className="link_home_profile" to={`/profile/${userInfo._id}`}>
                                            <LazyLoadImage src={userInfo.profileImage} alt="" className="Image_User_nANbar" />
                                            <span>{userInfo.username}</span>
                                        </Link>
                                        :
                                        <Link className="link_home_profile" to={`/profile/${userInfo._id}`}>
                                            <LazyLoadImage src={`../Image/user.png`} alt="nice photo" className="Image_User_nANbar" />
                                            <span>{userInfo.username}</span>
                                        </Link>

                                    }
                                </div>

                                <div className="First_Message_chat" onClick={(e) => HandleOpenChatMessage(e)}>
                                    <i className="fab fa-facebook-messenger"></i>

                                    {openChatMessage &&
                                        <div className="First_Message_chat_div">
                                            <MessageListUser
                                                convstationData={convstationData}
                                                list={list}
                                                openChatMessage={openChatMessage}
                                                setIdChat={setIdChat}
                                            />


                                            <span className="see_message">
                                                <Link className="not_hover" to={`/message/`}>
                                                    See All in messenger
                                                </Link>
                                            </span>
                                        </div>

                                    }

                                </div>

                                <div className="First_Message notifa" onClick={(e) => HandelNotifation(e)}>
                                    <i className="fas fa-bell"></i>

                                    {post?.length === 0 ? null :
                                        <span className="notifa_current">{post?.length}</span>
                                    }

                                    <Notifications
                                        openNotification={openNotification}
                                        post={post}
                                    />
                                </div>


                                <div className="First__down" onClick={(e) => HandleOpen(e)}>
                                    <i className="fas fa-chevron-down"></i>
                                    {listNavBar &&



                                        <ul className="Down_list">


                                            <li className="List__down">
                                                <Link className="List__down" to={`/profile/${userInfo._id}`}>
                                                    {userInfo.profileImage ?
                                                        <LazyLoadImage src={userInfo.profileImage} alt={userInfo?.username} className="Image_down" />
                                                        :
                                                        <LazyLoadImage src={`../Image/user.png`} alt="nice photto" className="Image_down" />
                                                    }

                                                    <div className="List__down_text">
                                                        <span className="first_List__down_text">{userInfo?.username}</span>
                                                        <span className="last_List__down_text">See Your Profile</span>
                                                    </div>
                                                </Link>
                                            </li>




                                            <li className="Sttingc_div" >
                                                <Link className="List__down" to={`/profile/${userInfo._id}`}>
                                                    <i className="fas fa-cog icons_color"></i>

                                                    <span>Settings & Privacy</span>
                                                    <i className="fas fa-chevron-right"></i>
                                                </Link>


                                            </li>

                                            <li className="LogOut" onClick={() => dispatch(LogoUt_action())}>
                                                <i className="fas fa-sign-out-alt"></i>

                                                <span>Log Out</span>


                                            </li>

                                            <li className="Food_NabVA">
                                                <span>
                                                    Privacy Terms. Advertising,
                                                    More , Up @ 2021
                                                </span>

                                            </li>






                                        </ul>

                                    }
                                </div>



                            </div>

                            :
                            <Link  className="Link_add"  to={`/login`}>
                                <span className="lOGIN_navBar_first">
                                    login
                                </span>
                            </Link>

                    }





                </Navbar>

            </Row>



        </Container>
    )


}


export default NavBar


