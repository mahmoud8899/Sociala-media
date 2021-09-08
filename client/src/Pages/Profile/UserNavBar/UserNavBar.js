import { Fragment, useEffect, useState } from "react"
import { Row, Col,  FormControl } from "react-bootstrap"
import { uploadingCoverAndImagAction, Address_action } from "../../../redux/Action/Auth_action"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import "./UserNavBar.css"
import { Link } from "react-router-dom"
import {LazyLoadImage} from "react-lazy-load-image-component"
const UserNavBar = ({
    openFrinds,
    setOpenFrinds,
    openPhotos,
    setOpenPhotos,
    openNavBar,
    openAbout,
    setOpenNavBar,
    setOpenAbout,
    userid,
    ProfileUserId,
    userInfo,
    setImagePhoto
}) => {


    const dispatch = useDispatch()
    // close navBar 
    const HandleClose = (e) => {
        e.preventDefault()
        if (openFrinds || openPhotos || openNavBar || openAbout) {
            setOpenPhotos(false)
            setOpenFrinds(false)
            setOpenNavBar(false)
            setOpenAbout(false)
        }
    }

    // close allt 
    const HandleFiends = (e) => {
        e.preventDefault()
        //  console.log('click')

        setOpenFrinds(true)
        setOpenPhotos(false)
        setOpenNavBar(false)
        setOpenAbout(false)

    }


    // open Photo
    const HandlPHoto = (e) => {
        e.preventDefault()
        //console.log('click')


        setOpenPhotos(true)
        setOpenFrinds(false)
        setOpenNavBar(false)
        setOpenAbout(false)
    }


    // open About.. 
    const HandleAbout = (e) => {
        e.preventDefault()
        setOpenNavBar(true)
        setOpenAbout(true)
        setOpenFrinds(false)
        setOpenPhotos(false)

    }




    // open onther edit photo 
    const [openUploadingINimage, setOpenUploadingINimage] = useState(false)

    const listFrindsID = useSelector((state) => state.listFrindsID)
    const { listfirend } = listFrindsID

    // console.log('listfirend', listfirend)

    // open input edit ...
    const [openInputEdit, setOpenInputEdit] = useState(false)
    const HandleOpenInput = (e) => {
        e.preventDefault()
        if (openInputEdit) {
            return setOpenInputEdit(false)
        } else {
            return setOpenInputEdit(true)
        }
    }




    // edit adress 
    const [openAddres, setOpenAddres] = useState(false)
    const HAnadleopenAdress = (e) => {
        e.preventDefault()
        if (openAddres) {
            return setOpenAddres(false)
        } else {
            return setOpenAddres(true)
        }
    }



    //  
    // SLICE  more photos
    const [current, setCurrent] = useState(5)
    const checkslice = userid?.Albums?.slice(0, current)
    const HandleMorePhoto = (e) => {
        e.preventDefault()
        setCurrent(prev => prev + 5)
    }


    // selector photo to profile, 
    const [openOli, setOpenOli] = useState(false)
    const ChangeImagePhoto = (e, im) => {
        e.preventDefault()

        if (openOli) {
            dispatch(uploadingCoverAndImagAction({ _id: ProfileUserId, profileImage: im }))
            console.log('image', im)
            setTimeout(() => {


                return setOpenUploadingINimage(false)

            }, 2000)

            setOpenOli(false)
        } else {
            dispatch(uploadingCoverAndImagAction({ _id: ProfileUserId, coverPhoto: im }))
            console.log('image', im)
            setTimeout(() => {


                return setOpenUploadingINimage(false)

            }, 2000)
        }

    }



    // add addres........................................................................................
    const [university, setUniversity] = useState()
    const [living, setLiving] = useState()
    const [job, setJob] = useState()
    useEffect(() => {

        if (ProfileUserId) {
            setUniversity(userid?.AddAddress?.[0]?.University)
            setLiving(userid?.AddAddress?.[0]?.living)
            setJob(userid?.AddAddress?.[0]?.job)
        }

    }, [ProfileUserId, userid])



    const HandleAdress = (e) => {
        e.preventDefault()
        dispatch(Address_action({ _id: ProfileUserId, University: university, living, job }))

        setTimeout(() => {
            return setOpenAddres(false)
        }, 2000);
    }




    // open photo 
    const HandleOpenPhoto = (e, idx) => {
        e.preventDefault()
        console.log(idx)
        return setImagePhoto(idx)
    }


    return (
        <Fragment>


            <Row className="justify-content-center  box_boot">
                <Col sm={6} md={8} lg={6} className="d-none d-sm-block">


                    <ul className="List_profile_navbar">
                        <li onClick={(e) => HandleClose(e)}>post</li>
                        {userInfo && userInfo._id === userid?._id &&
                            <li onClick={(e) => HandleAbout(e)}>About</li>
                        }

                        <li onClick={(e) => HandleFiends(e)} >friends</li>
                        <li onClick={(e) => HandlPHoto(e)}>photo</li>
                        <li>story Archive</li>
                        <li>more</li>
                    </ul>

                </Col>

                {userInfo ?
                    userInfo._id === userid?._id &&
                    <Col xs={12} sm={6} md={4} lg={2}>
                        <div className="first_Ad">
                            <div className="Edit_Profile_xp" onClick={() => setOpenNavBar(true)}>
                                <i class="fas fa-pencil-alt"></i>
                                <span>Edit Profile </span>
                            </div>


                            <div className="Edit_Profile_more">
                                <span>...</span>
                            </div>

                        </div>
                    </Col>

                    : null}






            </Row>





            {openNavBar &&

                <div className={openAbout ? "add_open_sjalv" : "Add_open_Adress open"}>
                    <Row className="justify-content-center  my_scroll">


                        <Col xs={11} sm={10} md={6} lg={6} >


                            <div className="Info_xp">
                                <div className="Profile-TITLE">
                                    <span>Edit Profile</span>
                                    <i className="fas fa-times-circle" onClick={() => setOpenNavBar(false)}></i>
                                </div>

                                <div className="profile_picture_info">

                                    <span className="profile_picture">
                                        <h1>profile picture</h1>
                                        <span onClick={() => {
                                            setOpenOli(true)
                                            setOpenUploadingINimage(true)
                                        }} >Edit</span>
                                    </span>
                                    {userid?.profileImage ?
                                    <LazyLoadImage src={userid?.profileImage} alt={userid?.username} className="imag_edit" />
                                    : 
                                    <LazyLoadImage src={`../Image/user.png`} alt={userid?.username} className="imag_edit" />
                                    }
                                    
                                </div>


                                <div className="cover_photo">
                                    <span className="profile_picture">
                                        <h1>cover photo</h1>
                                        <span onClick={() => setOpenUploadingINimage(true)}>Edit</span>
                                    </span>
                                    {userid?.coverPhoto ?
                                    <LazyLoadImage src={userid?.coverPhoto} alt={userid?.username} className="cover_photo_Edit" />
                                    :
                                    <LazyLoadImage src={`../Image/login4.jpg`} alt={userid?.username} className="cover_photo_Edit" />
                                    
                                }
                                    
                                </div>




                                {!openInputEdit &&
                                    <div className="bio_edit">

                                        <span className="profile_picture">
                                            <h1>Bio</h1>
                                            <span onClick={(e) => HandleOpenInput(e)}>Edit</span>
                                        </span>

                                        <span className="xp_Edit">Mern Stack .......Node Js And Mongodb React Js .. JavaScript</span>

                                    </div>


                                }


                                {openInputEdit &&

                                    <div className="input">
                                        <span className="profile_picture">
                                            <h1>Bio</h1>
                                            <span>Edit</span>
                                        </span>
                                        <textarea type="text" className="xp_Edit_textarea" placeholder="Mern Stack .......Node Js And Mongodb React Js .. JavaScript" />
                                        <div className="Edit_buttom">
                                            <span className="public_first">
                                                <i className="fas fa-globe-asia"></i>
                                                public
                                            </span>
                                            <span className="button_span">
                                                <span onClick={() => setOpenInputEdit(false)}>cancel</span>
                                                <span>save</span>
                                            </span>
                                        </div>
                                    </div>

                                }



                                {!openAddres &&
                                    <div className="intro_Edit">

                                        <span className="profile_picture">
                                            <h1>Customise your intro</h1>
                                            <span onClick={(e) => HAnadleopenAdress(e)}>Edit</span>
                                        </span>


                                        <div className="edit_information">


                                            <span className="infromation_edit_font">
                                                <i className="fas fa-university"></i>
                                                <span> University {userid?.AddAddress?.[0]?.University}  </span>
                                            </span>

                                            <span className="infromation_edit_font">
                                                <i className="fas fa-home"></i>
                                                <span> livs in {userid?.AddAddress?.[0]?.living}</span>
                                            </span>



                                            <span className="infromation_edit_font">
                                                <i className="fas fa-clock"></i>
                                                <span> job {userid?.AddAddress?.[0]?.job}</span>
                                            </span>

                                        </div>

                                    </div>
                                }








                                {openAddres &&
                                    <div className="intro_Edit">

                                        <span className="profile_picture">
                                            <h1>Customise your intro</h1>
                                            <span onClick={(e) => HAnadleopenAdress(e)}>Edit</span>
                                        </span>


                                        <div className="edit_information">


                                            <span className="infromation_edit_font">
                                                <i className="fas fa-university"></i>
                                                <span> the University </span>
                                                <input
                                                    type="text"
                                                    name="university"
                                                    className="INPUT_eDIT_INPUT"
                                                    value={university}
                                                    onChange={(e) => setUniversity(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' ? HandleAdress(e) : null}

                                                />
                                            </span>

                                            <span className="infromation_edit_font">
                                                <i className="fas fa-home"></i>
                                                <span> livs in</span>
                                                <input
                                                    className="INPUT_eDIT_INPUT"
                                                    name="job"
                                                    value={job}
                                                    onChange={(e) => setJob(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' ? HandleAdress(e) : null}
                                                />
                                            </span>



                                            <span className="infromation_edit_font">
                                                <i className="fas fa-clock"></i>
                                                <span>join</span>
                                                <input
                                                    type="text"
                                                    className="INPUT_eDIT_INPUT"
                                                    placeholder="gaza palstion"
                                                    name="living"
                                                    value={living}
                                                    onChange={(e) => setLiving(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' ? HandleAdress(e) : null}

                                                />

                                            </span>

                                            <Col>
                                                <span className="save_change" onClick={(e) => HandleAdress(e)}>
                                                    Save
                                                </span>
                                            </Col>

                                        </div>

                                    </div>
                                }





                                <div className="info_edit">
                                    <span>
                                        Edit your About info
                                    </span>
                                </div>
                            </div>

                        </Col>
                    </Row>
                </div>

            }





            {openFrinds &&

                <Row className="justify-content-center">
                    <Col xs={12} sm={12} md={10} lg={10}>

                        <div className="color_cart_X">


                            <div className="top_search_friends">
                                <h1>Friends</h1>
                                <span className="list_Search_friens">
                                    <FormControl type="text" placeholder="Search" className="Search_friens" />
                                    <i className="fas fa-search"></i>
                                </span>


                                {userInfo ? userInfo._id === userid?._id &&
                                    <span className="list_remove_list">
                                        <span className="list_remove">...</span>
                                    </span>
                                    : null}



                            </div>


                            <ul className="list_navbar_friends">
                                <li>All friend</li>
                                <li>Recently added</li>
                                <li>Brithdays</li>
                                <li>current city</li>
                            </ul>


                            <div className="all_firend_list_here">




                                {listfirend?.map((userm, usermIndex) => (

                                    <Col xs={12} sm={6} md={6} lg={6} key={usermIndex}>
                                        <div className="list_all_Friends_all">
                                            <Link to={`/profile/${userm?._id}`}>
                                                {userm?.profileImage ?
                                                    <LazyLoadImage src={userm?.profileImage} className="list_all_Friends_all_Image" alt={userm?.username} />
                                                    :
                                                    <LazyLoadImage src={'../Image/user.png'} className="list_all_Friends_all_Image" alt={userm?.username} />
                                                }
                                            </Link>

                                            <span className="teext_friend_list">
                                                <span className="Khalif_list">{userm?.username} </span>
                                                {userInfo ? userInfo._id === userid?._id &&
                                                    <span className="list_remove">...</span>
                                                    : null}

                                            </span>
                                        </div>
                                    </Col>
                                ))}












                            </div>
                        </div>







                    </Col>
                </Row>



            }


            {openPhotos &&
                <Row className="justify-content-center">
                    <Col xs={12} sm={12} md={10} lg={10}>

                        <div className="color_cart_X">


                            <div className="top_search_friends">
                                <h1>Photos {userid?.Albums?.length}</h1>


                                <span className="list_remove_listc">


                                    <span className="list_remove_list_add">Add photos/video</span>
                                    {userInfo ?
                                        userid?._id === userInfo._id &&
                                        <span className="list_remove">...</span>
                                        : null}

                                </span>

                            </div>


                            <ul className="list_navbar_friends">
                                <li className="color_blue">Your Photos</li>

                                <li>Albums</li>
                            </ul>


                            <div className="all_firend_list_here">



                                {userid?.Albums?.map((im, imIndex) => (
                                    <Col xs={6} sm={2} md={2} lg={2} key={imIndex}>
                                        <div className="list_all_Photo_all">
                                            <LazyLoadImage
                                                src={im}
                                                className="list_all_Photo_all_Image"
                                                alt={im}
                                                onClick={(e) => HandleOpenPhoto(e, im)}

                                            />
                                            {userInfo ?
                                                userid?._id === userInfo._id &&
                                                <i className="fas fa-pencil-alt"></i>
                                                : null}
                                        </div>
                                    </Col>


                                ))}




                            </div>
                        </div>







                    </Col>
                </Row>
            }








            {openUploadingINimage &&
                <div className={openAbout ? "add_open_sjalv" : "Add_open_Adress open"}>
                    <Row className="justify-content-center  my_scroll">


                        < Col xs={11} sm={11} md={6} lg={6}  >


                            <div className="Info_xp_one">
                                <div className="Profile-TITLE">
                                    <span>Update Profile picture</span>
                                    <i className="fas fa-times-circle" onClick={() => setOpenUploadingINimage(false)}></i>
                                </div>


                                <Row className="justify-content-center">

                                    <Col sx={5} sm={5} md={5} lg={5}>
                                        <span className="edit_profile_photo_edit addColor">
                                            <i class="fas fa-plus"></i>
                                            upload photo
                                        </span>

                                    </Col>

                                    <Col sx={5} sm={5} md={5} lg={5}>
                                        <span className="edit_profile_photo_edit">
                                            <i class="fas fa-crop"></i>
                                            Add Frame
                                        </span>

                                    </Col>

                                    <Col sx={1} sm={2} md={2} lg={1}>
                                        <span className="edit_profile_photo_edit addPadding">
                                            <i class="fas fa-pencil-alt"></i>

                                        </span>

                                    </Col>
                                </Row>








                                <Row className="justify-content-center xp_test">



                                    {checkslice?.map((imx, imxIndex) => (
                                        <Col xs={2} sm={2} md={2} lg={2} className="xsssd" key={imxIndex}>
                                            <LazyLoadImage src={`${imx}`}
                                                alt="imx"
                                                className="Edit_Image_change"
                                                onClick={(e) => ChangeImagePhoto(e, imx)}
                                            />
                                        </Col>
                                    ))}

                                </Row>





                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <span className="seeMore" onClick={(e) => HandleMorePhoto(e)}>See more</span>

                                </Col>





                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <span className="seeMore">See more</span>

                                </Col>

                            </div>

                        </Col>
                    </Row>
                </div>

            }





        </Fragment>


    )
}


export default UserNavBar


