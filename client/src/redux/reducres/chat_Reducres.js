
import {
    ADD_CREATE_CHAT_SUCCESS,
    ADD_CREATE_CHAT_FAIL,

    ADD_SHOW_CHAT_SUCCESS,
    ADD_SHOW_CHAT_FAIL,


} from "../Action/types"

//show user List chat.. 
// create chat.
export const ShowUserChatReducres = (state = {}, action) => {
    switch (action.type) {

        case ADD_SHOW_CHAT_SUCCESS: return { ...state, listChatUser: action.payload }
        case ADD_SHOW_CHAT_FAIL: return { error: action.payload }
        default: return state
    }
}


// create chat.
export const CreateUserChatReducres = (state = {}, action) => {
    switch (action.type) {

        case ADD_CREATE_CHAT_SUCCESS: return { ...state, createChat: action.payload }
        case ADD_CREATE_CHAT_FAIL: return { error: action.payload }
        default: return state
    }
}
