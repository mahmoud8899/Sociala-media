import "./PostId.css"
import { Container, Col, Row, Card } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { POSTiD_Action, Unlike_action, addComment, CommentReomve_action, RemovePost_action } from "../../redux/Action/post_action"
import UserOpenPhoto from "../Profile/UserOpenPhoto/UserOpenPhoto"
import axios from "axios"
import {LazyLoadImage} from "react-lazy-load-image-component"
const PostId = ({ match }) => {







    const postMatchid = match.params.id

    const dispatch = useDispatch()

    // user Info ....
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    // POST ID 
    const userPostID = useSelector((state) => state.userPostID)
    const { postUserProduct: postID } = userPostID

    // add like 
    const likeID = useSelector((state) => state.likeID)
    const { success: successlIKE } = likeID

    // add comment.. 
    const addcommentID = useSelector((state) => state.addcommentID)
    const { success: successAddcommentID } = addcommentID

    // Remove comment....
    const removecommentID = useSelector((state) => state.removecommentID)
    const { success: successRemovecommentID } = removecommentID


    // remove post... 
    const postremoveID = useSelector((state) => state.postremoveID)
    const { success: successPostremoveID } = postremoveID










    // views data from who > ,,,, 
    useEffect(() => {
        if (postMatchid) {
            dispatch(POSTiD_Action(postMatchid))
        }

    }, [postMatchid,
        successlIKE,
        successAddcommentID,
        successRemovecommentID,
        successPostremoveID,
        dispatch,
    ])






























    // remove my post.. 
    const [openRemoveListBar, srtOpenRemoveListBar] = useState()
    const [idSet, setIdSet] = useState()
    const HandleOpenList = (e, postid) => {
        e.preventDefault()
        // console.log('click', postid)
        setIdSet(postid)
        if (openRemoveListBar) {
            setTimeout(() => {

                return srtOpenRemoveListBar(false)

            }, 1000)
        } else {
            return srtOpenRemoveListBar(true)
        }
    }





    // remove comment from me...
    const [openDeleteComment, setOpenDeleteComment] = useState(false)
    const [idComment, setIdComment] = useState()
    const HandleDeleteCommit = (e, postid, commentid) => {
        setIdComment(commentid)
        if (openDeleteComment) {

            setTimeout(() => {

                return setOpenDeleteComment(false)

            }, 1000)
        } else {
            return setOpenDeleteComment(true)
        }

    }



    // show like post... 
    const [openLikePost, setOpenLikePost] = useState(false)
    const [dataLike, setDataLike] = useState()
    const HandleOpenLikeUser = (e, data) => {
        e.preventDefault()
        setDataLike(data)
        setOpenLikePost(true)
    }



    // show photo 
    const [imagePhoto, setImagePhoto] = useState()
    const [openCloseImage, setOpenCloseImage] = useState(false)
    const HandleOpenPhoto = (e, im) => {
        e.preventDefault()
        //  console.log('click', im.toString())
        setImagePhoto(`/${im.toString()}`)
        setOpenCloseImage(true)


    }
    const HandleopenOpenImage = (e, im) => {
        e.preventDefault()
        setImagePhoto(im)
        setOpenCloseImage(true)
    }




    // comment and uploading Image..
    const [textcomment, setTextcomment] = useState()
    const [imageUploading, setImageUploading] = useState(false)
    const [imagecomment, setImagecomment] = useState()
    console.log(textcomment)
    const HandleImage = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setImageUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post(`/api/`, formData, config)
            console.log(data)
            setImagecomment(data)
            setImageUploading(false)

        } catch (error) {
            setImageUploading(false)
            console.error(error)

        }

    }
    const HandleComment = (e, idx) => {
        e.preventDefault()
        //   console.log('id:', idx, textcomment)
        dispatch(addComment({
            _id: idx,
            textcomment,
            imagecomment
        }))
        setTextcomment(e.target.value = '')
        setImagecomment(e.target.value = '')

    }







    const [dPostOnly, setIdPostOnly] = useState(null)
    const [openNavShow, setOpenNavShow] = useState(false)
    const onpenNavBarComment = (e, id) => {
        e.preventDefault()

        setOpenNavShow(true)
        return setIdPostOnly(id)
        // console.log('id', id)
    }



    return (

        <Container fluid>
            <Row className="justify-content-center">
                <Col xs={12} sm={12} md={8} lg={6}>
                    <div className="Post_ID">


                        <Card className="test_uppsala">
                            <div className="info_Xcart">
                                {postID?.user?.profileImage ?
                                    <LazyLoadImage src={`${postID?.user?.profileImage}`}
                                        alt={postID?.user?.username}
                                        className="image_user_info"
                                    />

                                    :
                                    <LazyLoadImage src={`../Image/user.png`}
                                        alt={postID?.user?.username}
                                        className="image_user_info"
                                    />

                                }

                                <span className="text_user_name">
                                    {postID?.user?.username}
                                </span>

                                {userInfo ?

                                    userInfo._id === postID?.user?._id &&
                                    <span className="Icons_Remove" onClick={(e) => HandleOpenList(e, postID?._id)}>
                                        ...


                                        {openRemoveListBar && postID?._id === idSet &&

                                            <ul className="List_remove_Edit_Post">

                                                <li onClick={(e) => dispatch(RemovePost_action(postID?._id))}>
                                                    <i className="far fa-trash-alt"></i>
                                                    move to archive

                                                </li>
                                            </ul>
                                        }

                                    </span>
                                    : null}
                            </div>


                            {postID?.textpost &&

                                <div className="textPost_xp" >
                                    {postID?.textpost}
                                </div>
                            }


                            <Row className="justify-content-center" >
                                <div className="Image_ALL_USER" >
                                    {postID?.image?.map((im, imIndex) => (

                                        <LazyLoadImage
                                            variant="top"
                                            src={`/${im}`}
                                            className={imIndex === 2 ||
                                                imIndex === 3 ||
                                                imIndex === 4 ||
                                                imIndex === 5 ||
                                                imIndex === 6 ||
                                                imIndex === 7 ?
                                                "olikaImage" :
                                                "image_user_create"
                                            }
                                            onClick={(e) => HandleOpenPhoto(e, postID?.image, im)}
                                        />
                                    ))}
                                </div>

                            </Row>



                            <Card.Body>


                                <Card.Title className="cart_title">
                                    {postID?.liken?.length > 0 ?
                                        <>

                                            <i className="fas fa-thumbs-up color_red"></i>
                                            <i className="fas fa-heart color_bule"></i>
                                            {postID?.liken?.map((userLike, userLikeIndex) => (


                                                <span className="userLike" key={userLikeIndex}
                                                    onClick={(e) => HandleOpenLikeUser(e, postID?.liken)}
                                                >

                                                    {userLike?.username}{`,`}


                                                </span>




                                            ))}
                                            <span className="curnt_ather_Like">{postID?.liken?.length} others</span>
                                        </>


                                        : null



                                    }




                                    <span className="comments_users">
                                        {postID?.comment?.length === 0 ? null : <span>{postID?.comment?.length} comments</span>}
                                    </span>
                                </Card.Title>



                                {userInfo ?
                                    <Card.Text className="cart_likes">
                                        <span
                                            className={postID?.liken?.find((like) => like?.userId === userInfo._id) ? "Like_user" : "notLiken"}
                                            onClick={() => dispatch(Unlike_action({ _id: postID?._id }))}

                                        >
                                            <i className="fas fa-thumbs-up"></i>
                                            like
                                        </span>

                                        <span >
                                            <i className="far fa-comment-alt "></i>
                                            commit
                                        </span>
                                        <span>
                                            <i className="fas fa-share"></i>
                                            share
                                        </span>

                                    </Card.Text>
                                    : null}



                                {postID?.comment?.length === 0 ? null :

                                    <Card.Text className={openNavShow && postID?._id === dPostOnly ? "cart_comment open" : "cart_comment"}>






                                        {postID?.comment?.map((commt, commtIndex) => (


                                            <div className="add_commit_box" key={commtIndex}>

                                                {commt?.userImage ?
                                                    <LazyLoadImage src={commt?.userImage} alt={commt?.userName} className="image_user_info" />
                                                    :
                                                    <LazyLoadImage src={`../Image/user.png`} alt={commt?.userName} className="image_user_info" />
                                                }


                                                <div className="comment_xps" >

                                                    <span className="Comment_user">
                                                        <h3>
                                                            {commt?.userName}



                                                            {userInfo ?


                                                                userInfo._id === commt?.userId &&
                                                                <span className="Icons_Remove_comment" onClick={(e) => HandleDeleteCommit(e, postID?._id, commt?._id)}>
                                                                    ...

                                                                    {openDeleteComment && idComment === commt?._id &&
                                                                        <ul className="POATION_delete_edit">
                                                                            <li
                                                                                onClick={(e) => dispatch(CommentReomve_action(
                                                                                    postID?._id,
                                                                                    commt?._id
                                                                                ))}
                                                                            >
                                                                                <i className="far fa-trash-alt"></i>
                                                                                Delet
                                                                            </li>
                                                                            <li>
                                                                                <i className="far fa-edit"></i>
                                                                                Edit
                                                                            </li>
                                                                        </ul>



                                                                    }

                                                                </span>
                                                                : null
                                                            }
                                                        </h3>
                                                        <span className="flex_image">
                                                            {commt?.textcomment &&

                                                                <span >{commt?.textcomment}</span>

                                                            }

                                                            {commt?.imagecomment &&

                                                                <LazyLoadImage
                                                                    src={commt?.imagecomment}
                                                                    alt={commt?.userId}
                                                                    className="Image_Comment_post_id"
                                                                    onClick={(e) => HandleopenOpenImage(e, commt?.imagecomment)}
                                                                />
                                                            }

                                                        </span>



                                                    </span>

                                                    <span className="like_reply">
                                                        <span>Like</span>
                                                        <span>Reply</span>
                                                        <span className="like_show">
                                                            <i className="far fa-thumbs-up"></i>
                                                            1
                                                        </span>
                                                    </span>
                                                </div>

                                            </div>


                                        ))}




                                    </Card.Text>
                                }





                                {postID?.comment.length > 2 ?

                                    <Card.Text>
                                        <span className={openNavShow && postID?._id === dPostOnly ? "view_comments open" : "view_comments"}
                                            onClick={(e) => onpenNavBarComment(e, postID?._id)}
                                        >View 3 more comments</span>
                                    </Card.Text>

                                    : null

                                }







                                {userInfo ?
                                    <Card.Text className="Cart_comment_write">
                                        {userInfo.profileImage ?
                                            <LazyLoadImage src={userInfo.profileImage} alt={userInfo.username} className="image_user_info" />
                                            :
                                            <LazyLoadImage src={`../Image/user.png`} alt={userInfo.username} className="image_user_info" />
                                        }


                                        <div className="Write_comment">
                                            <input
                                                type="text"
                                                placeholder="Write a comment"
                                                className={textcomment ? "more_hegith" : "comment_write"}
                                                value={textcomment}
                                                onChange={(e) => setTextcomment(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' ? HandleComment(e, postID?._id) : null}

                                            />
                                            <span className="Icons_Write_comment" >
                                                <i className="far fa-smile-wink Add_photo_user_postion">
                                                    <input
                                                        type="file"
                                                        className="Add_photo_user"
                                                        name="image"
                                                        onChange={HandleImage}


                                                    />
                                                </i>
                                                <i className="fas fa-camera-retro"></i>
                                                <i>Gif</i>

                                            </span>
                                            {imageUploading && <span>Loading....</span>}
                                        </div>

                                    </Card.Text>
                                    : null
                                }


                            </Card.Body>


                        </Card>





                    </div>
                </Col>
            </Row>

            {openLikePost &&

                <div className="add_Image_open open">
                    <Row className="justify-content-center">
                        <Col xs={10} sm={10} md={6} lg={6} className="test_uppsala">
                            <div className="top_navBar_Like">
                                <ul>
                                    <li className="Like_user_add_blo">All</li>
                                    <li className="Like_user">
                                        <i className="fas fa-thumbs-up"></i>
                                        {dataLike?.length}
                                    </li>

                                    <li className="Like_red">
                                        <i className="fas fa-heart"></i>
                                        0
                                    </li>
                                </ul>


                                <span onClick={() => setOpenLikePost(false)}>
                                    <i className="fas fa-times-circle"></i>
                                </span>

                            </div>



                            {dataLike?.map((user, userIndex) => (
                                <div className="Cart_Like_User" key={userIndex}>

                                    <div className="postion_a">
                                        {user?.image ?
                                            <Link to={`/profile/${user?.userId}`}>
                                                <LazyLoadImage src={user?.image} className="Cart_Like_User_Image" alt="photo nice" />
                                            </Link>

                                            :
                                            <Link to={`/profile/${user?.userId}`}>
                                                <LazyLoadImage src={`../Image/user.png`} className="Cart_Like_User_Image" alt="photo nice" />
                                            </Link>

                                        }

                                        <i className="fas fa-thumbs-up Like_user"></i>
                                    </div>
                                    <span className="text-User_name">{user?.username}</span>


                                    {userInfo ?
                                        user?.userId === userInfo._id ?
                                            null
                                            :
                                            <span className="AddFriend">
                                                <i className="fas fa-user-plus"></i>
                                                <span>Add Friend</span>
                                            </span>
                                        : null
                                    }



                                </div>
                            ))}


                        </Col>
                    </Row>
                </div>

            }



            <UserOpenPhoto
                imagePhoto={imagePhoto}
                setImagePhoto={setImagePhoto}
                openCloseImage={openCloseImage}
                setOpenCloseImage={setOpenCloseImage}
            />






        </Container>

    )
}



export default PostId



