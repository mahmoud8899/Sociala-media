import { Col, Container, Row, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./Frinds.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import {
    UserList_Action,
    SendFrind_action,
    okejFriends_action,
    ConfirmFrindes_Action,
    firends_OkejAction,

} from "../../redux/Action/Auth_action"
import FrindsNavBar from "./FrindsNavBar/FrindsNavBar"

const ShowFrinds = ({history}) => {



    const [navBarRequires, setNavBarRequires] = useState(false)
    const [openConfim, setOpenConfim] = useState(false)
    // setOpenConfim

    const dispatch = useDispatch()


    // list users... 
    const userlistID = useSelector((state) => state.userlistID)
    const { userlist } = userlistID

    // user Info.... 
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    // send Frinds... 
    const sendfriendID = useSelector((state) => state.sendfriendID)
    const { success: successSendfriendID } = sendfriendID


    // show all requires okejfrindID
    const okejfrindID = useSelector((state) => state.okejfrindID)
    const { AllRequires } = okejfrindID


    // confirm await send friend me. 
    const confirmFriendUser = useSelector((state) => state.confirmFriendUser)
    const { confirmFriends } = confirmFriendUser


    // ok friends for await for me.. 
   // const firendsOkejIDuSerID = useSelector((state) => state.firendsOkejIDuSerID)
   // const { okFrinds } = firendsOkejIDuSerID

    // console.log()

    // requires open 
    useEffect(() => {

       if(userInfo){
        if (navBarRequires || userInfo) {
            //console.log('yes', navBarRequires)
            dispatch(okejFriends_action({ _id: userInfo._id }))
        }

       }else{
           history.push('/') 
       }
    }, [dispatch, navBarRequires, userInfo,history])



    // confirm 
    useEffect(() => {

          if(userInfo){
            if (openConfim || userInfo) {
                dispatch(ConfirmFrindes_Action(userInfo._id))
            }
          }else{
              history.push('/') 
          }

    }, [openConfim, dispatch, userInfo,history])





    // requires... with send friends..
    useEffect(() => {

         if(userInfo){
            dispatch(UserList_Action())
         }else{
             history.push('/')
         }
       

    }, [dispatch, userInfo, successSendfriendID,history])



    // send friends...
    const HandleSendFriends = (e, idremove) => {
        e.preventDefault()
        dispatch(SendFrind_action({ _id: userInfo._id, sendFriend: idremove }))
        console.log('cliek', idremove)
    }



    // okej friend for wait for me.. 
    const HandleConfirm = (e, idx) => {
        e.preventDefault()

        dispatch(firends_OkejAction({ _id: userInfo._id, userId: idx  }))
        console.log('click', idx)
    }

    return (
        <Container fluid>
            <Row className="justify-content-center">


                <FrindsNavBar
                    setNavBarRequires={setNavBarRequires}
                    setOpenConfim={setOpenConfim}
                />






                {!openConfim ?

                    <>

                        {!navBarRequires ?



                            <Col xs={12} sm={6} md={8} lg={9} >
                                <div className=" add_bottom">

                                    <div className="navBar_friends">
                                        <h1>People you may know</h1>
                                        <span>see all</span>
                                    </div>

                                    <Row className="justify-content-center  testw">




                                        {userlist?.map((user, userIndex) => (
                                            <Col xs={6} sm={6} md={4} lg={2} className="col_className testww" key={userIndex}>

                                                <div className="col_box_with">
                                                    <Link className="Link_navBAR" to={`/profile/${user?._id}`}>
                                                        {user?.profileImage ?
                                                            <Image src={user?.profileImage} alt="" className="Image_items_friends" />
                                                            :
                                                            <Image src={`../Image/user.png`} alt="" className="Image_items_friends" />

                                                        }

                                                    </Link>

                                                    <span className="firends_name_textx">{user?.username}</span>

                                                    <div className="firends_LIST">
                                                        <Image src={`../Image/me.jpg`} alt={user?.username} className="Image_items_friends_first" />
                                                        <Image src={`../Image/me.jpg`} alt={user?.username} className="Image_items_friends_last" />
                                                        <span className="hOW_MATCH_friends"> 12 mutual friends</span>
                                                    </div>

                                                    <span className="add_friend_friends" onClick={(e) => HandleSendFriends(e, user?._id)}>Add Friend</span>
                                                    <span className="add_friend_friends_remove">Remove</span>
                                                </div>


                                            </Col>
                                        ))}



                                    </Row>



                                </div>
                            </Col>


                            :

                            <Col xs={12} sm={6} md={8} lg={9} >
                                <div className=" add_bottom">

                                    <div className="navBar_friends">
                                        <h1>People you may know</h1>
                                        <span>see all</span>
                                    </div>

                                    <Row className="justify-content-center">




                                        {AllRequires?.map((requiret, requiretIndex) => (
                                            <Col xs={6} sm={6} md={4} lg={3} className="col_className testww" key={requiretIndex}>

                                                <div className="col_box_with">

                                                    <Link className="Link_navBAR" to={`/profile/${requiret?._id}`}>
                                                        {requiret?.profileImage ?
                                                            <Image src={requiret?.profileImage} alt="" className="Image_items_friends" />
                                                            :
                                                            <Image src={`../Image/user.png`} alt="" className="Image_items_friends" />

                                                        }

                                                    </Link>

                                                    <span className="firends_name_textx">{requiret?.username}</span>

                                                    <div className="firends_LIST">
                                                        <Image src={`../Image/me.jpg`} alt={requiret?.username} className="Image_items_friends_first" />
                                                        <Image src={`../Image/me.jpg`} alt={requiret?.username} className="Image_items_friends_last" />
                                                        <span className="hOW_MATCH_friends"> 12 mutual friends</span>
                                                    </div>

                                                    <span className="add_friend_friends" onClick={(e) => HandleSendFriends(e, requiret?._id)}>
                                                        Cancel Friend
                                                    </span>
                                                </div>
                                            </Col>
                                        ))}



                                    </Row>



                                </div>
                            </Col>


                        }

                    </>
                    :
                    <Col xs={12} sm={6} md={8} lg={9} >
                        <div className=" add_bottom">

                            <div className="navBar_friends">
                                <h1>People you may know</h1>
                                <span>see all</span>
                            </div>

                            <Row className="justify-content-center">




                                {confirmFriends?.map((comfi, comfiIndex) => (
                                    <Col xs={6} sm={6} md={4} lg={3} className="col_className testww" key={comfiIndex}>

                                        <div className="col_box_with">

                                            <Link className="Link_navBAR" to={`/profile/${comfi?._id}`}>
                                                {comfi?.profileImage ?
                                                    <Image src={comfi?.profileImage} alt="" className="Image_items_friends" />
                                                    :
                                                    <Image src={`../Image/user.png`} alt="" className="Image_items_friends" />

                                                }

                                            </Link>

                                            <span className="firends_name_textx">{comfi?.username}</span>

                                            <div className="firends_LIST">
                                                <Image src={`../Image/me.jpg`} alt={comfi?.username} className="Image_items_friends_first" />
                                                <Image src={`../Image/me.jpg`} alt={comfi?.username} className="Image_items_friends_last" />
                                                <span className="hOW_MATCH_friends"> 12 mutual friends</span>
                                            </div>

                                            <div className="buttom_ok_friends">
                                                <span className="buttom_ok_friends_Confirm"
                                                    onClick={(e) => HandleConfirm(e, comfi?._id)}
                                                >
                                                    Confirm
                                                </span>
                                                <span className="buttom_ok_friends_buttom_remove" >
                                                    Remove
                                                </span>
                                            </div>
                                        </div>
                                    </Col>
                                ))}



                            </Row>



                        </div>
                    </Col>
                }




            </Row>
        </Container>
    )



}


export default ShowFrinds
