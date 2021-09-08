import { Image } from "react-bootstrap"
import "./HomeChatUserTop.css"
const HomeChatUserTop = ({ setIdChat, userOpenImage, userOnlien }) => {




    return (
        <div className="Chat_info_User_top">
            {userOpenImage?.[0]?.profileImage ?
                <Image src={`${userOpenImage?.[0]?.profileImage}`} alt={userOpenImage?.[0]?.username} className="Chat_info_User_Image" />

                :
                <Image src={`../Image/user.png`} alt={userOpenImage?.[0]?.username} className="Chat_info_User_Image" />
            }

            <span className="Chat_info_User_username">{userOpenImage?.[0]?.username}</span>
            {userOnlien?.map((onli) => (
                onli?.userId === userOpenImage?.[0]?._id &&
                <span key={onli} className="green add_grren"></span>
            ))}


            <span className="Chat_info_User_Icons">
                <i className="fas fa-video"></i>
                <i className="fas fa-phone-alt"></i>
                <i className="fas fa-minus"></i>
                <i className="fas fa-times" onClick={() => setIdChat(null)}></i>
            </span>

        </div>
    )
}


export default HomeChatUserTop