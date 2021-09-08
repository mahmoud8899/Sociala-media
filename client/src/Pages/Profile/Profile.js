import { useEffect, useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UserProfile_Action, AllFriendsUserAction } from "../../redux/Action/Auth_action"
import { Onlypost_user_action } from "../../redux/Action/post_action"
import { Container, Row } from "react-bootstrap"
import "./UserProfile.css"
import UserPostShow from "./UserPostShow/UserPostShow"
import UserFriends from "./UserFriends/UserFriends"
import UserPost from "./UserPost/UserPost"
import UserEditText from "./UserEditText/UserEditText"
import UserNavBar from "./UserNavBar/UserNavBar"
import UserProfile from "./UserProfile/UserProfile"
import UserOpenPhoto from "./UserOpenPhoto/UserOpenPhoto"
import Title from "../Title/Title"
import {noeXOS} from "../../App"



const Profile = ({ match }) => {


    const [isProfile, setIsProfile] = useContext(noeXOS)








    // check userInfo....
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin




    const ProfileUserId = match.params.id
    // console.log('ProfileUserId',ProfileUserId)


      useEffect(()=>{

        if(ProfileUserId === userInfo?._id){
            return setIsProfile(true)
        }else{
            return setIsProfile(null)
        }

       

      },[ProfileUserId,userInfo,setIsProfile])

    const dispatch = useDispatch()
    // user Info...
    const userID = useSelector((state) => state.userID)
    const { userid } = userID

    // post from user..
    const postuserID = useSelector((stata) => stata.postuserID)
    const { postID } = postuserID
    //console.log('id',postID)

    // uploading imagprofile and cover.
    const userUploading = useSelector((state) => state.userUploading)
    const { success: successUserUploading } = userUploading


    // Remove post.
    const postremoveID = useSelector((state) => state.postremoveID)
    const { success: successpostremoveID } = postremoveID


    // Create post...
    const createpostID = useSelector((state) => state.createpostID)
    const { success: successcreatepostID } = createpostID

    // add comment
    const addcommentID = useSelector((state) => state.addcommentID)
    const { success: successaddcommentID } = addcommentID

    // remove comment
    const removecommentID = useSelector((state) => state.removecommentID)
    const { success: successremovecommentID } = removecommentID


    // like
    const likeID = useSelector((state) => state.likeID)
    const { success: successlikeID } = likeID


    // Update post.
    const updatepostID = useSelector((stata) => stata.updatepostID)
    const { success: successupdatepostID } = updatepostID



    //  add address
    const addressID = useSelector((state) => state.addressID)
    const { success: successaddressID } = addressID




    // console.log('the is data here now userid', userid)
    // console.log('ProfileUserId',ProfileUserId)
    const [openFrinds, setOpenFrinds] = useState(false)
    const [openPhotos, setOpenPhotos] = useState(false)
    const [openNavBar, setOpenNavBar] = useState(false)
    const [openAbout, setOpenAbout] = useState(false)
    const [idPostEdit, setIdPostEdit] = useState()




    // show user profile..
    useEffect(() => {

        if (ProfileUserId) {
            // console.log('i am here ...')
            dispatch(UserProfile_Action(ProfileUserId))
            dispatch(Onlypost_user_action(ProfileUserId))
            dispatch(AllFriendsUserAction(ProfileUserId))


             
            


        } 




    }, [ProfileUserId, dispatch, successUserUploading, successaddressID,isProfile])



   // console.log('isProfile', isProfile)


    useEffect(() => {

        if (successcreatepostID ||
            successpostremoveID ||
            successaddcommentID ||
            successremovecommentID ||
            successlikeID ||
            successupdatepostID) {


            dispatch(Onlypost_user_action(ProfileUserId))
        }

    }, [successpostremoveID,
        ProfileUserId,
        dispatch,
        successcreatepostID,
        successremovecommentID,
        successaddcommentID,
        successlikeID,
        successupdatepostID
    ])



    // open all photos..  slider Photos...
    const [imagePhoto, setImagePhoto] = useState('')
    const [openCloseImage, setOpenCloseImage] = useState(false)
    useEffect(() => {

        if (imagePhoto) {
            setOpenCloseImage(true)
        }

    }, [imagePhoto, setOpenCloseImage])




    return (

        <Container fluid>
            <Title title={`My Profile ${userid?.username}`} />
            <Row className="justify-content-center colx">



                <UserProfile
                    ProfileUserId={ProfileUserId}
                    userid={userid}
                    setImagePhoto={setImagePhoto}
                    userInfo={userInfo}
                />



                <UserNavBar
                    openFrinds={openFrinds}
                    setOpenFrinds={setOpenFrinds}
                    setOpenPhotos={setOpenPhotos}
                    openPhotos={openPhotos}
                    setOpenNavBar={setOpenNavBar}
                    openNavBar={openNavBar}
                    setOpenAbout={setOpenAbout}
                    openAbout={openAbout}
                    userid={userid}
                    ProfileUserId={ProfileUserId}
                    userInfo={userInfo}
                    setImagePhoto={setImagePhoto}
                />





                {
                    !openFrinds && !openPhotos &&
                    !openAbout && !openNavBar &&

                    <>
                        <Row className="mcxs_S" >


                            <UserEditText
                                userid={userid}
                                userInfo={userInfo}
                            />

                            <UserPost
                                userid={userid}
                                setIdPostEdit={setIdPostEdit}
                                idPostEdit={idPostEdit}
                                postID={postID}
                            />


                        </Row>


                        <Row className="justify-content-center">
                            <UserFriends
                                setOpenPhotos={setOpenPhotos}
                                setOpenFrinds={setOpenFrinds}
                                userid={userid}
                                setImagePhoto={setImagePhoto}

                            />
                            <UserPostShow
                                postID={postID}
                                userInfo={userInfo}
                                setIdPostEdit={setIdPostEdit}
                                userid={userid}
                                setImagePhoto={setImagePhoto}

                            />

                        </Row>

                    </>

                }

                <UserOpenPhoto
                    imagePhoto={imagePhoto}
                    setImagePhoto={setImagePhoto}
                    openCloseImage={openCloseImage}
                    setOpenCloseImage={setOpenCloseImage}

                />
            </Row>



         
        </Container >



    )

}


export default Profile

