import React, {useEffect, useState} from "react";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography} from "@mui/material";


import Sidebar from "./Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {connectSocket, socket} from "../../sockets/socket";
import {
    addFriendRequestAction,
    fetchCurrentConversationMessagesAction, fetchGroupConversationsAction, fetchIndividualConversationsAction,
    friendAcceptedRequestAction,
    friendRequestAcceptedAction,
    friendRequestReceivedAction,
    SelectConversationElement, setAuthTokenAction, setCurrentCallAction,
    setCurrentConversationAction,
    setCurrentConversationsAction,
    setLoggedInUserAction,
    setSnackbarAction,
    showSnackbar,
    updateFriendRequestAction
} from "../../redux/slices/app";
import IncomingCall from "../../components/dialogs/chats/IncomingCall";



const DashboardLayout = () => {
    const dispatch = useDispatch();

    const {isLoggedIn, isVerified, isLoading} = useSelector((state) => state.auth);
    const conversations = useSelector(state => state.app.conversations.currentConversations);
    const userId = useSelector(state => state.app.loggedInUser._id);
    const currentConversationId = useSelector(state => state.app.conversations.currentConversation?._id);
    const navigate = useNavigate();
    const [showIncomingCall, setShowIncomingCall] = useState(false);
    const [incomingCallData, setIncomingCallData] = useState(null);
    const loggedInUser = useSelector(state => state.app.loggedInUser);

    useEffect(() => {

        if (isLoggedIn) {
            window.onload = function () {
                if (!window.location.hash) {
                    window.location = window.location + "#loaded";
                    window.location.reload();
                }
            };

            window.onload();

            // Check if the socket is not initialized
            if (!socket) {
                // Connect to the socket with the user's ID
                connectSocket(userId);
            }

            // Event listener for receiving a new friend request
            socket.on("friendRequestReceived", (data) => {
                // Dispatch an action to show a success snackbar with the received message
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: "New friend request received",
                    severity: "success"
                }));

                const receivedFriendRequestFiltered = {
                    sent: null,
                    received: {
                        from: data.friendRequest.sender,
                        at: data.friendRequest.receivedAt,
                    },
                    accepted: false,
                    rejected: false,
                }
                dispatch(addFriendRequestAction(receivedFriendRequestFiltered));
            });

            // Event listener for a friend request being accepted
            socket.on("friendRequestAccepted", (data) => {
                // Dispatch an action to show a success snackbar with the received message
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: data.message,
                    severity: data.status
                }));
                const acceptedFriendRequest = {
                    sent: {
                        to: data.friendRequest.recipient,
                        at: data.friendRequest.sentAt,
                    },
                    received: {
                        from: data.friendRequest.sender,
                        at: data.friendRequest.receivedAt,
                    },
                    accepted: true,
                    rejected: false,
                }

                dispatch(friendRequestAcceptedAction(acceptedFriendRequest));
            });

            // Event listener for a friend request being sent
            socket.on("friendRequestSent", (data) => {
                /// Dispatch an action to show a success snackbar with the received message
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: data.message,
                    severity: data.status
                }));
                const sentFriendRequestFiltered = {
                    sent: {
                        to: data.friendRequest.recipient,
                        at: data.friendRequest.sentAt,
                    },
                    received: null,
                    accepted: false,
                    rejected: false,
                }
                dispatch(addFriendRequestAction(sentFriendRequestFiltered));
            });

            // Listen for the "startChat" event from the server
            socket.on("newConversationStarted", (data) => {

                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: data.message,
                    severity: "success"
                }));
                dispatch(setCurrentConversationAction(
                    data.data
                ));
            });


            // Listen for the "startChat" event from the server
            socket.on("conversationBlocked", (data) => {
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: data.message,
                    severity: data.status
                }));

            });

            socket.on("messageReceivedNotification", (data) => {

                dispatch(fetchCurrentConversationMessagesAction(data.conversationId));

            });


            socket.on("incomingCallNotification", (data) => {

                // show dialog
                // data { meetingId, callerId }
                // navigateTovideosdk with pars

                // Set the caller information
                setIncomingCallData({
                    caller: (conversations.individualConversations.find(c => c._id.toString() === data.meetingId.toString()) || conversations.groupConversations.find(c => c._id.toString() === data.meetingId.toString())).participants.find(p => p._id.toString() === data.callerId.toString()),
                    meetingId: data.meetingId
                });

                // Show the incoming call dialog
                setShowIncomingCall(true);


            });
        }

        // Cleanup function to remove the event listeners when the component unmounts
        return () => {
            socket?.off("friendRequestReceived");
            socket?.off("friendRequestAccepted");
            socket?.off("friendRequestSent");
            socket?.off("newConversationStarted");
            socket?.off("conversationBlocked");
            socket?.off("messageReceivedNotification");
            socket?.off("incomingCallNotification");
        };

    }, [isLoggedIn, socket]);


    useEffect(() => {
        if (!isLoggedIn && !isLoading) {
            navigate("/auth/login");
        }
    }, [isLoading, isLoggedIn, isVerified]);

  return (
        <Stack direction={"row"}>
            <Sidebar />
            <Outlet />
            <IncomingCall
                open={showIncomingCall}
                handleClose={() => setShowIncomingCall(false)}
                incomingCallData={incomingCallData}
            />
        </Stack>
  );
};

export default DashboardLayout;








