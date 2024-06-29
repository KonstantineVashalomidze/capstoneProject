import React from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Slide,
    Button,
    Box,
    Typography,
    Avatar,
} from "@mui/material";
import {Phone, PhoneDisconnect} from "phosphor-react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const IncomingCall = ({ open, handleClose, incomingCallData }) => {
    const loggedInUser = useSelector(state => state.app.loggedInUser)
    const navigate = useNavigate();
    const handleAccept = () => {
        // Handle call acceptance logic here
        navigate("/videosdk", {
            state: {
                callDirection: "incoming",
                callType: "voice",
                userId: loggedInUser._id,
                meetingId: incomingCallData.meetingId.toString()
            }
        })
        handleClose();
    };

    const handleDecline = () => {
        // Handle call decline logic here
        console.log("Call declined");
        handleClose();
    };

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            onClose={handleClose}
            keepMounted
            TransitionComponent={Transition}
            sx={{ p: 4 }}
        >
            <DialogTitle sx={{ textAlign: "center" }}>Incoming Call</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar
                        src={incomingCallData?.caller?.avatar}
                        alt={incomingCallData?.caller?.firstName + " " + incomingCallData?.caller?.lastName}
                        sx={{ width: 80, height: 80, mb: 2 }}
                    />
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {incomingCallData?.caller?.firstName + " " + incomingCallData?.caller?.lastName}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<Phone />}
                            onClick={handleAccept}
                            sx={{ mr: 2 }}
                        >
                            Accept
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<PhoneDisconnect  />}
                            onClick={handleDecline}
                        >
                            Decline
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default IncomingCall;