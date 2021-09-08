import { useEffect, useState } from "react"
import { Image } from "react-bootstrap"

const HomeChatListUsers = ({ cov, userInfo, list, userOnlien }) => {


    const [usersChat, setUsersChat] = useState(null)
    // console.log('usersChat', usersChat)


    useEffect(() => {
        if (userInfo) {

            let filterCheck = cov?.users?.find((usx) => usx !== userInfo._id)

            setUsersChat(list?.filter((uxs) => uxs?._id?.toString() === filterCheck?.toString()))


        }

    }, [userInfo,list,cov])



    return (


        <>
            {usersChat?.map((uses, userIndex) => (
                <div className="List_user_InfoImage" key={userIndex}>

                    {uses?.profileImage ?
                        <Image src={uses?.profileImage} alt={uses?.username} className="Image_chat" />
                        :
                        <Image src={`../Image/user.png`} alt="nice photo" className="Image_chat" />
                    }


                    <span>{uses?.username}</span>
                    {userOnlien?.map((online) => (
                        online?.userId === uses?._id &&

                        <span className="green add_grren" key={online}></span>

                    ))}

                </div>

            ))}


        </>


    )
}


export default HomeChatListUsers