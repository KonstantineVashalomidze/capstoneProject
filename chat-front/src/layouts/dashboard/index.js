import React, {useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Stack} from "@mui/material";


import Sidebar from "./Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {connectSocket, socket} from "../../sockets/socket";
import {
    addFriendRequestAction, friendAcceptedRequestAction, friendRequestAcceptedAction,
    friendRequestReceivedAction,
    SelectConversationElement, setCurrentConversationAction, setCurrentConversationsAction,
    setLoggedInUserAction,
    setSnackbarAction,
    showSnackbar, updateFriendRequestAction
} from "../../redux/slices/app";



const DashboardLayout = () => {
    const dispatch = useDispatch();

    const {isLoggedIn} = useSelector((state) => state.auth);
    const conversations = useSelector(state => state.app.conversations.currentConversations);
    const userId = useSelector(state => state.app.loggedInUser._id);
    const currentConversationId = useSelector(state => state.app.conversations.currentConversation?._id);
    
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

            socket.on("textMessageReceivedNotification", (data) => {
                dispatch(setSnackbarAction({
                    duration: 3000, 
                    isOpened: true,
                    message: "erwam",
                    severity: data.status
                }));
            });



        }

        // Cleanup function to remove the event listeners when the component unmounts
        return () => {
            socket?.off("friendRequestReceived");
            socket?.off("friendRequestAccepted");
            socket?.off("friendRequestSent");
            socket?.off("newConversationStarted");
            socket?.off("conversationBlocked");
            socket?.off("textMessageReceivedNotification");
        };
    }, [isLoggedIn, socket]);





    if (!isLoggedIn) {
        return <Navigate to={"auth/login"} />;
    }

  return (
    <Stack direction={"row"}>
      <Sidebar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
