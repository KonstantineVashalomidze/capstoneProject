import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SimpleBarReact from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {useDispatch, useSelector} from "react-redux";
import {ChatDots, MagnifyingGlass, Minus, Plus} from "phosphor-react";
import {IconButton, Stack} from "@mui/material";
import {socket} from "../../../sockets/socket";
import {fetchFriendRequestsAction, fetchFriendsAction, fetchMutualFriendsAction} from "../../../redux/slices/app";
import {Search, SearchIconWrapper, StyledInputBase} from "../../../pages/dashboard/Chats";
import {useTheme} from "@mui/material/styles";


const FriendRequests = ({ open, onClose }) => {
    const [currentTab, setCurrentTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState(''); // Add a state for the search query
    const userId = useSelector(state => state.app.loggedInUser._id);
    const dispatch = useDispatch();
    const explore = useSelector(state => state.app.loggedInUser.mutualFriends);
    const friends = useSelector(state => state.app.loggedInUser.friends);
    const friendRequests = useSelector(state => state.app.loggedInUser.friendRequests);
    const onlyReceivedFriendRequests = friendRequests.filter(el => el.received != null);
    const onlySentFriendRequests = friendRequests.filter(el => el.sent != null);
    const theme = useTheme();

    useEffect(() => {
        dispatch(fetchMutualFriendsAction());
        dispatch(fetchFriendRequestsAction());
        dispatch(fetchFriendsAction());
    }, []);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
        setSearchQuery(''); // Reset the search query when switching tabs
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filterListItems = (items) => {
        const filteredItems = items.filter((item) =>
            `${item.firstName} ${item.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredItems.length === 0) {
            if (currentTab === 0)
            {
                // dispatch event to find 5 users with substring searchQuery.toLowerCase();
            }
            else if (currentTab === 1)
            {
                // dispatch event to find 5 friends with substring searchQuery.toLowercase();
            }
            else
            {
                // dipatch event to find 5 friend requests with substring searchQuery.toLowerCase();
            }

        }

        return filteredItems;
    };

    const renderListItems = (items) => (
        <SimpleBarReact style={{ maxHeight: 300 }}>
            <List>
                {filterListItems(items).map((item) => (
                    <ListItem key={item._id}>
                        <ListItemAvatar>
                            <Avatar src={currentTab === 2 ? item.received.from.avatar : item.avatar} />
                        </ListItemAvatar>
                        {currentTab !== 2 && <ListItemText primary={`${item.firstName} ${item.lastName}`}/>}
                        {currentTab === 2 && <ListItemText primary={`${item.recipient === null ? item.sender.firstName : item.received.from.firstName} ${item.received.from === null ? item.sender.lastName : item.received.from.lastName}`}/>}
                        {currentTab === 0 && <IconButton onClick={() => { socket.emit("sendNewFriendRequest", {to: item._id, from: userId}) } } >{onlySentFriendRequests.some(obj => item._id?.toString() === obj.sent.to._id?.toString()) || onlyReceivedFriendRequests.some(obj => item._id?.toString() === obj.received.from._id?.toString()) ? null : <Plus />}</IconButton>}
                        {currentTab === 1 && <IconButton onClick={() => { socket.emit("startConversation", { initiator: userId, conversationParticipants: [userId, item._id] }); }} ><ChatDots /></IconButton>}
                        {currentTab === 2 && (
                            <>
                                <IconButton onClick={() => { socket.emit("acceptFriendRequest", { senderId: item.received.from._id, recipientId: userId }); }} >
                                    <Plus />
                                </IconButton>
                                <IconButton >
                                    <Minus />
                                </IconButton>
                            </>
                        )}
                    </ListItem>
                ))}
            </List>
        </SimpleBarReact>
    );

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth keepMounted>
            <DialogTitle>Friend Requests</DialogTitle>
            <Stack sx={{ width: "100%", px: 5, pt: 3}}>
                <Search >
                    <SearchIconWrapper >
                        <MagnifyingGlass color={theme.palette.primary.main} />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder={"Search..."} value={searchQuery} onChange={handleSearch} />
                </Search>
            </Stack>
            <DialogContent>
                <Tabs value={currentTab} onChange={handleTabChange}>
                    <Tab label="Explore" />
                    <Tab label="Friends" />
                    <Tab label="Requests" />
                </Tabs>
                {currentTab === 0 && renderListItems(explore)}
                {currentTab === 1 && renderListItems(friends)}
                {currentTab === 2 && renderListItems(onlyReceivedFriendRequests)}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FriendRequests;