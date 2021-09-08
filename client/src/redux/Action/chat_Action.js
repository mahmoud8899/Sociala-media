
import {
    ADD_CREATE_CHAT_SUCCESS,
    ADD_CREATE_CHAT_FAIL,

    ADD_SHOW_CHAT_SUCCESS,
    ADD_SHOW_CHAT_FAIL,
} from "./types"
import axios from "axios"


// axios.get(`/api/chat/${userInfo._id}`)
export const ShowUserChatAction = (user) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/chat/${user}`)
        dispatch({ type: ADD_SHOW_CHAT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_SHOW_CHAT_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}





// create chat... user..
// post  //api/create/chat/
export const CreateChatAction = (user) => async (dispatch) => {
    try {
        const { data } = await axios.post(`/api/create/chat/`, user)
        dispatch({ type: ADD_CREATE_CHAT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_CREATE_CHAT_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}