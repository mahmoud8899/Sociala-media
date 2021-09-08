import axios from "axios"
import {
    
    ADD_USER_POST_SUCCESS,
    ADD_USER_POST_FAIL,


    ADD_USER_CREATE_POST_SUCCESS,
    ADD_USER_CREATE_POST_FAIL,



    ADD_USER_COMMENT_SUCCESS,
    ADD_USER_COMMENT_FAIL,



    ADD_POST_REMOVE_SUCCESS,
    ADD_POST_REMOVE_FAIL,

   
    ADD_POST_UPDATE_SUCCESS,
    ADD_POST_UPDATE_FAILT,



    ADD_COMMENT_REMOVE_SUCCESS,
    ADD_COMMENT_REMOVE_FAIL,


    ADD_LIKE_SUCCESS,
    ADD_LIKE_FAIL,

    ADD_LIKE_USER_SUCCESS,
    ADD_LIKE_USER_FAIL,


    ADD_POST_ONLY_USER_SUCCESS,
    ADD_POST_ONLY_USER_FAIL,

    
    ADD_POST_ID_SUCCESS,
    ADD_POST_ID_FAIL,
} from "./types"




// post id ... 
export const POSTiD_Action = (user) => async (dispatch) => {
    try {


        const { data } = await axios.get(`/api/post/${user}`)
        dispatch({ type: ADD_POST_ID_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ADD_POST_ID_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

// Only post User ... 
// get localhost:8000/api/post/userid/609c14af03b8e42af48e12c8
export const Onlypost_user_action = (user) => async (dispatch) => {
    try {


        const { data } = await axios.get(`/api/post/userid/${user}`)
        dispatch({ type: ADD_POST_ONLY_USER_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ADD_POST_ONLY_USER_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// views Like all user ... 
export const ViewsLikeUserAction = (user) => async (dispatch, getState) => {
    try {

       
        const { data } = await axios.get(`/api/post/liken/user/${user}/`,)
        dispatch({ type: ADD_LIKE_USER_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ADD_LIKE_USER_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// add like and unlike
// PUT   /api/post/like/60a3cb0d76b3773268d6bb9e
export const Unlike_action = (post) => async (dispatch, getState) => {
    try {

        const { userLogin: { userInfo } } = getState()
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
        const { data } = await axios.put(`/api/post/like/${post._id}/`, post, config)
        dispatch({ type: ADD_LIKE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ADD_LIKE_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}





// remove comment 
// DELETE //api/post/updatecomment/60a3cb0d76b3773268d6bb9e/60a3df9f2daa950fc833e61b
export const CommentReomve_action = (post, comment) => async (dispatch, getState) => {
    try {

        const { userLogin: { userInfo } } = getState()
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
        const { data } = await axios.delete(`/api/post/updatecomment/${post}/${comment}`, config)
        dispatch({ type: ADD_COMMENT_REMOVE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ADD_COMMENT_REMOVE_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}




// post Update 
// post /post/update/:id/
export const PostUpdate_action = (user) => async (dispatch, getState) => {
    try {
     
        const { userLogin: { userInfo } } = getState()
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
        const { data } = await axios.put(`/api/post/update/${user._id}/`, user, config)
        dispatch({ type: ADD_POST_UPDATE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ADD_POST_UPDATE_FAILT,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// remove Post... 
// post /api/post/delete/60a3c9288dc2370d2cf849bd
export const RemovePost_action = (user) => async (dispatch, getState) => {
    try {

        const { userLogin: { userInfo } } = getState()
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
        const { data } = await axios.delete(`/api/post/delete/${user}/`, config)
        dispatch({ type: ADD_POST_REMOVE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ADD_POST_REMOVE_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// post add comment... 
// api/post/comment/idpost...
export const addComment = (user) => async (dispatch, getState) => {
    try {



        const { userLogin: { userInfo } } = getState()
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
        const { data } = await axios.post(`/api/post/comment/${user._id}/`, user, config)

        dispatch({ type: ADD_USER_COMMENT_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ADD_USER_COMMENT_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}



// create Post.. 
export const CreatePost_action = (user) => async (dispatch, getState) => {
    try {



        const { userLogin: { userInfo } } = getState()
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }

        const { data } = await axios.post(`/api/post/create/`, user, config)
        dispatch({ type: ADD_USER_CREATE_POST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ADD_USER_CREATE_POST_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}

// get /api/post/
export const Post_visaAction = () => async (dispatch) => {
    try {
        

        const { data } = await axios.get(`/api/post/`)
        dispatch({ type: ADD_USER_POST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USER_POST_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}