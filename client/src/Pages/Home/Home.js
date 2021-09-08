import { Container, Row } from "react-bootstrap"
import HomeChat from "./HomeChat/HomeChat"
import HomePost from "./HomePost/HomePost"
import HomeNavBar from "./HomeNavBar/HomeNavBar"
import "./Home.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect ,useContext} from "react"
import { Post_visaAction } from "../../redux/Action/post_action"
import { ShowAllStoryAction } from "../../redux/Action/Auth_action"
import {noeXOS} from "../../App"
const Home = () => {


    const dispatch = useDispatch()
    const [isProfile, setIsProfile] = useContext(noeXOS)
    // check userInfo....
    ///                 ..............................................................

    // Create post...
    const createpostID = useSelector((state) => state.createpostID)
    const { success: successcreatepostID } = createpostID

    // Update post.
    const updatepostID = useSelector((stata) => stata.updatepostID)
    const { success: successupdatepostID } = updatepostID

    // Remove post.
    const postremoveID = useSelector((state) => state.postremoveID)
    const { success: successpostremoveID } = postremoveID
    // add comment
    const addcommentID = useSelector((state) => state.addcommentID)
    const { success: successaddcommentID } = addcommentID

    // remove comment
    const removecommentID = useSelector((state) => state.removecommentID)
    const { success: successremovecommentID } = removecommentID


    // like
    const likeID = useSelector((state) => state.likeID)
    const { success: successlikeID } = likeID



    const storyID = useSelector((state) => state.storyID)
    const { createstory } = storyID


    // remove add post allt 
    useEffect(() => {


        dispatch(Post_visaAction())

        setIsProfile(null)

    }, [dispatch,
        successremovecommentID,
        successaddcommentID,
        successlikeID,
        successpostremoveID,
        successupdatepostID,
        successcreatepostID,
        isProfile,
        setIsProfile
    ])



    // create story...
    useEffect(() => {


        dispatch(ShowAllStoryAction())


    }, [createstory,dispatch])


    return (
        <Container fluid>
            <Row className="top_first_Home">

                <HomeNavBar />

                <HomePost />


                <HomeChat />


            </Row>
        </Container>
    )
}
export default Home