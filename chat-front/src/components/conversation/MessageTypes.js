import React from 'react';
import {useTheme} from "@mui/material/styles";
import {Download, Image} from "phosphor-react";
import {Divider, IconButton, Link, Stack, Typography} from "@mui/material";


const TimeLine = ({el}) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} >
            <Divider width={"46%"} />
            <Typography variant={"caption"} sx={{color: theme.palette.text}} >{el.text}</Typography>
            <Divider width={"46%"} />
        </Stack>
    )
}

const TextMessage = ({el}) => {
    const theme = useTheme();
    return (
        <Typography variant={"body2"} color={el.incoming ? theme.palette.text : "#fff"} >
            {el.message}
        </Typography>
    )
}




const MediaMessage = ({el}) => {
    const theme = useTheme();
    return (
        <Stack spacing={1}>
            <img src={el.img} alt={el.message} style={{ maxHeight: 210, borderRadius: "10px" }} />
            <Typography variant={"body2"} color={el.incoming ? theme.palette.text : "#fff"} >
                {el.message}
            </Typography>
        </Stack>
    )
}


const ReplyMessage = ({el}) => {
    const theme = useTheme();
    return (
        <Stack spacing={2} >
            <Stack p={2} direction={"column"} spacing={3} alignItems={"center"} sx={{backgroundColor: theme.palette.background.paper, borderRadius: 1}}>
                <Typography variant={"body2"} color={theme.palette.text}>
                    {el.message}
                </Typography>
            </Stack>
            <Typography variant={"body2"} color={el.incoming ? theme.palette.text : "#fff"}>
                {el.reply}
            </Typography>
        </Stack>
    )
}



const LinkMessage = ({el}) => {
    const theme = useTheme();
    return (
        <Stack spacing={2} >
            <Stack p={2} spacing={3} alignItems={"center"} >
                <img src={el.preview}  alt={el.message} style={{maxHeight: 210, borderRadius: "10px"}} />
                <Stack spacing={2} >
                    <Typography variant={"subtitle2"} color={el.incoming ? theme.palette.text : "#fff"}>
                        Creating Chat App
                    </Typography>
                    <Typography variant={"subtitle2"}  color={el.incoming ? theme.palette.text : "#000"} component={Link} to={"https://www.facebook.com/"} >
                        www.facebook.com
                    </Typography>
                </Stack>
                <Typography variant={"body2"} color={el.incoming ? theme.palette.text : "#fff"} sx={{width: "100%", textAlign: "left"}}>
                    {el.message}
                </Typography>
            </Stack>
        </Stack>
    )
}




const DocumentMessage = ({el}) => {
    const theme = useTheme();
    return (
        <Stack spacing={2}>
            <Stack p={2} direction={"row"} spacing={2} alignItems={"center"} sx={{ backgroundColor: theme.palette.background.paper }}>
                <Image size={32} />
                <Typography variant={"caption"}>
                    Abstract.png
                </Typography>
                <IconButton >
                    <Download />
                </IconButton>
            </Stack>
            <Typography variant={"body2"} sx={{color: el.incoming ? theme.palette.text : "#fff"}}>
                {el.message}
            </Typography>
        </Stack>
    )
}





export { TimeLine, TextMessage, MediaMessage, ReplyMessage, LinkMessage, DocumentMessage };