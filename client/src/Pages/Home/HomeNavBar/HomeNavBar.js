import "./HomeNavBar.css"
import { Col, Image } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const HomeNavBar = () => {


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    // console.log('userLogin',userInfo)
    return (


        <Col xs={12} sm={12} md={3} lg={3} className="d-none d-md-block ">

            <div className="test_Postion">
                {userInfo &&
                    <div className="test_navBAR ">

                        <div className="Image_Profile_Home">
                            {userInfo?.profileImage ?
                                <Link className="Link_navBAR" to={`/profile/${userInfo?._id}`} alt={userInfo?.username}>
                                    <Image src={userInfo?.profileImage} className="Image_Profile_Home_me" />
                                    <span>{userInfo?.username}</span>
                                </Link>

                                :
                                <Link className="Link_navBAR" to={`/profile/${userInfo?._id}`}>
                                    <Image src={`../Image/user.png`} className="Image_Profile_Home_me" />
                                    <span>{userInfo?.username}</span>
                                </Link>

                            }

                        </div>

                        <div className="firends_Like">
                            <Link className="Link_navBAR" to={`/frinds`}>
                                <i className="fas fa-user-friends color_Bule"></i>
                                firends
                            </Link>

                        </div>



                        <div className="firends_Like">
                            <i className="fas fa-flag alam"></i>
                            pages
                        </div>

                        <div className="firends_Like">
                            <i className="fas fa-clock klocka_time"></i>
                            memories
                        </div>

                        <div className="firends_Like">
                            <i className="far fa-calendar-alt color_white"></i>
                            event
                        </div>





                        <div className="firends_Like solid_bottom">
                            <i className="fas fa-chevron-circle-down color_lsat"></i>
                            see More
                        </div>






                    </div>
                }
            </div>

        </Col>


    )
}

export default HomeNavBar