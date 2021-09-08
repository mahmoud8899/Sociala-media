
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


} from "../Action/types"


export const postIdUserReducres = (state = {}, action) => {

    switch (action.type) {
        case ADD_POST_ID_SUCCESS: return { ...state, postUserProduct: action.payload }

        case ADD_POST_ID_FAIL: return { error: action.payload }
        default: return state
    }
}

// get post
export const postIdeducres = (state = { postID: [] }, action) => {
    switch (action.type) {

        case ADD_POST_ONLY_USER_SUCCESS: return { ...state, postID: action.payload }
        case ADD_POST_ONLY_USER_FAIL: return { error: action.payload }
        default: return state
    }
}


// view liken user 
export const ViewSlIKENResucres = (state = {}, action) => {
    switch (action.type) {

        case ADD_LIKE_USER_SUCCESS: return { ...state, success: action.payload }
        case ADD_LIKE_USER_FAIL: return { error: action.payload }
        default: return state
    }
}

// PUT LIKE
export const AddLikeReducres = (state = {}, action) => {
    switch (action.type) {

        case ADD_LIKE_SUCCESS: return { ...state, success: action.payload }
        case ADD_LIKE_FAIL: return { error: action.payload }
        default: return state
    }
}

// remove comment
// Delete comment 
export const commentReomveRdures = (state = {}, action) => {
    switch (action.type) {

        case ADD_COMMENT_REMOVE_SUCCESS: return { ...state, success: action.payload }
        case ADD_COMMENT_REMOVE_FAIL: return { error: action.payload }
        default: return state
    }
}


// remove post
// Delete post 
export const UpdatePostRdures = (state = {}, action) => {
    switch (action.type) {

        case ADD_POST_UPDATE_SUCCESS: return { ...state, success: action.payload }
        case ADD_POST_UPDATE_FAILT: return { error: action.payload }
        default: return state
    }
}



// remove post
// Delete post 
export const removePostRdures = (state = {}, action) => {
    switch (action.type) {

        case ADD_POST_REMOVE_SUCCESS: return { ...state, success: action.payload }
        case ADD_POST_REMOVE_FAIL: return { error: action.payload }
        default: return state
    }
}

// post add comment.. 
export const addcommentReducres = (state = {}, action) => {
    switch (action.type) {

        case ADD_USER_COMMENT_SUCCESS: return { ...state, success: action.payload }
        case ADD_USER_COMMENT_FAIL: return { error: action.payload }
        default: return state
    }
}




// create post
// post visa 
export const postcreateRdures = (state = {}, action) => {
    switch (action.type) {

        case ADD_USER_CREATE_POST_SUCCESS: return { ...state, success: action.payload }
        case ADD_USER_CREATE_POST_FAIL: return { error: action.payload }
        default: return state
    }
}

// post show 
export const postReducres = (state = { post: [] }, action) => {
    switch (action.type) {

        case ADD_USER_POST_SUCCESS: return { ...state, post: action.payload }
        case ADD_USER_POST_FAIL: return { error: action.payload }
        default: return state
    }
}