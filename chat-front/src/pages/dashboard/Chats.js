import React, {useEffect, useState} from "react";
import { Avatar, Badge, Box, Button, Divider, IconButton, InputBase, Stack, Typography } from "@mui/material";
import {ArchiveBox, MagnifyingGlass, UserPlus} from "phosphor-react";
import { alpha, styled, useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import FriendRequests from "../../components/dialogs/chats/FriendRequests";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCurrentConversationMessagesAction,
    fetchIndividualConversationsAction,
    setCurrentConversationAction,
} from "../../redux/slices/app";
import {socket} from "../../sockets/socket";


export const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));
export const ChatElement = ({ _id, messages, participants }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const isGroup = useSelector(state => state.app.sidebar.selectedIcon === "group");
    const currentConversation = useSelector((state) => state.app.conversations?.currentConversation);
    const conversations = useSelector(state => isGroup ? state.app.conversations.currentConversations.groupConversations : state.app.conversations.currentConversations.individualConversations);
    const userId = useSelector(state => state.app.loggedInUser._id);
    const name = isGroup ? participants?.reduce((accumulator, currentValue, currentIndex) => {
        if (currentIndex < 3) {
            if (currentIndex !== 2)
            {
                return accumulator + currentValue.firstName + ", ";
            } else {
                return accumulator + currentValue.firstName;
            }
        }
       return accumulator;
    }, "") : participants.find(p => p._id.toString() !== userId).firstName + " " + participants.find(p => p._id.toString() !== userId).lastName;

    const online = isGroup ? participants?.some(p => p.status === "Online") : (participants?.find(p => p._id.toString() !== userId).status === "Online");



    return (
        <Box
            onClick={() => {
                dispatch(setCurrentConversationAction((currentConversation?._id === _id ? null : conversations.find(c => c._id.toString() === _id.toString()))));
                dispatch(fetchCurrentConversationMessagesAction(currentConversation?._id));
            } }
            sx={{
                width: "100%",
                borderRadius: 1,
                backgroundColor: theme.palette.mode === "light" ? "#fff" : theme.palette.background.default,
                cursor: "pointer",
                ...((_id === currentConversation?._id) && {
                    backgroundColor: theme.palette.action.selected,
                    boxShadow: `0 0 0 2px ${theme.palette.primary.main} inset`,
                }),
            }}
            p={2}
        >

            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center" >
                    {online ? (
                        <StyledBadge overlap="circular" anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                     variant="dot">
                            <div style={{
                                border: "2px solid " + theme.palette.primary.main,
                                borderRadius: "50%",
                                padding: "2px"
                            }}>
                                <Avatar src={faker.image.avatar()} sx={{boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"}}/>
                            </div>
                        </StyledBadge>
                        ) : (
                        <Avatar src={faker.image.avatar()} sx={{boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"}} />
                    )}
                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">{name}</Typography>
                        <Typography variant="caption">{"Last message"}</Typography>
                    </Stack>
                </Stack>
                <Stack alignItems={"center"} pt={2}>
                    <Badge color="primary" badgeContent={2}></Badge>
                    <Typography sx={{ fontWeight: 600,pt: 2 }} variant="caption">{"3:36"}</Typography>
                </Stack>
            </Stack>
        </Box>
    );
};

export const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.background.default, 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
    width: "100%"
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1.5), // Increased padding for better spacing
        paddingLeft: `calc(1em + ${theme.spacing(4)})`, // Kept the left padding
        width: "100%",
        "&::placeholder": { // Styling for the placeholder text
            color: theme.palette.text.secondary, // Use the theme's secondary text color
            opacity: 1, // Ensure the placeholder is visible
        },
    },
    "&:hover": { // Styles for the hover state
        "& .MuiInputBase-input::placeholder": {
            color: theme.palette.text.primary, // Use the theme's primary text color on hover
        },
    },
}));

const Chats = () => {
    const theme = useTheme();
    const backgroundColor = theme.palette.mode === "light" ? "#fff" : theme.palette.background.default;
    const dispatch = useDispatch();
    const [showFriendRequestsDialog, setShowFriendRequestsDialog] = useState(false);
    const userId = useSelector(state => state.app.loggedInUser._id);
    const isGroup = useSelector(state => state.app.sidebar.selectedIcon === "group");
    const conversations = useSelector(state => isGroup ? state.app.conversations.currentConversations.groupConversations : state.app.conversations.currentConversations.individualConversations);
    const currentConversation = useSelector(state => state.app.conversations.currentConversation);


    useEffect(() => {
        socket.emit("getCurrentConversations", {userId}, (data) => {
            dispatch(fetchIndividualConversationsAction());
        });

        // socket.emit("getCurrentMessages", {_id: currentConversation._id}, (data) => {
        //     dispatch(setCurrentConversationAction(data));
        // });
    }, [userId]);


    const handleHideFriendsRequestsDialog = () => {
        setShowFriendRequestsDialog(false);
    };


    return (
        <>
            <Box
                sx={{ width: 320, height: "100vh", backgroundColor: theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background.paper, boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)' }}>
                <Stack p={1} spacing={2} sx={{ height: "100vh" }}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", backgroundColor: backgroundColor }}>
                        <Typography p={1.5} variant={"h5"}>
                            Conversations
                        </Typography>
                        <IconButton onClick={() => {
                            setShowFriendRequestsDialog(true);
                        }}>
                            <UserPlus color={theme.palette.primary.main} />
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
                            <ArchiveBox size={24} color={theme.palette.primary.main} />
                            <Button>Archive</Button>
                        </Stack>
                        <Divider />
                    </Stack>
                    <Stack spacing={2} direction={"column"} sx={{ flexGrow: 1, overflow: "hidden", height: "100%" }}>
                        <SimpleBarReact style={{ maxHeight: "100%" }}>
                            <Stack spacing={2.4}>
                                <Typography variant={"subtitle2"} sx={{ color: "#676767" }}>
                                    Pinned
                                </Typography>
                                {conversations.filter((el) => el.isPinned).map((el) => {
                                    return <ChatElement {...el} />;
                                })}
                            </Stack>
                            <Stack spacing={2.4}>
                                <Typography variant={"subtitle2"} sx={{ color: "#676767" }} paddingTop={2}>
                                    All Chats
                                </Typography>
                                {conversations.filter((el) => !el.pinned).map((el) => {
                                    return <ChatElement {...el} />;
                                })}
                            </Stack>
                        </SimpleBarReact>
                    </Stack>
                </Stack>
            </Box>
            {showFriendRequestsDialog && <FriendRequests open={showFriendRequestsDialog} onClose={handleHideFriendsRequestsDialog}/>}
        </>
    );
};

export default Chats;
