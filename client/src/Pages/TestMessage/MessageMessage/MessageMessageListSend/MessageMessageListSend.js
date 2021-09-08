import axios from "axios"
import { useState } from "react"
import { Col } from "react-bootstrap"
import "./MessageMessageListSend.css"

const MessageMessageListSend = ({ idChat, socket, userInfo ,setMessageAll ,messageAll }) => {



    const [textInput, setTextInput] = useState('')
    const [error, setError] = useState('')
    const [uploadingImage, setUploadingImage] = useState(false)
    const [imageUp, setImageUp] = useState('')


    // uploading image..
    const HandleUploading = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploadingImage(true)
        try {
            const { data } = await axios.post(`/api/`, formData)
            setImageUp(data)
            //  console.log(data)
            setUploadingImage(false)
        } catch (error) {

            setError(
                error.response &&
                    error.response.data.message ?
                    error.response.data.message :
                    error.message
            )
            return setUploadingImage(false)
        }
    }

    const HandleSendMessage = (e) => {
        e.preventDefault()

        if (idChat && userInfo && textInput.trim() && socket) {


            const lastUser = idChat?.users?.find((ux) => ux !== userInfo._id)

            socket.emit('firstSend', {
                userId: userInfo._id,
                chatId: idChat?._id,
                text: textInput,
                lastUser
            })
          //  console.log('setTextInput', textInput, imageUp, userInfo._id, lastUser)




            setTextInput('')
            setImageUp('')

            socket.on('loadingMessage', (data)=>{
              //  console.log('data',data)
                setMessageAll([...data.message, messageAll])
            })
        }


    }


    return (
        <div className="Send_iNPUT_mESSAGE">

            {error && <p className="xps_error">{error}</p>}
            {imageUp && <p className="xps_error">{imageUp}</p>}

            <Col xs={2} sm={3} md={3} lg={2}>
                <div className="Send_iNPUT_mESSAGE_Icons">
                    <i className="fas fa-plus"></i>
                    <i className="fas fa-camera-retro">
                        <input
                            type="file"
                            className="uploading_Image_chat"
                            onChange={HandleUploading}
                            name="image"

                        />
                    </i>
                </div>


            </Col>

            {uploadingImage && <span>Loading...</span>}


            <Col xs={8} sm={7} md={7} lg={9}>

                <div className="Hape_Input">
                    <input
                        type="text"
                        className={textInput ? "Send_iNPUT_mESSAGE_input_add": "Send_iNPUT_mESSAGE_input"}
                        placeholder="Aa"
                        onChange={(e) => setTextInput(e.target.value)}
                        name="textInput"
                        value={textInput}
                        onKeyPress={(e) => e.key === 'Enter' ? HandleSendMessage(e) : null}

                    />
                    <i class="fas fa-smile-beam"></i>
                </div>
            </Col>


            <Col xs={2} sm={2} md={2} lg={1}>
                <div className="Send_iNPUT_mESSAGE_2Icons">
                    <i className="fas fa-heart"></i>
                </div>
            </Col>








        </div>
    )
}


export default MessageMessageListSend