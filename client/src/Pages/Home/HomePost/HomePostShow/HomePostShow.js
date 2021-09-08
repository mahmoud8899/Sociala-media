import { Fragment, useEffect } from "react"
import { Col, Card, Row, Image } from "react-bootstrap"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RemovePost_action, addComment, CommentReomve_action, Unlike_action } from "../../../../redux/Action/post_action"
import axios from "axios"
import "./HomePostShow.css"
import { Link } from "react-router-dom"
import UserOpenPhoto from "../../../Profile/UserOpenPhoto/UserOpenPhoto"
import { LazyLoadImage } from 'react-lazy-load-image-component'
const HomePostShow = ({ setIdPostEdit }) => {



    const dispatch = useDispatch()
    // all post from Users...
    const listpost = useSelector((state) => state.listpost)
    const { post } = listpost

    // user Info 
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    //  console.log('home post', post, userInfo)

    const [openRemoveListBar, setOpenRemoveListBar] = useState(false)








    // post delete form user 
    const [idSet, setIdSet] = useState(null)
    const HandleOpenList = (e, id) => {
        e.preventDefault()
        //  console.log('id', id)
        setIdSet(id)
        if (openRemoveListBar) {
            return setOpenRemoveListBar(false)
        } else {
            return setOpenRemoveListBar(true)
        }


    }




    // open  liek user show us
    const [dataLike, setDataLike] = useState()
    const [openLikePost, setOpenLikePost] = useState(false)
    const HandleOpenLikeUser = (e, data) => {
        e.preventDefault()
        setDataLike(data)
        setOpenLikePost(true)
    }

    // list navbar comment and delete...
    const [openDeleteComment, setOpenDeleteComment] = useState(false)
    const [idComment, setIdComment] = useState(null)
    const HandleDeleteCommit = (e, postid, commentid) => {
        e.preventDefault()
        setIdComment(commentid)
        if (openDeleteComment) {

            setTimeout(() => {

                return setOpenDeleteComment(false)

            }, 1000)
        } else {
            return setOpenDeleteComment(true)
        }
    }



    // open navbar comment view..
    const [dPostOnly, setIdPostOnly] = useState(null)
    const [openNavShow, setOpenNavShow] = useState(false)
    const onpenNavBarComment = (e, id) => {
        e.preventDefault()

        setOpenNavShow(true)
        return setIdPostOnly(id)
        //   console.log('id', id)
    }






    // commit 
    const [textcomment, setTextcomment] = useState('')
    const [imagecomment, setImagecomment] = useState()


    const [imageUploading, setImageUploading] = useState(false)
    const HandleComment = (e, id) => {
        e.preventDefault()
        dispatch(addComment({ _id: id, textcomment, imagecomment }))
        setTextcomment(e.target.value = '')
        setImagecomment(e.target.value = '')
      //  console.log('ccc')

    }
    const HandleImage = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setImageUploading(true)
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
            const { data } = await axios.post(`/api/`, formData, config)
            console.log(data)
            setImagecomment(data)
            setImageUploading(false)
        } catch (error) {
            console.error(error)
            setImageUploading(false)
        }
    }


    // take post id =
    const HandleEditPost = (e, id) => {
        e.preventDefault()
        setIdPostEdit(id)
    }




    // ..................................................................................................>
    // views photo....
    const [imagePhoto, setImagePhoto] = useState()
    const [openCloseImage, setOpenCloseImage] = useState(false)

    useEffect(() => {

        if (imagePhoto) {

            return setOpenCloseImage(true)

        } else {
            return setOpenCloseImage(false)
        }

    }, [imagePhoto])




    // open photo
    const HandleOpenPhoto = (e, im) => {
        e.preventDefault()
        //  console.log('click photot..')
        return setImagePhoto(`/${im}`)
    }

    const HandlOpenImage = (e, im) => {
        e.preventDefault()
        //  console.log('click', im)
        return setImagePhoto(im)

    }

    // const 
    return (
        <Fragment>


            {post?.map((postHome, postIndex) => (


                <Card className="test_uppsala" key={postIndex}>
                    <div className="info_Xcart Home_color">
                        {postHome?.user?.profileImage ?
                            <Link className="" to={`/profile/${postHome?.user?._id}`}>
                                <LazyLoadImage src={postHome?.user?.profileImage} alt={postHome?.user?.username} className="image_user_info" />
                            </Link>
                            :
                            <Link className="" to={`/profile/${postHome?.user?._id}`}>
                                <LazyLoadImage src={`../Image/user.png`} alt={postHome?.user?.username} className="image_user_info" />
                            </Link>
                        }


                        <span className="text_user_name">
                            {postHome?.user?.username}
                        </span>
                        {userInfo ?
                            userInfo._id === postHome?.user?._id &&


                            <span className="Icons_Remove" onClick={(e) => HandleOpenList(e, postHome?._id)}>
                                ...


                                {openRemoveListBar && postHome?._id === idSet &&

                                    <ul className="List_remove_Edit_Post">
                                        <li onClick={(e) => HandleEditPost(e, postHome?._id)}>
                                            <i className="far fa-edit"></i>
                                            Edit Post
                                        </li>
                                        <li onClick={() => dispatch(RemovePost_action(postHome?._id))} >
                                            <i className="far fa-trash-alt"></i>
                                            move to archive

                                        </li>
                                    </ul>
                                }

                            </span>
                            : null}

                    </div>



                    {postHome?.textpost &&
                        <div className="textPost_xp Home_color" >
                            {postHome?.textpost}
                        </div>
                    }




                    <Row className="justify-content-center" >
                        <div className="Image_ALL_USER" >

                            {postHome?.image ? postHome?.image?.map((mxi, mxiIndex) => (
                                <LazyLoadImage
                                    key={mxiIndex}
                                    variant="top"
                                    src={`/${mxi}`}
                                    className="image_user_create"
                                    onClick={(e) => HandleOpenPhoto(e, mxi)}
                                />
                            )) : null}


                        </div>

                    </Row>



                    <Card.Body>


                        <Card.Title className="cart_title">

                            {postHome?.liken?.length > 0 ?
                                <>

                                    <i className="fas fa-thumbs-up color_red"></i>
                                    <i className="fas fa-heart color_bule"></i>
                                    <div className="userLike_Array">
                                    {postHome?.liken?.map((userLike, userLikeIndex) => (
                                        <span className="userLike" key={userLikeIndex} onClick={(e) => HandleOpenLikeUser(e, postHome?.liken)}>
                                            {userLike?.username}{`,`}
                                        </span>))}
                                    </div>
                                  
                                    <span className="curnt_ather_Like">{postHome?.liken?.length} others</span>
                                </>


                                : null



                            }











                            <span className="comments_users">
                                {postHome?.comment?.length === 0 ? null : <span>{postHome?.comment?.length} comments</span>}
                            </span>


                        </Card.Title>




                        {userInfo ?
                            <Card.Text className="cart_likes">
                                <span className={postHome?.liken?.find((like) => like?.userId === userInfo._id) ? "Like_user" : "notLiken"}
                                    onClick={() => dispatch(Unlike_action({ _id: postHome?._id }))}>
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
                            : null
                        }








                        <Card.Text className={openNavShow && postHome?._id === dPostOnly ? "cart_comment open" : "cart_comment"}>


                            {postHome?.comment?.map((commt, commtIndex) => (


                                <div className="add_commit_box" key={commtIndex}>

                                    {commt?.userImage ?
                                        <Link className="" to={`/profile/${commt?.userId}`}>
                                            <LazyLoadImage src={commt?.userImage} alt={commt?.username} className="image_user_info" />
                                        </Link>

                                        :
                                        <Link className="" to={`/profile/${commt?.userId}`}>
                                            <LazyLoadImage src={`../Image/user.png`} alt={commt?.username} className="image_user_info" />
                                        </Link>


                                    }


                                    <div className="comment_xps" >

                                        <span className="Comment_user Home_color">
                                            <h3>
                                                {commt?.userName}

                                                {userInfo &&

                                                    userInfo._id === commt?.userId &&
                                                    <span className="Icons_Remove_comment" onClick={(e) => HandleDeleteCommit(e, postHome?._id, commt?._id)}>
                                                        ...


                                                        {openDeleteComment && idComment === commt?._id &&
                                                            <ul className="POATION_delete_edit">
                                                                <li onClick={() =>
                                                                    dispatch(CommentReomve_action(postHome?._id, commt?._id))
                                                                }>
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
                                                }
                                            </h3>
                                            <span className="flex_image">
                                                {commt?.textcomment &&

                                                    <span >{commt?.textcomment}</span>

                                                }

                                                {commt?.imagecomment &&


                                                    <LazyLoadImage src={commt?.imagecomment}
                                                        alt={commt?.imagecomment}
                                                        className="image_comment"
                                                        onClick={(e) => HandlOpenImage(e, commt?.imagecomment)}
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










                        {postHome?.comment.length > 2 ?

                            <Card.Text>
                                <span className={openNavShow && postHome?._id === dPostOnly ? "view_comments open" : "view_comments"}
                                    onClick={(e) => onpenNavBarComment(e, postHome?._id)}
                                >View 3 more comments</span>
                            </Card.Text>

                            : null

                        }







                        {userInfo ?
                            <Card.Text className="Cart_comment_write">
                                {userInfo.profileImage ?
                                    <Card.Img src={userInfo.profileImage} alt={userInfo.username} className="image_user_info" />
                                    :
                                    <Card.Img src={`../Image/user.png`} alt={userInfo.username} className="image_user_info" />
                                }


                                <div className="Write_comment">
                                    <input
                                        type="text"
                                        placeholder="Write a comment"
                                        className={textcomment ? "more_hegith" : "comment_write"}

                                        onChange={(e) => setTextcomment(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' ? HandleComment(e, postHome?._id) : null}

                                    />
                                    <span className="Icons_Write_comment Home_color" >
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
                            : null}


                    </Card.Body>


                </Card>
            ))}




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
                                                <Image src={user?.image} className="Cart_Like_User_Image" alt="photo nice" />
                                            </Link>

                                            :
                                            <Link to={`/profile/${user?.userId}`}>
                                                <Image src={`../Image/user.png`} className="Cart_Like_User_Image" alt="photo nice" />
                                            </Link>

                                        }

                                        <i className="fas fa-thumbs-up Like_user"></i>
                                    </div>
                                    <span className="text-User_name nowAddIndex">{user?.username}</span>


                                    {userInfo ? user?.userId !== userInfo._id &&
                                        <span className="AddFriend nowAddIndex">
                                            <i className="fas fa-user-plus"></i>
                                            <span className="">Add Friend</span>
                                        </span>

                                        : null}



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
        </Fragment>

    )
}


export default HomePostShow


/*

*/