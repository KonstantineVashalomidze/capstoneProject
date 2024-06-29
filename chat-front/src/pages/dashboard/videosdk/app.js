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
                name: loggedInUser.firstName + " " + loggedInUser.lastName,
                meetingId: location.state.meetingId,
                apiKey: "dc2f6264-edc6-475d-84fd-70819f320054",

                containerId: null,

                micEnabled: location.state.callType === "voice",
                webcamEnabled: location.state.callType === "video",
                participantCanToggleSelfWebcam: true,
                participantCanToggleSelfMic: true,

                chatEnabled: true,
                screenShareEnabled: true,

                /*

               Other Feature Properties

                */

                theme: theme.palette.mode === 'light' ? "LIGHT" : "DARK", // or "LIGHT"
                colors: {
                    primary: "#3E84F6",
                    secondary: "#099999",
                },
                layout: {
                    type: "GRID", // or "SPOTLIGHT" or "SIDEBAR"
                    priority: "SPEAKER", // or "PIN"
                },
                branding: {
                    enabled: true,
                    logoURL: "https://your-logo-url.com/logo.png",
                },


            };
            const meeting = new VideoSDKMeeting();
            meeting.init(config);
        } else { // is incoming call
            const config = {
                name: loggedInUser.firstName + " " + loggedInUser.lastName,
                meetingId: location.state.meetingId,
                apiKey: "dc2f6264-edc6-475d-84fd-70819f320054",

                containerId: null,

                micEnabled: location.state.callType === "voice",
                webcamEnabled: location.state.callType === "video",
                participantCanToggleSelfWebcam: true,
                participantCanToggleSelfMic: true,

                chatEnabled: true,
                screenShareEnabled: true,

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