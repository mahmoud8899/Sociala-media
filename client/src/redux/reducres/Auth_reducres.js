import {
    ADD_USER_LOADING,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    ADD_LOGIN_RESPONSE,


    
    ADD_USER_PROFILE_SUCCESCC,
    ADD_USER_PROFILE_FAIL,



    ADD_USERLISTS_FRIENDS_LOADING,
    ADD_USERLISTS_FRIENDS_SUCCECC,
    ADD_USERLISTS_FRIENDS_FAIL,


    ADD_USER_IMAGE_LOADING,
    ADD_USER_IMAGE_SUCCESS,
    ADD_USER_IMAGE_FAIL,




    ADD_USER_ADDRESS_SUCCESS,
    ADD_USER_ADDRESS_FAIL,


    ADD_USER_USERNAME_SUCCESS,
    ADD_USER_USERNAME_FAIL,



    ADD_USER_LIST_SUCCESS,
    ADD_USER_LIST_FAIL,



    ADD_USER_OKEJ_SUCCESS,
    ADD_USER_OKEJ_FAIL,



    ADD_USER_SEND_SUCCESS,
    ADD_USER_SEND_FAIL,



    ADD_USER_FRINDS_SUCCESS,
    ADD_USER_FRINDS_FAIL,

    ADD_UPLOADING_USER_SUCCESS,
    ADD_UPLOADING_USER_FAIL,


    ADD_USER_FRIENDS_SUCCESS,
    ADD_USER_FRIENDS_FAIL,


    ADD_LIST_USERS_SUCCESS,
    ADD_LIST_USERS_FAIL,

    ADD_STORY_SUCCESS,
    ADD_STORY_FAIL,

    ADD_STORY_SHOW_SUCCESS,
    ADD_STORY_SHOW_FAIL,


} from "../Action/types"


// show all story..
export const ShowStoryReducres = (state = {}, action) => {

    switch (action.type) {
        case ADD_STORY_SHOW_SUCCESS: return { ...state, allStory: action.payload }
        case ADD_STORY_SHOW_FAIL: return { error: action.payload }
        default : return state
    }
}


// create Story ...
export const CreateStoryReducres = (state = {}, action) => {

    switch (action.type) {
        case ADD_STORY_SUCCESS: return { ...state, createstory: action.payload }
        case ADD_STORY_FAIL: return { error: action.payload }
        default : return state
    }
}

// List all users
export const LISTsUserResucres = (state = {}, action) => {
    switch (action.type) {
        case ADD_LIST_USERS_SUCCESS: return { ...state, list: action.payload }
        case ADD_LIST_USERS_FAIL: return { error: action.payload }
        default: return state
    }
}




// list firend to user.. 
export const ListFrinedUserReducres = (state = {}, action) => {
    switch (action.type) {
        case ADD_USER_FRIENDS_SUCCESS: return { ...state, listfirend: action.payload }
        case ADD_USER_FRIENDS_FAIL: return { error: action.payload }
        default: return state
    }
}




// post  cover and image uploading...
export const uploadingCoverImageReducres = (state = {}, action) => {
    switch (action.type) {
        case ADD_UPLOADING_USER_SUCCESS: return { ...state, success: action.payload }
        case ADD_UPLOADING_USER_FAIL: return { error: action.payload }
        default: return state
    }
}



// post change Username... 
export const ConfirmFriendReducres = (state = { confirmFriends: {} }, action) => {
    switch (action.type) {

        case ADD_USER_FRINDS_SUCCESS: return { ...state, confirmFriends: action.payload }
        case ADD_USER_FRINDS_FAIL: return { error: action.payload }
        default: return state
    }
}


// post change Username... 
export const SendFrindReducres = (state = {}, action) => {
    switch (action.type) {

        case ADD_USER_SEND_SUCCESS: return { ...state, success: action.payload }
        case ADD_USER_SEND_FAIL: return { error: action.payload }
        default: return state
    }
}


// post change Username... 
export const okejFriendsReducres = (state = { AllRequires: {} }, action) => {
    switch (action.type) {

        case ADD_USER_OKEJ_SUCCESS: return { ...state, AllRequires: action.payload }
        case ADD_USER_OKEJ_FAIL: return { error: action.payload }
        default: return state
    }
}


// post change Username... 
export const UserListReducres = (state = { userlist: [] }, action) => {
    switch (action.type) {

        case ADD_USER_LIST_SUCCESS: return { ...state, userlist: action.payload }
        case ADD_USER_LIST_FAIL: return { error: action.payload }
        default: return state
    }
}



// post change Username... 
export const firndesOkejReducres = (state = { okFrinds: {} }, action) => {
    switch (action.type) {

        case ADD_USER_USERNAME_SUCCESS: return { ...state, okFrinds: action.payload }
        case ADD_USER_USERNAME_FAIL: return { error: action.payload }
        default: return state
    }
}

// POST address profile 
export const AddressprofileReducres = (state = {}, action) => {
    switch (action.type) {

        case ADD_USER_ADDRESS_SUCCESS: return { ...state, success: action.payload }
        case ADD_USER_ADDRESS_FAIL: return { error: action.payload }
        default: return state
    }
}






// POST image profile 
export const ImageprofileReducres = (state = {}, action) => {
    switch (action.type) {
        case ADD_USER_IMAGE_LOADING: return { loadin: true }
        case ADD_USER_IMAGE_SUCCESS: return { success: true }
        case ADD_USER_IMAGE_FAIL: return { error: action.payload }
        default: return state
    }
}



// Userlist friends .... 
export const userListFrindsReducres = (state = { userfrinds: [] }, action) => {
    switch (action.type) {
        case ADD_USERLISTS_FRIENDS_LOADING: return { loadin: true }
        case ADD_USERLISTS_FRIENDS_SUCCECC: return { userfrinds: action.payload }
        case ADD_USERLISTS_FRIENDS_FAIL: return { error: action.payload }
        default: return state
    }
}

// userLogin 
// GET
export const useridReducres = (state = { userid: {} }, action) => {

    switch (action.type) {
        // case ADD_USER_PROFILE_LOADING: return { loading: true }
        case ADD_USER_PROFILE_SUCCESCC: return { ...state, userid: action.payload }
        case ADD_USER_PROFILE_FAIL: return { error: action.payload }

        default: return state
    }
}



// login 
// POST
export const LoginReducres = (state = { userInfo: {} }, action) => {

    switch (action.type) {
        case ADD_USER_LOADING: return { loading: true }
        case ADD_USER_SUCCESS: return { userInfo: action.payload }
        case ADD_USER_FAIL: return { error: action.payload }
        case ADD_LOGIN_RESPONSE: return {}
        default: return state
    }
}


