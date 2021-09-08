import { Fragment } from "react"
import { useState } from "react"
import { Col, Card, Row,  } from "react-bootstrap"

import SliderImage from "./SliderImage"
import "./UserPostShow.css"
import { RemovePost_action, addComment, CommentReomve_action, Unlike_action } from "../../../redux/Action/post_action"
import { useDispatch } from "react-redux"
import axios from "axios"
import { Link } from "react-router-dom"
import {LazyLoadImage} from "react-lazy-load-image-component"
const UserPostShow = ({ postID, userInfo, setIdPostEdit, userid, setImagePhoto }) => {



    const dispatch = useDispatch()

    const [imageSave, setImageSave] = useState(null)
    const [openOpenImage, setOpenOpenImage] = useState(false)
    const [arrayList, setArrayList] = useState([])


    //   console.log('arrayList',arrayList)

    const currentSoffa = arrayList?.length
    // console.log(currentSoffa)

    const [openRemoveListBar, setOpenRemoveListBar] = useState(false)
    // console.log(openRemoveListBar)




    // open photo ==.
    const HandleOpenPhoto = (e, id, im) => {
        e.preventDefault()


        setArrayList(id)
        setOpenOpenImage(true)
        return setImageSave(im)

        //const checkFilter = id?.map((cs) => cs)
        //  const checsp = checkFilter[0].slice(im)
        //  console.log(checsp)


    }




    // list remove edit Post....
    const [idSet, setIdSet] = useState(null)
    const HandleOpenList = (e, id) => {
        e.preventDefault()

        setIdSet(id)


        if (openRemoveListBar) {
            return setOpenRemoveListBar(false)
        } else {
            return setOpenRemoveListBar(true)
        }
    }




    // commit 
    const [textcomment, setTextcomment] = useState('')
    const [imagecomment, setImagecomment] = useState()



    // comment from user and upload image if user want....
    const [imageUploading, setImageUploading] = useState(false)
    const HandleComment = (e, id) => {
        e.preventDefault()
        dispatch(addComment({ _id: id, textcomment, imagecomment }))
        setTextcomment(e.target.value = '')
        setImagecomment(e.target.value = '')
        //    console.log('ccc')

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
            //  console.log(data)
            setImagecomment(data)
            setImageUploading(false)
        } catch (error) {
            console.error(error)
            setImageUploading(false)
        }
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
        // console.log('id', id)
    }




    // open like post... 
    const [openLikePost, setOpenLikePost] = useState(false)
    const [dataLike, setDataLike] = useState()
    const HandleOpenLikeUser = (e, data) => {
        e.preventDefault()
        setDataLike(data)
        setOpenLikePost(true)
    }







    // edit post ....
    const HandleEditPost = (e, id) => {
        e.preventDefault()
        return setIdPostEdit(id)
    }


    // open image.. 
    const HandleopenOpenImage = (e, im) => {
        e.preventDefault()
        return setImagePhoto(im)
    }



    return (

        <Fragment>
            <Col xs={12} sm={12} md={6} lg={5} >


                {postID?.map((post, postIndex) => (

                    <Card className="test_uppsala" key={postIndex}>
                        <div className="info_Xcart">
                            {post?.user?.profileImage ?
                                <LazyLoadImage src={`${post?.user?.profileImage}`}
                                    alt={post?.user?.username}
                                    className="image_user_info"
                                />

                                :
                                <LazyLoadImage src={`../Image/user.png`}
                                    alt={post?.user?.username}
                                    className="image_user_info"
                                />

                            }

                            <span className="text_user_name">
                                {post?.user?.username}
                            </span>

                            {userInfo ?

                                userInfo._id === userid?._id &&
                                <span className="Icons_Remove" onClick={(e) => HandleOpenList(e, post?._id)}>
                                    ...


                                    {openRemoveListBar && post?._id === idSet &&

                                        <ul className="List_remove_Edit_Post">
                                            <li onClick={(e) => HandleEditPost(e, post?._id)}>
                                                <i className="far fa-edit"></i>
                                                Edit Post
                                            </li>
                                            <li onClick={() => dispatch(RemovePost_action(post?._id))}>
                                                <i className="far fa-trash-alt"></i>
                                                move to archive

                                            </li>
                                        </ul>
                                    }

                                </span>
                                : null}
                        </div>


                        {post?.textpost &&

                            <div className="textPost_xp" >
                                {post?.textpost}
                            </div>
                        }


                        <Row className="justify-content-center" >
                            <div className="Image_ALL_USER" >
                                {post?.image?.map((im, imIndex) => (

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
                                        onClick={(e) => HandleOpenPhoto(e, post?.image, im)}
                                    />
                                ))}
                            </div>

                        </Row>



                        <Card.Body>


                            <Card.Title className="cart_title">
                                {post?.liken?.length > 0 ?
                                    <>

                                        <i className="fas fa-thumbs-up color_red"></i>
                                        <i className="fas fa-heart color_bule"></i>
                                        {post?.liken?.map((userLike, userLikeIndex) => (


                                            <span className="userLike" key={userLikeIndex} onClick={(e) => HandleOpenLikeUser(e, post?.liken)}>

                                                {userLike?.username}{`,`}


                                            </span>




                                        ))}
                                        <span className="curnt_ather_Like">{post?.liken?.length} others</span>
                                    </>


                                    : null



                                }




                                <span className="comments_users">
                                    {post?.comment?.length === 0 ? null : <span>{post?.comment?.length} comments</span>}
                                </span>
                            </Card.Title>



                            {userInfo ?
                                <Card.Text className="cart_likes">
                                    <span className={post?.liken?.find((like) => like?.userId === userInfo._id) ? "Like_user" : "notLiken"}
                                        onClick={() => dispatch(Unlike_action({ _id: post?._id }))}
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



                            {post?.comment?.length === 0 ? null :

                                <Card.Text className={openNavShow && post?._id === dPostOnly ? "cart_comment open" : "cart_comment"}>






                                    {post?.comment?.map((commt, commtIndex) => (


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
                                                            <span className="Icons_Remove_comment" onClick={(e) => HandleDeleteCommit(e, post?._id, commt?._id)}>
                                                                ...







                                                                {openDeleteComment && idComment === commt?._id &&
                                                                    <ul className="POATION_delete_edit">
                                                                        <li onClick={() =>
                                                                            dispatch(CommentReomve_action(post?._id, commt?._id))
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
                                                                className="image_comment"
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



                            {post?.comment.length > 2 ?
                                <Card.Text>
                                    <span className={openNavShow && post?._id === dPostOnly ? "view_comments open" : "view_comments"}
                                        onClick={(e) => onpenNavBarComment(e, post?._id)}
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
                                            onKeyPress={(e) => e.key === 'Enter' ? HandleComment(e, post?._id) : null}

                                        />
                                        <span className="Icons_Write_comment" >
                                            <i className="far fa-smile-wink Add_photo_user_postion">
                                                <input
                                                    type="file"
                                                    className="Add_photo_user"
                                                    name="image"
                                                    onChange={HandleImage}
                                                // onClick={()=> console.log('click')}

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


                ))}






            </Col>






            {openOpenImage &&


                <SliderImage
                    currentSoffa={currentSoffa}
                    imageSave={imageSave}
                    setImageSave={setImageSave}
                    arrayList={arrayList}
                    setArrayList={setArrayList}
                    setOpenOpenImage={setOpenOpenImage}
                />



            }



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



        </Fragment>

    )
}


export default UserPostShow

/*
<h1> mahmoud, Pricesdsd Alassel 17 others</h1>
*/