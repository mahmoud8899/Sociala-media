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


} from "./types"
import axios from "axios"





// SHOW STORY.
// get .../api/story/story
export const ShowAllStoryAction = () => async (dispatch) => {
    try {



        const { data } = await axios.get(`/api/story/story`)
        dispatch({ type: ADD_STORY_SHOW_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_STORY_SHOW_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}




// create story ... 
// post .../api/story/
export const CreateStoryAction = (user) => async (dispatch, getState) => {
    try {

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/story/`, user, config)
        dispatch({ type: ADD_STORY_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_STORY_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// List user...search .
// get /// /api/listusers
export const ListUsersAction = () => async (dispatch) => {
    try {

        const { data } = await axios.get(`/api/listusers/`)
        dispatch({ type: ADD_LIST_USERS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_LIST_USERS_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}






// all friends.... 
// user get// api/allfriends/
export const AllFriendsUserAction = (id) => async (dispatch) => {
    try {

        const { data } = await axios.get(`/api/allfriends/${id}`)
        dispatch({ type: ADD_USER_FRIENDS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USER_FRIENDS_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}




// post uploading image and cover... 
// url / post /  /api/upload/6115293278692417d805d3af
export const uploadingCoverAndImagAction = (user) => async (dispatch) => {
    try {

        const { data } = await axios.post(`/api/upload/${user._id}/`, user)
        //  console.log('Auth', data)
        dispatch({ type: ADD_UPLOADING_USER_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: ADD_UPLOADING_USER_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }

}

//  await for Add comfig
// /api/showawait/611f9879f9034425d494b6e8
export const ConfirmFrindes_Action = (user) => async (dispatch) => {
    try {



        const { data } = await axios.get(`/api/showawait/${user}`)
        dispatch({ type: ADD_USER_FRINDS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USER_FRINDS_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}





// /api/addfriends/609b922170bd292700a7297c
// add friends and reomve...
export const SendFrind_action = (user) => async (dispatch, getUser) => {
    try {


        const { data } = await axios.put(`/api/send/friends/${user._id}`, user)
        dispatch({ type: ADD_USER_SEND_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USER_SEND_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}







//  show all requires...
// get   api/requires/611fcae2a1d38c06740e25bf
export const okejFriends_action = (user) => async (dispatch) => {
    try {




        const { data } = await axios.get(`api/requires/${user._id}`, user)
        dispatch({ type: ADD_USER_OKEJ_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USER_OKEJ_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// user som send Frindes..
export const UserList_Action = () => async (dispatch, getState) => {
    try {

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        const { data } = await axios.get(`/api/allasendfriend/`, config)
        dispatch({ type: ADD_USER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USER_LIST_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// userName = .. 
// POST /api/change/609c14af03b8e42af48e12c8
export const firends_OkejAction = (user) => async (dispatch) => {
    try {

        const { data } = await axios.put(`/api/send/waitfriends/${user._id}`, user)
        dispatch({ type: ADD_USER_USERNAME_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USER_USERNAME_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}





// Address Edit.....
// POST... /api/addadress/609b922170bd292700a7297c
export const Address_action = (user) => async (dispatch) => {
    try {

        const { data } = await axios.post(`/api/addadress/${user._id}/`, user)
        dispatch({ type: ADD_USER_ADDRESS_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({
            type: ADD_USER_ADDRESS_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}






// user List Friends... 
// GET localhost:8000/api/showfriends/609b922170bd292700a7297c
export const ShowFrinds_action = (user) => async (dispatch) => {

    dispatch({ type: ADD_USERLISTS_FRIENDS_LOADING })
    const { data } = await axios.get(`/api/showfriends/${user}/`)
    dispatch({ type: ADD_USERLISTS_FRIENDS_SUCCECC, payload: data })
    try { } catch (error) {
        dispatch({
            type: ADD_USERLISTS_FRIENDS_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}



// user Profile id.
// GET api/userid/2983923892389
export const UserProfile_Action = (user) => async (dispatch) => {
    try {
        //   dispatch({ type: ADD_USER_PROFILE_LOADING })
        const { data } = await axios.get(`/api/userid/${user}/`)
        dispatch({ type: ADD_USER_PROFILE_SUCCESCC, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USER_PROFILE_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}



// sINGuP... 
export const SingUp_action = (user) => async (dispatch) => {
    try {
        dispatch({ type: ADD_USER_LOADING })
        const { data } = await axios.post(`/api/singup/`, user)
        dispatch({ type: ADD_USER_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {

        dispatch({
            type: ADD_USER_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}




// logout... 
export const LogoUt_action = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: ADD_LOGIN_RESPONSE })
}


// login ...
export const Login_action = (user) => async (dispatch) => {
    try {
        dispatch({ type: ADD_USER_LOADING })
        const { data } = await axios.post(`/api/login/`, user)
        dispatch({ type: ADD_USER_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {

        dispatch({
            type: ADD_USER_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}