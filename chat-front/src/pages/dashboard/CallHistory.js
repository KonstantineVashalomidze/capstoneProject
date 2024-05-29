import React, {useState} from "react";
import {Avatar, Box, Button, Divider, IconButton, Stack, Typography} from "@mui/material";
import {MagnifyingGlass, Phone, PhoneIncoming, PhoneOutgoing} from "phosphor-react";
import {Search, SearchIconWrapper, StyledBadge, StyledInputBase} from "./Chats";
import SimpleBarReact from "simplebar-react";
import {useTheme} from "@mui/material/styles";
import {Call_history} from "../../data";
import MakeCall from "../../components/dialogs/callhistory/MakeCall";
import SelectCall from "../../assets/Illustration/SelectCall";





export const CallElement = ({ id, name, img, callTime, online, incoming, missed }) => {
    const theme = useTheme();
    const now = new Date();
    const callDate = new Date(callTime);
    const timeDiff = now.getTime() - callDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let timeAgo;

    if (daysDiff === 0) {
        const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
        if (hoursDiff === 0) {
            timeAgo = "Just now";
        } else {
            timeAgo = `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
        }
    } else if (daysDiff === 1) {
        timeAgo = "Yesterday";
    } else if (daysDiff < 7) {
        timeAgo = `${daysDiff} days ago`;
    } else {
        timeAgo = `${Math.floor(daysDiff / 7)} week${Math.floor(daysDiff / 7) > 1 ? "s" : ""} ago`;
    }

    const callHour = callDate.getHours();
    const callMinute = callDate.getMinutes();
    const callTimeString = `${callHour}:${callMinute < 10 ? "0" + callMinute : callMinute}`;

    return (
        <Box
            sx={{
                width: "100%",
                borderRadius: 1,
                backgroundColor: theme.palette.mode === "light" ? "#fff" : theme.palette.background.default,
            }}
            p={2}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                    {online ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot"
                        >
                            <div
                                style={{
                                    border: "2px solid " + theme.palette.primary.main,
                                    borderRadius: "50%",
                                    padding: "2px",
                                }}
                            >
                                <Avatar
                                    src={img}
                                    sx={{ boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)" }}
                                />
                            </div>
                        </StyledBadge>
                    ) : (
                        <Avatar
                            src={img}
                            sx={{ boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)" }}
                        />
                    )}
                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">{name}</Typography>
                        <Typography variant="caption">{timeAgo}</Typography>
                    </Stack>
                </Stack>
                <Stack spacing={1} alignItems={"center"}>
                    <Typography sx={{ fontWeight: 600 }} variant="caption">
                        {callTimeString}
                    </Typography>
                    {incoming ? <PhoneIncoming color={missed ? "red" : "green"} /> : <PhoneOutgoing color={missed ? "red" : "green"} />}
                </Stack>
            </Stack>
        </Box>
    );
};








const CallHistory = () => {
    const theme = useTheme();

    const backgroundColor = theme.palette.mode === "light"
        ? "#fff"
        : theme.palette.background.default;

    const [showMakeCallDialog, setShowMakeCallDialog] = useState(false);

    const handleCloseMakeCallDialog = () => {
        setShowMakeCallDialog(false);
    }

    return (
        <>
            <Box sx={{ height: "100vh", width: "calc(100vw - 420px)" }}>
                <SelectCall />
            </Box>
            <Box
                sx={{ position: "relative", width: 320, backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper, boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)' }}>
                <Stack p={1} spacing={2} sx={{ height: "100vh" }}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", backgroundColor: backgroundColor }}>
                        <Typography p={1.5} variant={"h5"}>
                            Recent Calls
                        </Typography>
                        <IconButton >
                            <Phone color={theme.palette.primary.main} />
                        </IconButton>
                    </Stack>
                    <Stack sx={{ width: "100%" }}>
                        <Search >
                            <SearchIconWrapper >
                                <MagnifyingGlass color={theme.palette.primary.main} />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder={"Search..."} />
                        </Search>
                    </Stack>
                    <Stack spcing={1}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} spacing={1.5}>
                            <PhoneOutgoing size={24} color={theme.palette.primary.main} />
                            <Button onClick={() => {
                                setShowMakeCallDialog(true);
                            }} >Make Call</Button>
                        </Stack>
                        <Divider />
                    </Stack>
                    <Stack spacing={2} direction={"column"} sx={{ flexGrow: 1, overflow: "hidden", height: "100%" }}>
                        <SimpleBarReact style={{ maxHeight: "100%" }}>
                            <Stack spacing={2.4}>
                                <Typography variant={"subtitle2"} sx={{ color: "#676767" }}>
                                    Recent Calls
                                </Typography>
                                {/* Replace the data here with your actual call data */}
                                {Call_history.map((call) => {
                                    return <CallElement {...call} />;
                                })}
                            </Stack>
                        </SimpleBarReact>
                    </Stack>
                </Stack>
                {showMakeCallDialog && <MakeCall open={showMakeCallDialog} onClose={handleCloseMakeCallDialog} />}
            </Box>
        </>
    );
};

export default CallHistory;