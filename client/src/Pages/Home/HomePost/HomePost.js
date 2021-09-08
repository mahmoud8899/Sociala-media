import "./HomePost.css"
import { Col} from "react-bootstrap"
import HomePostShow from "./HomePostShow/HomePostShow"
import HomePostStory from "./HomePostStory/HomePostStory"
import UserPost from "../../Profile/UserPost/UserPost"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
const HomePost = () => {


    // userifno...
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: userid } = userLogin
    const [changeToPOst, setChangeToPOst] = useState(false)


    // all post from Users...
    const listpost = useSelector((state) => state.listpost)
    const { post: postID } = listpost
    // console.log('all pos', postID)



    const [idPostEdit, setIdPostEdit] = useState()



    useEffect(() => {

        if (userid) {
            //   console.log(userInfo)
            return setChangeToPOst(true)
        } else {
            return setChangeToPOst(false)
        }

    }, [userid, changeToPOst])






    return (
        <Col xs={11} sm={10} md={6} lg={5} className="testcccs">



            <HomePostStory />




            <UserPost
                changeToPOst={changeToPOst}
                userid={userid}
                setIdPostEdit={setIdPostEdit}
                idPostEdit={idPostEdit}
                postID={postID}


            />




            <HomePostShow setIdPostEdit={setIdPostEdit} />


        </Col>

    )
}


export default HomePost


/*

*/

