import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import { Col,  Card, Row } from "react-bootstrap"
import "./UserPost.css"
import _ from "lodash"
import { CreatePost_action, PostUpdate_action } from "../../../redux/Action/post_action"
import { useDispatch, useSelector } from "react-redux"

import { LazyLoadImage } from 'react-lazy-load-image-component';
const UserPost = ({ userid, setIdPostEdit, idPostEdit, postID, changeToPOst }) => {


    // let userEdit = postID ? postID.filter((check) => check._id === idPostEdit) : null


    // console.log('userEdit', userEdit)
    // check userInfo....
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    const dispatch = useDispatch()
    const [openPost, setOpenPost] = useState(false)
    const [uploding, setUploding] = useState(false)
    const [textpost, setTextpost] = useState()
    const [uploadedImgs, setUplodedImgs] = useState()
    const [userEdit, setUserEdit] = useState([])


    // console.log(uploadedImgs?.length)

    // console.log(textpost)
    useEffect(() => {


        if (idPostEdit) {

            setUserEdit(postID ? postID.filter((check) => check._id === idPostEdit) : null)


            setTextpost(userEdit ? userEdit?.[0]?.textpost : null)
            setUplodedImgs(userEdit ? userEdit?.[0]?.image : null)
            // console.log('yes')
            return setOpenPost(true)
        }

    }, [idPostEdit, openPost, postID])


    const UploadingPost = async (e) => {
        e.preventDefault()
        let { files } = e.target;

        let formData = new FormData();
        _.forEach(files, file => {
            formData.append('image', file);
        });


        setUploding(true)
        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',

                }
            }
            const { data } = await axios.post(`/api/work/`, formData, config)
            // console.log('data', data)
            setUplodedImgs(data)
            setUploding(false)



        } catch (error) {
            console.error(error)
            setUploding(false)

        }
    }



    // show one Image ... 
    const [openImage, setOpenImage] = useState(false)
    const [saveImage, setSaveImage] = useState('')
    const HandleImage = (e, id) => {
        e.preventDefault()
        //  console.log('Image', id)
        setOpenImage(true)
        setSaveImage(id)
    }

    const HandleResult = (e) => {
        e.preventDefault()



        if (idPostEdit) {

            if (textpost || uploadedImgs) {

                dispatch(PostUpdate_action({
                    _id: userEdit?.[0]?._id,
                    textpost,
                    image: uploadedImgs
                }))

                console.log('Edit...')
                setTextpost(e.target.value = '')
                setUplodedImgs(e.target.value = '')
                setIdPostEdit('')
                return setOpenPost(false)

            }


        } else {



            if (textpost) {

                dispatch(CreatePost_action({
                    textpost,
                    image: uploadedImgs
                }))
                console.log('create...')
                setTextpost(e.target.value = '')
                setUplodedImgs(e.target.value = '')
                return setOpenPost(false)

            }




        }

    }







    // remove image ... 
    const HandleRemove = (e, id) => {
        e.preventDefault()
        return setUplodedImgs((value) => [...value.filter((val) => val !== id)])
    }





    return (

        <Fragment>



            {userInfo ?
                <Col xs={12} sm={changeToPOst ? "12" : "8"} md={changeToPOst ? "12" : "6"} lg={changeToPOst ? "12" : "5"} >

                    <div className="cart_create" >
                        <div className="cart_create_post">
                         
                                {userid?.profileImage ?

                                    <LazyLoadImage src={`${userid?.profileImage}`} alt={userid?.username} className="cart_create_Image" />

                                    :
                                    <LazyLoadImage src={'../Image/user.png'} alt="nice photo" className="cart_create_Image" />

                                }
                       


                            <span className="Input_xp" onClick={() => setOpenPost(true)}
                            >what is yout mind  {userInfo.username}?</span>
                        </div>
                        <div className="cart_create_onder">
                            <span className="color_red">
                                <i className="fas fa-video"></i>
                                <span>live video</span>
                            </span>
                            <span className="color_grren">
                                <i className="far fa-images"></i>
                                <span> photo/video</span>
                            </span>


                            <span className="color_blue">
                                <i className="fab fa-font-awesome-flag"></i>
                                <span>life event</span>

                            </span>
                        </div>

                    </div>


                </Col>

                :
                <Col xs={12} sm={8} md={6} lg={5} >

                    <div>

                    </div>
                </Col>
            }









            {openPost &&


                <div className="Add_open_Adress open">
                    <Row className="justify-content-center">
                        <Col xs={10} sm={10} md={8} lg={6}>


                            <Card className="z_index_cart">
                                <Card.Text className="Crate_public_post">
                                    <span className="Add_color_xs">Create Post</span>
                                    <i className="fas fa-times-circle" onClick={() => {
                                        setOpenPost(false)
                                        setIdPostEdit('')
                                    }}></i>
                                </Card.Text>
                                <div className="first_public_me">
                                   
                                        {userid?.profileImage ?
                                            <LazyLoadImage src={`${userid?.profileImage}`} alt={userid?.username} className="image_user_info" />
                                            :
                                            <LazyLoadImage  src={'../Image/user.png'} alt="nice photo" className="image_user_info" />

                                        }
                                 


                                    <Card.Text className="public_me">
                                        <span className="mahmoud">{userid?.username}</span>
                                        <span className="icons_Public">
                                            <i class="fas fa-globe-asia"></i>
                                            <span>Public</span>
                                            <i class="fas fa-sort-down"></i>

                                        </span>
                                    </Card.Text>
                                </div>

                                <Card.Text className="text_xs">

                                    <input
                                        type="text"
                                        placeholder="What is on your mind , Mahmoud ?"
                                        className="input_post_create_x"
                                        name="textpost"
                                        onChange={(e) => setTextpost(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' ? HandleResult(e) : null}
                                        value={textpost}

                                    />

                                    <i class="far fa-smile color_yerl"></i>
                                    {uploding && <span> uploding....</span>}


                                </Card.Text>

                                {uploadedImgs?.length > 0 ?
                                    <Card.Text className="xp_olik">
                                        {uploadedImgs ? uploadedImgs?.map((im, imIndex) => (
                                           <Fragment>
                                                <LazyLoadImage
                                                    key={imIndex}
                                                    src={`/${im}`}
                                                    alt="nic Photo"
                                                    className="Image_uploading_d"
                                                    onClick={(e) => HandleImage(e, im)}

                                                />
                                                <i class="fas fa-times-circle color_and_close" onClick={(e) => HandleRemove(e, im)}></i>
                                          
                                           </Fragment>



                                        )) : null}
                                    </Card.Text>

                                    : null

                                }




                                <Card.Text className="posst_video_photo">

                                    <span className="Add_to_Your_Post">
                                        Add to Your Post
                                    </span>
                                    <span className="Icons_Post_create">

                                        <i class="fas fa-images color_grren">
                                            <input
                                                type="file"
                                                className="Uploading_createPost"
                                                name="image"
                                                onChange={UploadingPost}
                                                multiple
                                                onKeyPress={(e) => e.key === 'Enter' ? HandleResult(e) : null}

                                            />
                                        </i>
                                        <i className="fas fa-user color_bule"></i>
                                        <i class="far fa-smile color_yerl"></i>
                                        <i className="fas fa-map-marker-alt color_red"></i>
                                        <i class="fas fa-microphone-alt color_red"></i>
                                        <i class="sists">...</i>
                                    </span>

                                </Card.Text>


                                <Card.Body>

                                    <button className="post__create" onClick={(e) => HandleResult(e)}>Post </button>
                                </Card.Body>
                            </Card>



                        </Col>
                    </Row>
                </div>


            }




            {openImage &&

                <div className="Image_One open">
                    <Row className="justify-content-center">
                        <Col xs={10} sm={8} md={6} lg={6} className="postion_close">
                        
                                <LazyLoadImage src={`/${saveImage}`} className="close_Image_oneImage" alt="nice photo" />
                           

                            <i class="fas fa-times-circle close_Image_one" onClick={() => setOpenImage(false)}></i>

                        </Col>
                    </Row>
                </div>



            }




        </Fragment>


    )
}


export default UserPost