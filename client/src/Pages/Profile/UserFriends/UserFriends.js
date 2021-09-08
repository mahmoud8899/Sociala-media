
import { Col, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import "./UserFriends.css"
import {Link} from "react-router-dom"
import {LazyLoadImage} from "react-lazy-load-image-component"
const UserFriends = ({ setOpenPhotos, setOpenFrinds, userid, setImagePhoto }) => {



    //   const [imageslice, setImageslice] = useState()
    // check userInfo....
    // const userLogin = useSelector((state) => state.userLogin)
    //  const { userInfo } = userLogin


    const listFrindsID = useSelector((state) => state.listFrindsID)
    const { listfirend } = listFrindsID
    // console.log(listfirend?.[0])

    const usePX = userid?.Albums?.slice(0, 9)




    //console.log('usePX', usePX)

    // setImageslice(userid?.Albums?.slice(1, 9))
    // console.log(userid?.Albums?.slice(1, 4))


    const HandlePhoto = (e, im) => {
        e.preventDefault()
        //  console.log(im)
        return setImagePhoto(im)
    }


    return (
        <Col xs={12} sm={12} md={6} lg={3}>


            <div className="box-photo">

                <div className="ALLphoto">
                    <span className="text_xp">Photos {userid?.Albums?.length}</span>
                    <span className="text_se_photo" onClick={() => setOpenPhotos(true)}   >See All Photos</span>
                </div>

                <Row className="justify-content-center">

                    {usePX?.map((im, imIndex) => (
                        <Col xs={4} ms={4} md={4} lg={4} className="ImgE_ME">

                            <LazyLoadImage key={imIndex} src={im} className="image_cart_me" onClick={(e) => HandlePhoto(e, im)} />

                        </Col>
                    ))}




                </Row>


            </div>

            <div className="test_uppsala" >
                <div className="first_current_friends">
                    <span className="Friends">
                        <h1>Friends</h1>
                        <span>{listfirend?.length} Friends</span>
                    </span>
                    <span className="All_friends" onClick={() => setOpenFrinds(true)}>
                        See All Friends
                    </span>
                </div>




                <div className="All_cart_Image_Friends">

                    <Row className="justify-content-center">

                        {listfirend?.map((sup, supIndex) => (
                            <Col xs={4} ms={4} md={4} lg={4} className="ImgE_ME" key={supIndex}>

                                <Link to={`/profile/${sup?._id}`}>
                                    {sup?.profileImage ?
                                        <LazyLoadImage src={sup?.profileImage} alt={sup?.username} className="image_cart_me" />
                                        :
                                        <LazyLoadImage src={`../Image/all.jpg`} alt="photo nice" className="image_cart_me" />
                                    }
                                </Link>

                                <span className="text_box_usern">{sup?.username}</span>

                            </Col>
                        ))}




                    </Row>






                </div>




            </div>




        </Col>
    )
}


export default UserFriends

