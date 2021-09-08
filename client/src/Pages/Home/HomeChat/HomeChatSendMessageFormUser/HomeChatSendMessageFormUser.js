import axios from "axios"
import { useState } from "react"
import "./HomeChatSendMessageFormUser.css"


const HomeChatSendMessageFormUser = ({ userInfo, socket, idChat, setMessagerallt, messagerallt }) => {


    const [textInput, setTextInput] = useState()
    const [stopUploading, setStopUploading] = useState(false)


    // send Image... 
    const HandleUploadingImage = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setStopUploading(true)
        try {

            const { data } = await axios.post(`/api/`, formData)
            console.log(data)
            setStopUploading(false)
        } catch (error) {
            setStopUploading(false)
            console.error(error)
        }
    }


    // send Message... 
    const HandleMessage = (e) => {
        e.preventDefault()


        if (userInfo && textInput && idChat) {

            const lastUser = idChat?.users?.find((csx) => csx !== userInfo._id)
          // console.log('lastUser', lastUser)
            if (socket) {
                socket.emit('firstSend', ({
                    userId: userInfo._id,
                    chatId: idChat?._id,
                    text: textInput,
                    lastUser
                }))


                socket.on('loadingMessage', (data) => {
                    setMessagerallt([...data.message, messagerallt])
                })
            }

            setTextInput('')
            //    console.log(
            //   'send Message form User :', textInput,
            //     'id chat', idChat?._id,
            //      'user info', userInfo._id
            //   )
            // setTextInput('')
        }


    }




    return (
        <div className="chat_sendMessage">

            {stopUploading && <span className="loading_hidden">LoADING..</span>}

            <div className="first_photo_x" >

                <i className="fas fa-image addPostion" onClick={() => console.log('hello click')}>
                    <input
                        type="file"
                        className="uploadingUserImage"
                        onChange={HandleUploadingImage}
                        name="image"
                    />
                </i>
            </div>


            <div className="first_photo_input">
                <input
                    type="text"
                    placeholder="Aa"
                    className="chat_sendMessage_input"
                    onChange={(e) => setTextInput(e.target.value)}
                    name="text"
                    onKeyPress={(e) => e.key === 'Enter' ? HandleMessage(e) : null}
                    value={textInput}

                />
                <i className="fas fa-smile-wink"></i>
            </div>


            <div className="first_photo_icons">
                <i className="fas fa-thumbs-up"></i>
            </div>



        </div>
    )

}


export default HomeChatSendMessageFormUser