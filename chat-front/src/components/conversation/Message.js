import React, {useState} from 'react';
import {Avatar, Box, IconButton, Menu, MenuItem, Stack} from "@mui/material";
import {Chat_History, Message_options} from "../../data";
import {DocumentMessage, LinkMessage, MediaMessage, ReplyMessage, TextMessage, TimeLine} from "./MessageTypes";
import {useTheme} from "@mui/material/styles";
import {DotsThreeOutline} from "phosphor-react";
import {useSelector} from "react-redux";
import {faker} from "@faker-js/faker";



const MessageOptions = ({ show }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme();

    return (
        <>
            {show && (
                <IconButton
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    <DotsThreeOutline color={theme.palette.primary.main} />
                </IconButton>
            )}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                transformOrigin={{vertical: "bottom", horizontal: "left"}}
            >
                <Stack spacing={1} px={1}>
                    {Message_options.map((el) => (
                        <MenuItem key={el.title} onClick={handleClose}>
                            {el.title}
                        </MenuItem>
                    ))}
                </Stack>
            </Menu>
        </>
    );
};



const MessageWrapper = ({el, menu}) => {

    const [showOptions, setShowOptions] = useState(false);
    const theme = useTheme();

    let messageComponent;
    switch (el.type) {
        case "Media":
            messageComponent = <MediaMessage el={el} />;
            break;
        case "Document":
            messageComponent = <DocumentMessage el={el} />;
            break;
        case "Link":
            messageComponent = <LinkMessage el={el} />;
            break;
        case "Reply":
            messageComponent = <ReplyMessage el={el} />;
            break;
        case "Divider":
            messageComponent = <TimeLine el={el} />;
            break;
        default:
            messageComponent = <TextMessage el={el} />;
    }


    return (
        <Stack onMouseEnter={() => setShowOptions(true)}
               onMouseLeave={() => setShowOptions(false)}
               direction={"row"} justifyContent={el.incoming ? "start" : "end"} alignItems={"center"} spacing={1}>
            {(el.incoming && menu) && <Avatar src={faker.image.avatar()} alt={faker.name.fullName()}/>}
            {(!el.incoming && menu) && <MessageOptions show={showOptions} />}
            <Box p={1.5}
                 sx={{
                     backgroundColor: el.incoming ? theme.palette.background.default : theme.palette.primary.main,
                     borderRadius: 1.5,
                     width: "max-content",
                     boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"
                 }}
            >
                {messageComponent}
            </Box>
            {(el.incoming && menu) && <MessageOptions show={showOptions} />}
            {(!el.incoming && menu) && <Avatar src={faker.image.avatar()} alt={faker.name.fullName()}/>}
        </Stack>
    )
}


const Message = ({menu}) => {
    const currentConversation = useSelector(state => state.app.conversations.currentConversation);
    const userId = useSelector(state => state.app.loggedInUser._id);
    const formattedChatHistory = currentConversation.messages.flatMap((message) =>  {
        const formattedMessage = {
            incoming: message.sender._id.toString() !== userId.toString(),
            outgoing: message.sender._id.toString() === userId.toString(),
        };
        switch (message.type) {
            case "Text":
                formattedMessage.message = message.text;
                break;
            case "Media":
                formattedMessage.type = message.type;
                formattedMessage.message = message.text;
                formattedMessage.img = message.file;
                break;
            case "Document":
                formattedMessage.type = message.type;
                formattedMessage.message = message.text;
                break;
            case "Link":
                formattedMessage.type = message.type;
                formattedMessage.message = message.text;
                formattedMessage.preview = message.file.content;
                formattedMessage.title = message.file.title;
                formattedMessage.siteName = message.file.siteName;
                break;
            case "Divider":
                formattedMessage.type = message.type;
                formattedMessage.message = message.text;
                break;
            case "Reply":
                formattedMessage.type = message.type;
                formattedMessage.message = message.text;
                formattedMessage.reply = message.repliedTo;
                break;
            default:
                break;
        }

        return formattedMessage;
    });





    return (
        <Box p={3} >
            <Stack spacing={3} >
                {formattedChatHistory.map((el) => {
                    return <MessageWrapper el={el} menu={menu}/>;
                })}
            </Stack>
        </Box>
    )
}

export default Message;


