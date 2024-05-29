import { Box, Fab, IconButton, InputAdornment, Stack, TextField, Tooltip } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { File, Camera, Image, LinkSimpleHorizontal, PaperPlaneRight, Smiley, Sticker, User } from "phosphor-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useState, useEffect } from "react";
import {socket} from "../../sockets/socket";
import {useSelector} from "react-redux";

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px",
    },
}));

const ChatInput = ({ setShowPicker, inputValue, setInputValue, onTyping, onStoppedTyping, onSendMessage }) => {
    const theme = useTheme();
    const [showActions, setShowActions] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);

        // Clear the existing timeout if there is one
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Set a new timeout to detect when the user stops typing
        const newTimeout = setTimeout(() => {
            onStoppedTyping();
        }, 1000); // Adjust the delay as per your requirement

        setTypingTimeout(newTimeout);
        onTyping();
    };

    const handleSendMessage = () => {
        // Handle the send message event here
        onSendMessage(inputValue);
        setInputValue("");
    };

    useEffect(() => {
        return () => {
            // Clear the timeout when the component unmounts
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [typingTimeout]);

    return (
        <StyledInput
            variant="standard"
            fullWidth
            placeholder="Write message..."
            value={inputValue}
            onChange={handleInputChange}
            InputProps={{
                startAdornment: (
                    <Stack sx={{ width: "max-content" }}>
                        <Stack sx={{ position: "relative", display: showActions ? "inline-block" : "none" }}>
                            <Tooltip title="Image/Video" placement="right">
                                <Fab sx={{ position: "absolute", top: -102, backgroundColor: theme.palette.primary.main }}>
                                    <Image size={24} />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="Stickers" placement="right">
                                <Fab sx={{ position: "absolute", top: -172, backgroundColor: theme.palette.primary.main }}>
                                    <Sticker size={24} />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="Camera" placement="right">
                                <Fab sx={{ position: "absolute", top: -242, backgroundColor: theme.palette.primary.main }}>
                                    <Camera size={24} />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="Files" placement="right">
                                <Fab sx={{ position: "absolute", top: -312, backgroundColor: theme.palette.primary.main }}>
                                    <File size={24} />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="Contacts" placement="right">
                                <Fab sx={{ position: "absolute", top: -382, backgroundColor: theme.palette.primary.main }}>
                                    <User size={24} />
                                </Fab>
                            </Tooltip>
                        </Stack>
                        <InputAdornment>
                            <IconButton>
                                <LinkSimpleHorizontal onClick={() => { setShowActions((prev) => !prev); }} color={theme.palette.primary.main} />
                            </IconButton>
                        </InputAdornment>
                    </Stack>
                ),
                endAdornment: (
                    <InputAdornment>
                        <IconButton onClick={() => { setShowPicker((prev) => !prev); }}>
                            <Smiley color={theme.palette.primary.main} />
                        </IconButton>
                        <IconButton onClick={handleSendMessage}>
                            <PaperPlaneRight color={theme.palette.primary.main} />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

const Footer = () => {
    const theme = useTheme();
    const [showPicker, setShowPicker] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const currentConversation = useSelector((state) => state.app.conversations.currentConversation);
    const userId = useSelector(state => state.app.loggedInUser._id);

    const onTyping = () => {
        socket.emit("someoneIsTypingInConversation", { currentConversationId: currentConversation._id });
    };

    const onStoppedTyping = () => {
        socket.emit("someoneIsTypingAnyMoreInConversation", { currentConversationId: currentConversation._id});
    };

    const onSendMessage = (message) => {
        socket.emit("textMessage", {text: message, conversationId: currentConversation._id, sender: userId});
    };

    return (
        <Stack direction="row" alignItems="center">
            <Box sx={{ display: showPicker ? "inline" : "none", zIndex: 10, position: "fixed", bottom: 70, right: 340 }}>
                <Picker
                    previewPosition="none"
                    theme={theme.palette.mode}
                    data={data}
                    onEmojiSelect={(emojiData) => {
                        setInputValue((prevValue) => prevValue + emojiData.native);
                    }}
                />
            </Box>
            <ChatInput
                setShowPicker={setShowPicker}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onTyping={onTyping}
                onStoppedTyping={onStoppedTyping}
                onSendMessage={onSendMessage}
            />
        </Stack>
    );
};

export default Footer;