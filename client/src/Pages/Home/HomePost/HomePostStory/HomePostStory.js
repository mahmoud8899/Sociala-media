import { Row, Col } from "react-bootstrap"
import "./HomePostStory.css"
import { useSelector, useDispatch } from "react-redux"
import { useState, Fragment, useEffect } from "react"
import { CreateStoryAction } from "../../../../redux/Action/Auth_action"
import axios from "axios"
import { Link } from "react-router-dom"
import {LazyLoadImage} from "react-lazy-load-image-component"
const HomePostStory = () => {


    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    // ALL story..
    const allstoryID = useSelector((state) => state.allstoryID)
    const { allStory } = allstoryID
    //console.log('allStory')


    // uploading Image.. 
    const [uploadingImage, setUploadingImage] = useState(false)
    const HandleUploading = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploadingImage(true)
        try {

            const { data } = await axios.post(`/api/`, formData)
            dispatch(CreateStoryAction({
                image: data
            }))
            setUploadingImage(false)
        } catch (error) {
            console.error(error)
            setUploadingImage(false)
        }
        // console.log(file)
    }




    const [openOpenImage, setOpenOpenImage] = useState(false)
    const [imageProfile, setImageProfile] = useState('')
    const [arrayImage, setArrayImage] = useState(null)
    const [onlyImage, setOnlyImage] = useState(null)
    const [current, setCurrent] = useState(0)

    const arrayLingth = arrayImage ? arrayImage?.image?.length : null
    //  console.log('current :', current, 'arrayLingth :', arrayLingth, 'imageProfile :', imageProfile)

    useEffect(() => {

        if (openOpenImage === false) {
            setCurrent(0)
            setArrayImage(null)
            setImageProfile('')

        } else {
            setOnlyImage(arrayImage?.image?.[current])
        }



    }, [openOpenImage, current, setOnlyImage, imageProfile, arrayImage])




    const HandleAllImageSlider = (e, xo, stor) => {
        e.preventDefault()
        setArrayImage(stor)
        setImageProfile(stor.user)
        setOnlyImage(stor?.image?.[current])
        setOpenOpenImage(true)
    }


    const HandleRight = () => {

        if (current === arrayLingth - 1) return null

        return setCurrent((prev) => prev + 1)




    }



    const HandleLeft = () => {

        if (current === 0) return null
        return setCurrent((prev) => prev - 1)



    }











    return (
        <Fragment>
            <Row className="test_test">

                {userInfo ?
                    allStory?.length >= 2 ?

                        <div className="Next_i">
                            <i className="fas fa-arrow-right"></i>
                        </div>
                        :
                        null
                    : null

                }

                {userInfo &&
                    <Col xs={4} sm={3} md={3} lg={3} className="tesxeee">

                        <div className="Create_Story">
                           
                                {userInfo?.profileImage ?
                                    <LazyLoadImage
                                        src={userInfo?.profileImage}
                                        alt={userInfo?.username}
                                        className="Create_Story_Image" />
                                    :
                                    <LazyLoadImage
                                        src={`../Image/user.png`}
                                        alt={userInfo?.username}
                                        className="Create_Story_Image" />

                                }


                         


                            <span className="Xp_Story_Tol">
                                <i className="fas fa-plus">
                                    <input
                                        type="file"
                                        className="File_uPLOADING_Story"
                                        onChange={HandleUploading}
                                        name="image"
                                    />
                                </i>

                            </span>

                            <span>Create story</span>
                        </div>

                    </Col>
                }






                {allStory?.map((story, storyIndex) => (


                    <Col xs={4} sm={3} md={3} lg={3} className="tesxeee" key={storyIndex}>


                        <div className="Create_Story">

                       
                                {story?.user?.profileImage ?
                                    <LazyLoadImage
                                        src={story?.user?.profileImage}
                                        alt={story?.user?.username}
                                        className="Create_Story_Image_tody"

                                    />

                                    :
                                    <LazyLoadImage
                                        src={`../Image/user.png`}
                                        alt={story?.user?.username}
                                        className="Create_Story_Image_tody"

                                    />
                                }

                    



                            <p className="User_Story_xeewewe">{story?.user?.username}</p>

                            {story?.image.map((imx, imxIndex) => (


                               
                                    <LazyLoadImage
                                        key={imxIndex}
                                        src={imx}
                                        alt="pric photo"
                                        className="Create_Story_Image_tody_last"
                                        onClick={(e) => HandleAllImageSlider(e, imx, story)}

                                    />
                               

                            ))}


                        </div>






                    </Col>



                ))}






            </Row>






            {openOpenImage &&
                <div className="add_Image_open open">

                    <Row className="justify-content-center" >

                        <Col xs={11} sm={11} md={11} lg={11} className="postionx" >
                            <div className="close_photo">
                                <i className="fas fa-times" onClick={() => setOpenOpenImage(false)}></i>
                                <Link className="add_Link_Profile" to={`/`}>
                                    <span>Upp</span>
                                </Link>

                                <div className="Zoom_ut">
                                    <i className="fas fa-search-plus"></i>
                                    <i className="fas fa-search-minus"></i>
                                </div>

                            </div>
                        </Col>





                        <Col xs={10} sm={9} md={6} lg={6} className="postion_xp" >
                            <span className="image_xspostion">
                           
                                    <LazyLoadImage
                                        src={onlyImage}
                                        className="imag_whidth"
                                        alt="nice photo"

                                    />
                             

                                <div className="Loading_current">

                                </div>
                                <div className="Loading_user">
                                  
                                        {imageProfile?.profileImage ?
                                            <Link to={`/profile/${imageProfile?._id}`} >
                                                <LazyLoadImage
                                                    src={imageProfile?.profileImage}
                                                    alt={imageProfile?.username}
                                                    className="Image_router_info"

                                                />
                                            </Link>

                                            :
                                            <Link to={`/profile/${imageProfile?._id}`} >
                                                <LazyLoadImage
                                                    src={`../Image/user.png`}
                                                    alt={imageProfile?.username}
                                                    className="Image_router_info"

                                                />
                                            </Link>

                                        }
                               



                                    <span>{imageProfile?.username}</span>
                                    <span> 20.02.2021</span>
                                </div>
                            </span>
                            <i className="fas fa-chevron-left " onClick={(e) => HandleLeft(e)}></i>
                            <i className="fas fa-chevron-right " onClick={(e) => HandleRight(e)}></i>


                        </Col>

                    </Row>
                </div>
            }


            {uploadingImage && <span>Loading....</span>}

        </Fragment>

    )
}




export default HomePostStory