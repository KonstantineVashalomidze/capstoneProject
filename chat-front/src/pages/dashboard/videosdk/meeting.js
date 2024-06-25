import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    MeetingProvider,
    MeetingConsumer,
    useMeeting,
    useParticipant,
} from "@videosdk.live/react-sdk";
import { createMeeting } from "./API";
import ReactPlayer from "react-player";
import {useDispatch, useSelector} from "react-redux";
import {
    Avatar,
    Box,
    Button,
    Card,
    CircularProgress,
    Fab,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import {
    Camera,
    Microphone,
    MicrophoneSlash,
    PhoneCall,
    Record,
    Share,
    VideoCamera,
    VideoCameraSlash, X
} from "phosphor-react";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {dispatch} from "../../../redux/store";


function ParticipantView(props) {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
        useParticipant(props.participantId);

    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                micRef.current.srcObject = mediaStream;
                micRef.current
                    .play()
                    .catch((error) =>
                        console.error("videoElem.current.play() failed", error)
                    );
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);

    return (
        <Card sx={{  padding: 1, margin: 1, width: "80%" }}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="h6" >
                    {displayName}
                </Typography>
                <Box alignItems={"center"} justifyContent={"space-between"}>
                    <Camera size={24} color={webcamOn ? 'green' : 'red'} />
                    <Microphone size={24} color={micOn ? 'green' : 'red'}  />
                </Box>
            </Stack>
            <audio ref={micRef} autoPlay playsInline muted={isLocal} />
            {webcamOn && (
                <ReactPlayer
                    playsinline
                    pip={false}
                    light={false}
                    controls={false}
                    muted={true}
                    playing={true}
                    url={videoStream}
                    height={'100%'}
                    width={'100%'}
                    onError={(err) => {
                        console.log(err, "participant video error");
                    }}
                />
            )}
            {!webcamOn && (
                <></>
            )}
        </Card>
    );
}




function Controls() {
    const { end, toggleMic, toggleWebcam, toggleScreenShare, startRecording, stopRecording } = useMeeting();
    const [isRecording, setIsRecording] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

    const handleRecordingToggle = () => {
        if (isRecording) {
            stopRecording();
            setIsRecording(false);
        } else {
            startRecording();
            setIsRecording(true);
        }
    };

    return (
        <Stack direction={"row"} spacing={1} alignItems="center" >
            <Tooltip title={isMuted ? 'Unmute' : 'Mute'}>
                <Fab color="primary" onClick={() => {
                    toggleMic();
                    setIsMuted(prev => !prev);
                }}>
                    {isMuted ? <MicrophoneSlash size={32} /> : <Microphone size={32} />}
                </Fab>
            </Tooltip>
            <Tooltip title={isCameraOn ? 'Turn Camera On' : 'Turn Camera Off'}>
                <Fab color="primary" onClick={() => {
                    toggleWebcam();
                    setIsCameraOn(prev => !prev);
                }}>
                    {isCameraOn ? <VideoCameraSlash size={32} /> : <VideoCamera size={32} />}
                </Fab>
            </Tooltip>
            <Tooltip title={isSharing ? "Stop Sharing Screen" : "Start Sharing Screen"}>
                <Fab color="primary" onClick={() => {
                    toggleScreenShare();
                    setIsSharing(prev => !prev);
                }}>
                    {isSharing ? <X size={32} /> : <Share size={32} />}
                </Fab>
            </Tooltip>
            <Tooltip title={isRecording ? 'Stop Recording' : 'Start Recording'}>
                <Fab color="primary" onClick={handleRecordingToggle}>
                    <Record style={{ color: isRecording ? 'red' : 'inherit' }} size={32} />
                </Fab>
            </Tooltip>
            <Tooltip title="End Meeting" >
                <Fab color="error" onClick={() => end()}>
                    <PhoneCall size={32} />
                </Fab>
            </Tooltip>
        </Stack>
    );
}








function MeetingView(props) {
    const [joined, setJoined] = useState(null);
    const { join, participants } = useMeeting({
        onMeetingJoined: () => {
            setJoined("JOINED");
        },
        onMeetingLeft: () => {
            props.onMeetingEnd();
        },
    });

    const joinMeeting = () => {
        setJoined("JOINING");
        join();
    };
    const theme = useTheme();
    //
    // useEffect(() => {
    //     joinMeeting();
    // }, []);


    return (
        <Box
            sx={{
                alignItems: 'center',
                padding: 4,
            }}
        >
            {/*<Typography variant="h5" gutterBottom>*/}
            {/*    Meeting Id: {props.meetingId}*/}
            {/*</Typography>*/}
            {joined && joined === "JOINED" ? (
                <Stack direction={"column"} justifyContent={"space-between"} alignItems={"center"}>
                    {[...participants.keys()].map((participantId) => (
                        <ParticipantView
                            participantId={participantId}
                            key={participantId}
                        />
                    ))}
                    <Card sx={{p: 1, m: 1}}>
                        <Controls />
                    </Card>
                </Stack>
            ) : joined && joined === "JOINING" ? (
                <Stack alignItems={"center"} direciton={"column"} justifyContent={"center"} >
                    <CircularProgress size={32} sx={{ color: theme.palette.primary.main }} />
                    <Typography variant="body1" color="textSecondary">
                        Joining the meeting...
                    </Typography>
                </Stack>
            ) : (
                // null
                <Button
                    variant="contained"
                    color="primary"
                    onClick={joinMeeting}
                >
                    Join
                </Button>
            )}
        </Box>
    );
}

const Meeting = () => {
    const [meetingId, setMeetingId] = useState(null);
    const currentCall = useSelector(state => state.app.calls.currentCall);
    const conversations = useSelector(state => state.app.conversations);
    const callInConversation = [...conversations.currentConversations.individualConversations, ...conversations.currentConversations.groupConversations].find(el => el._id.toString() === currentCall.conversationId);
    const navigate = useNavigate();
    const theme = useTheme();
    const loggedInUser = useSelector(state => state.app.loggedInUser);

    const getMeetingAndToken = async () => {
        const meetingId =
            await createMeeting({ authToken: currentCall.authToken });
        setMeetingId(meetingId);
    };

    const onMeetingEnd = () => {
        setMeetingId(null);
        navigate("/app");
    };

    useEffect(() => {
        getMeetingAndToken();

        // if (currentCall.userId.toString() === loggedInUser._id.toString()) // if call is outgoing
        // {
        //     setMeetingId(providedMeetingId);
        // } else {
        //     getMeetingAndToken();
        // }
    }, []);



    const conversationBackgroundColor = theme.palette.mode === "light"
        ? "#F0F4FA"
        : theme.palette.background.paper;




    return (
        <Stack
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
                height: '100vh',
                width: 'calc(100vw - 100px)',
                backgroundColor: conversationBackgroundColor
            }}
        >
            {meetingId ? (
                <MeetingProvider
                    config={{
                        meetingId,
                        micEnabled: true,
                        webcamEnabled: true,
                        name: callInConversation.name,
                    }}
                    token={currentCall.authToken}
                >
                    <MeetingView meetingId={meetingId} onMeetingEnd={onMeetingEnd} />
                </MeetingProvider>
            ) : (
                <Stack
                    direction={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <CircularProgress size={32} sx={{ color: theme.palette.primary.main }} />
                    <Typography variant="h6" color="textSecondary">
                        Creating room...
                    </Typography>
                </Stack>
            )}
        </Stack>
    );
};
export default Meeting;