import { Fragment, useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import "./UserProfile.css"
import axios from "axios"


import { useDispatch } from "react-redux"
import { uploadingCoverAndImagAction } from "../../../redux/Action/Auth_action"
import { LazyLoadImage } from "react-lazy-load-image-component"
const UserProfile = ({ ProfileUserId, userid, setImagePhoto, userInfo }) => {






    const dispatch = useDispatch()

    const [coverPhoto, setCoverPhoto] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [upolaind, setUpolaind] = useState(false)
    // console.log('userid:',userid.coverPhoto)


    useEffect(() => {

        if (coverPhoto) {
            dispatch(uploadingCoverAndImagAction({ _id: ProfileUserId, coverPhoto }))
            setCoverPhoto('')
        } else {
            if (profileImage) {
                dispatch(uploadingCoverAndImagAction({ _id: ProfileUserId, profileImage }))
                setProfileImage('')
                setUpolaind(false)
            }
        }

    }, [coverPhoto, dispatch, ProfileUserId, setUpolaind, profileImage])


    // uploading imageprofile and cover... 
    const [imageUploading, setImageUploading] = useState(false)
    const HandleCover = async (e) => {

        e.preventDefault()

        const file = e.target.files[0]
        const fromData = new FormData()
        setImageUploading(true)
        fromData.append('image', file)
        try {
            const config = {
                Headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post(`/api/`, fromData, config)
            if (upolaind) {
                setProfileImage(data)
            } else {
                setCoverPhoto(data)
            }

            //  console.log(data)
            setImageUploading(false)
        } catch (error) {
            console.log(error)
            setImageUploading(false)
        }



    }







    // open and show imagephoto and cover.
    const HandlEoPEN = (e, im) => {
        e.preventDefault()
       // console.log(im)
     return   setImagePhoto(im)
    }




    return (
        <Fragment>
            <Row className="justify-content-center test_new_with">
                <Col xs={12} sm={12} md={12} lg={8} >
                    <span className="cover_ImageUploading">
                        {userid?.coverPhoto ?
                            <LazyLoadImage src={`${userid?.coverPhoto}`}
                                alt={userid?.username} className="Myprofil_index_fist"
                                onClick={(e) => HandlEoPEN(e, userid?.coverPhoto)} />
                            :

                            <span className="not_cover"></span>

                        }

                        {userInfo ?

                            userInfo._id === userid?._id &&

                            <span className="Icons_Uploading">
                                <i className="fas fa-camera"></i>
                                <span>Edit Cover Photo</span>
                                <input
                                    type="file"
                                    className="uploading_cover"
                                    name="image"
                                    onChange={HandleCover}
                                />
                                {imageUploading && <span>{imageUploading}</span>}
                            </span>
                            : null
                        }

                    </span>
                </Col>
            </Row>



            <Row className="justify-content-center">
                <Col xs={8} sm={4} md={2} lg={2}>
                    <div className="div_Imag_profile">
                        {userid?.profileImage ?
                            <LazyLoadImage src={`${userid?.profileImage}`} alt={userid?.username} className="Myprofil_index_last" onClick={(e) => HandlEoPEN(e, userid?.profileImage)} />

                            :
                            <LazyLoadImage src={`../Image/user.png`} alt={userid?.username} className="Myprofil_index_last" />

                        }

                        {userInfo ?

                            userInfo._id === userid?._id &&
                            <span className="Icons_Uploading_my" onClick={() => setUpolaind(true)}>
                                <input
                                    type="file"
                                    className="uploading_photo"
                                    name="image"
                                    onChange={HandleCover}
                                />

                                <i className="fas fa-camera"></i>

                            </span>
                            : null}

                    </div>
                </Col>
            </Row>



            <Row className="justify-content-center">
                <Col xs={12} sm={12} md={8} lg={8}>


                    <div className="Edit_allt">
                        <h1>{userid?.username}</h1>
                        <span>
                            Mern stack .......Node js and mongodb React js .. JavaScript

                        </span>
                        {userInfo ?
                            userInfo._id === userid?._id &&
                            <span className="Edit_Profile">
                                Edit
                            </span>
                            : null}


                    </div>


                </Col>
            </Row>
        </Fragment>
    )
}


export default UserProfile