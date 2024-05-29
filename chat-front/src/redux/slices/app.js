import {createSlice} from "@reduxjs/toolkit";
import axios from "../../utils/axios";
const initialState = {
    loggedInUser: {
        _id: "",
        friends: [],
        firstName: "",
        lastName: "",
        friendRequests: [],
        about: "",
        avatar: "",
        mutualFriends: [],
        status: "",
    },
    sidebar: {
        selectedIcon: "individual" // individual, group, calls, settings
    },
    settings: {

    },
    conversations: {
        currentConversations: {
            groupConversations: [],
            individualConversations: [],
        },
        currentConversation: {
            _id: "",
            isPinned: false,
            participants: [],
            messages: [],
            isIndividual: true,
        },
    },
    logs: {
        snackbar: {
            duration: 3000,
            isOpened: false,
            message: "",
            severity: "",
        },
    },
    contactInfo: {
        isMuted: false,
        isOpened: false,
        numberOfCommonGroups: 0,
        commonGroupName: "",
        currentPage: {
            name: "contactInfo", // topMessages, media
            topMessages: [],
            media: {
                currentPageName: "media", // links, media, documents
                links: [],
                media: [],
                documents: [],
                count: 0,
                lastThreeImage: [],
                alternativeImage: "https://up.yimg.com/ib/th?id=OIP.G37tgeQqSNt7v2oPfj9ltQHaE7&pid=Api&rs=1&c=1&qlt=95&w=151&h=100"
            }
        }
    }
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoggedInUser(state, action) {
            state.loggedInUser = action.payload;
        },
        setSelectedIcon(state, action) {
            state.sidebar.selectedIcon = action.payload;
        },
        setCurrentConversation(state, action) {
            state.conversations.currentConversation = action.payload;
        },
        toggleContactInfoAction(state, action) {
            state.contactInfo.isOpened = !state.contactInfo.isOpened;
        },
        setSnackbar(state, action) {
            state.logs.snackbar = action.payload;
        },
        updateContactInfo(state, action) {
            state.contactInfo = action.payload;
        },
        toggleContactInfo(state, action) {
            state.contactInfo.isOpened = !state.contactInfo.isOpened;
        },
        updateContactInfoCurrentPageName(state, action) {
            state.contactInfo.currentPage.name = action.payload;
        },
        hideSnackbar(state, action) {
            state.logs.snackbar = {
                isOpened: false,
                message: "",
                severity: "",
                duration: 3000,
            }
        },
        addFriendRequest(state, action) {
            state.loggedInUser.friendRequests.push(action.payload);
        },
        friendRequestAccepted(state, action) {
            const reqObj = action.payload;
            state.loggedInUser.friendRequests = state.loggedInUser.friendRequests.filter(req => !(req.sent !== null && reqObj.sent.to === req.sent.to));
            state.loggedInUser.friendRequests.push(reqObj);
        },
        fetchMutualFriends(state, action) {
            const mutualFriends = action.payload;
            state.loggedInUser.mutualFriends = mutualFriends;
        },
        fetchIndividualConversations(state, action) {
            state.conversations.currentConversations.individualConversations = action.payload;
        },
        fetchGroupConversations(state, action) {
            state.conversations.currentConversations.groupConversations = action.payload;
        },
        fetchFriendRequests(state, action) {
            const friendRequests = action.payload;
            const currentUserId = state.loggedInUser._id;

            state.loggedInUser.friendRequests = friendRequests.map(request => {
                if (request.sender._id.toString() === currentUserId) {
                    // If the current user is the sender
                    return {
                        sent: {
                            to: {
                                _id: request.recipient._id,
                                firstName: request.recipient.firstName,
                                lastName: request.recipient.lastName,
                                avatar: request.recipient.avatar,
                            },
                            at: request.sentAt,
                        },
                        received: null,
                        accepted: false,
                        rejected: false,
                    };
                } else if (request.recipient._id.toString() === currentUserId) {
                    // If the current user is the recipient
                    return {
                        sent: null,
                        received: {
                            from: {
                                _id: request.sender._id,
                                firstName: request.sender.firstName,
                                lastName: request.sender.lastName,
                                avatar: request.sender.avatar,
                            },
                            at: request.receivedAt,
                        },
                        accepted: false,
                        rejected: false,
                    };
                } else {
                    return null;
                }
            }).filter(request => request !== null);
        },
        fetchFriends(state, action) {
            state.loggedInUser.friends = action.payload;
        },
        fetchCurrentConversationMessages(state, action) {
            state.conversations.currentConversation.messages = action.payload;
        }
    }
})



export default slice.reducer;




export function setLoggedInUserAction(payload) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.setLoggedInUser(payload));
    };
}

export function setSelectedIconAction(payload) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.setSelectedIcon(payload));
    };
}

export function setCurrentConversationAction(payload) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.setCurrentConversation(payload));
    };
}

export function setSnackbarAction(payload) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.setSnackbar(payload));
        setTimeout(() => {
            dispatch(slice.actions.hideSnackbar())
        }, 3000);
    };
}

export function updateContactInfoAction(payload) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateContactInfo(payload));
    };
}
export function updateContactInfoCurrentPageNameAction (payload) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateContactInfoCurrentPageName(payload))
    };
};

export function toggleContactInfoAction () {
    return async (dispatch, getState) => {
        dispatch(slice.actions.toggleContactInfoAction())
    };
};

export function addFriendRequestAction (payload) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addFriendRequest(payload))
    };
};

export function friendRequestAcceptedAction (payload) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.friendRequestAccepted(payload));
    };
};

export function fetchMutualFriendsAction () {
    return async (dispatch, getState) => {
        await axios.get("/user/get-mutual-friends", {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
            }
        }).then((res) => {
            dispatch(slice.actions.fetchMutualFriends(res.data.data));
        }).catch((err) => {
            console.log(err);
        });
    };
};


export function fetchIndividualConversationsAction () {
    return async (dispatch, getState) => {
        await axios.get("/user/get-individual-conversations", {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
            }
        }).then((res) => {
            dispatch(slice.actions.fetchIndividualConversations(res.data.data));
        }).catch((err) => {
            console.log(err);
        });
    };
};



export function fetchGroupConversationsAction () {
    return async (dispatch, getState) => {
        await axios.get("/user/get-group-conversations", {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
            }
        }).then((res) => {
            dispatch(slice.actions.fetchGroupConversations(res.data.data));
        }).catch((err) => {
            console.log(err);
        });
    };
};






export function fetchFriendRequestsAction () {
    return async (dispatch, getState) => {
        await axios.get("/user/get-friend-requests", {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
            }
        }).then((res) => {
            dispatch(slice.actions.fetchFriendRequests(res.data.data));
        }).catch((err) => {
            console.log(err);
        });
    };
};


export function fetchFriendsAction () {
    return async (dispatch, getState) => {
        await axios.get("/user/get-friends", {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
            }
        }).then((res) => {
            dispatch(slice.actions.fetchFriends(res.data.data));
        }).catch((err) => {
            console.log(err);
        });
    };
};



export function fetchCurrentConversationMessagesAction (conversationId) {
    return async (dispatch, getState) => {
        await axios.get(`/user/get-current-conversation-messages/${conversationId}`, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
            },
        }).then((res) => {
            dispatch(slice.actions.fetchCurrentConversationMessages(res.data.data));
        }).catch((err) => {
            console.log(err);
        });
    }
}


