
import { LazyLoadImage } from "react-lazy-load-image-component"
import { Link } from "react-router-dom"


const Notifications = ({ openNotification, post }) => {



    return (

        <>

            {openNotification &&

                <div className="Notifications_user">

                    <div className="Notifications_user_text">
                        <h1>Notifications</h1>
                        <span>...</span>
                    </div>

                    <div className="New_Notifications_user_text">
                        <span>New </span>
                        <span className="addColor_x">see all </span>
                    </div>
                    <ul className="list_Notifications">


                        {post?.map((lis, lisIndex) => (

                            <li key={lisIndex}>
                                <Link  className="posT_id"   to={`/post/${lis?._id}`}>
                                <div className="List_Image_user_list_Notifications">
                                    {lis?.user?.profileImage ? 
                                     <LazyLoadImage src={lis?.user?.profileImage} className="Image_Notifications" />
                                    :
                                    <LazyLoadImage src={`../Image/user.png`} className="Image_Notifications" />
                                }
                                   
                                    <i className="far fa-comment-alt"></i>
                                </div>
                                <div className="List_Image_Info_list_Notifications">
                                    <span>{lis?.user?.username}</span>
                                    <span className="createPost_c">Create new Post </span>
                                </div>
                                <span className="blue_notifation">

                                </span>
                                </Link>
                            </li>


                        ))}





                    </ul>
                </div>

            }

        </>
    )
}


export default Notifications