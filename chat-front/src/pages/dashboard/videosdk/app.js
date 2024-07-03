import React, {useEffect, useState} from "react";
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {socket} from "../../../sockets/socket";
import {useTheme} from "@mui/material/styles";

export default function App() {

    const loggedInUser = useSelector(state => state.app.loggedInUser);
    const location = useLocation();
    const theme = useTheme();



    useEffect(() => {
        // if it is outgoing call
        if (location.state.callDirection === "outgoing")
        {
            // start call to the target participants
            socket.emit("startCall", { userId: location.state.userId, meetingId: location.state.meetingId })

            const config = {
                name: location.state.name,
                meetingId: location.state.meetingId,
                apiKey: "dc2f6264-edc6-475d-84fd-70819f320054",
                containerId: null,
                recordingEnabled: true,
                micEnabled: location.state.callType === "voice",
                webcamEnabled: location.state.callType === "video",
                participantCanToggleSelfWebcam: true,
                participantCanToggleSelfMic: true,
                participantCanToggleRecording: true,
                chatEnabled: true,
                screenShareEnabled: true,
                redirectOnLeave: "http://localhost:3000/group#loaded",
                joinWithoutUserInteraction: true,
                theme: theme.palette.mode === 'light' ? "LIGHT" : "DARK",
                // embedBaseUrl: "http://localhost:3002",
                meetingLayoutTopic: "RECORDING_LAYOUT",
                /*

               Other Feature Properties

                */



            };
            const meeting = new VideoSDKMeeting();
            meeting.init(config);
        } else { // is incoming call
            const config = {
                name: location.state.name,
                meetingId: location.state.meetingId,
                apiKey: "dc2f6264-edc6-475d-84fd-70819f320054",
                containerId: null,
                micEnabled: location.state.callType === "voice",
                webcamEnabled: location.state.callType === "video",
                participantCanToggleSelfWebcam: true,
                participantCanToggleSelfMic: true,
                recordingEnabled: true,
                chatEnabled: true,
                screenShareEnabled: true,
                participantCanToggleRecording: true,
                redirectOnLeave: "http://localhost:3000/group#loaded",
                joinWithoutUserInteraction: true,
                theme: theme.palette.mode === 'light' ? "LIGHT" : "DARK",
                meetingLayoutTopic: "RECORDING_LAYOUT",


                // embedBaseUrl: "http://localhost:3002",

                /*

               Other Feature Properties

                */


            };
            const meeting = new VideoSDKMeeting();
            meeting.init(config);




        }






    }, []);

    return <div></div>;
}