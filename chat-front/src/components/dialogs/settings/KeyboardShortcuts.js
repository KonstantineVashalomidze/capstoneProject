import React from "react";
import { Dialog, DialogTitle, Slide, DialogActions, Button } from "@mui/material";
import {
    Archive,
    Trash,
    MagnifyingGlass,
    Person,
    Info,
    Plus,
    Gear,
    Sticker,
    Envelope,
    SpeakerSimpleX,
    PushPinSimple,
    Users,
    UsersThree,
    Minus,
    Smiley
} from 'phosphor-react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Settings = ({ open, handleClose }) => {
    const listItems = [
        { text: "Search", icon: <MagnifyingGlass />, shortcut: "Ctrl + Shift + F" },
        { text: "Mark as Unread", icon: <Envelope />, shortcut: "Ctrl + Shift + U" },
        { text: "Mute", icon: <SpeakerSimpleX />, shortcut: "Ctrl + Shift + M" },
        { text: "Archive Chat", icon: <Archive />, shortcut: "Ctrl + Shift + E" },
        { text: "Delete Chat", icon: <Trash />, shortcut: "Ctrl + Shift + D" },
        { text: "Pin Chat", icon: <PushPinSimple />, shortcut: "Ctrl + Shift + P" },
        { text: "New Chat", icon: <Users />, shortcut: "Ctrl + N" },
        { text: "Next Chat", icon: <Person />, shortcut: "Ctrl + Shift + →" },
        { text: "Previous Chat", icon: <Person />, shortcut: "Ctrl + Shift + ←" },
        { text: "New Group", icon: <UsersThree />, shortcut: "Ctrl + Shift + G" },
        { text: "Profile", icon: <Person />, shortcut: "Ctrl + Shift + P" },
        { text: "About", icon: <Info />, shortcut: "Ctrl + Shift + A" },
        { text: "Increase Speed of Voice Message", icon: <Plus />, shortcut: "Ctrl + +" },
        { text: "Decrease Speed of Voice Message", icon: <Minus />, shortcut: "Ctrl + -" },
        { text: "Settings", icon: <Gear />, shortcut: "Ctrl + Shift + S" },
        { text: "Emoji Panel", icon: <Smiley />, shortcut: "Ctrl + E" },
        { text: "Sticker Panel", icon: <Sticker />, shortcut: "Ctrl + Shift + T" },
    ];

    return (
        <Dialog fullWidth maxWidth={"sm"} open={open} onClose={handleClose} keepMounted TransitionComponent={Transition}>
            <DialogTitle>Key Shortcuts</DialogTitle>
            <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '400px', overflowY: 'auto' }}>
                {listItems.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
                        <div style={{ marginRight: '16px' }}>{item.icon}</div>
                        <div>
                            <div>{item.text}</div>
                            <div style={{ fontSize: '0.8rem', color: 'rgba(0, 0, 0, 0.6)' }}>{item.shortcut}</div>
                        </div>
                    </div>
                ))}
            </div>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Settings;