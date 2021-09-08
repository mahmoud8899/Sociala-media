import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import { composeWithDevTools } from "redux-devtools-extension"


import {
    LoginReducres,
    useridReducres,
    userListFrindsReducres,
    ImageprofileReducres,
    AddressprofileReducres,
    firndesOkejReducres,
    UserListReducres,
    okejFriendsReducres,
    SendFrindReducres,

    ConfirmFriendReducres,
    uploadingCoverImageReducres,
    ListFrinedUserReducres,
    LISTsUserResucres,
    CreateStoryReducres,
    ShowStoryReducres,
    

} from "../reducres/Auth_reducres"


import {
    postReducres,
    postcreateRdures,
    addcommentReducres,
    removePostRdures,
    UpdatePostRdures,
    commentReomveRdures,
    AddLikeReducres,
    postIdeducres,
    ViewSlIKENResucres,
    postIdUserReducres,
} from "../reducres/post_reducres"

import {
    CreateUserChatReducres,
    ShowUserChatReducres,
} from "../reducres/chat_Reducres"

const reducer = combineReducers({

    userLogin: LoginReducres,
    userID: useridReducres,
    userIDFriends: userListFrindsReducres,
    imageID: ImageprofileReducres,
    addressID: AddressprofileReducres,
    firendsOkejIDuSerID: firndesOkejReducres,
    userlistID: UserListReducres,
    okejfrindID: okejFriendsReducres,
    sendfriendID: SendFrindReducres,
    confirmFriendUser: ConfirmFriendReducres,
    listFrindsID: ListFrinedUserReducres,
    listSUsers : LISTsUserResucres,
    storyID: CreateStoryReducres,
    allstoryID : ShowStoryReducres,


    userUploading: uploadingCoverImageReducres,


    listpost: postReducres,
    createpostID: postcreateRdures,

    addcommentID: addcommentReducres,
    postremoveID: removePostRdures,
    updatepostID: UpdatePostRdures,
    removecommentID: commentReomveRdures,
    likeID: AddLikeReducres,
    viewsLikeID: ViewSlIKENResucres,
    postuserID: postIdeducres,
    userPostID : postIdUserReducres,


    chatcreateID : CreateUserChatReducres,
    listchat : ShowUserChatReducres,
})


const localStor = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const intialState = {

    userLogin: {
        userInfo: localStor,
    }

}





const middleware = [thunk]
const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store