import {useTheme} from "@mui/material/styles";
import {useDispatch} from "react-redux";
import React from "react";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import {updateContactInfoCurrentPageNameAction} from "../../redux/slices/app";
import {CaretLeft} from "phosphor-react";
import SimpleBarReact from "simplebar-react";
import Message from "../conversation/Message";

const TopMessages = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const backgroundColor = theme.palette.mode === "light"
        ? "#fff"
        : theme.palette.background.default;

    return (
        <Stack alignItems={"center"} sx={{width: 320, height: "100vh", background: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper}}>
            <Stack p={1} sx={{width: "100%"}} >
                <Box sx={{boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", width: "100%", backgroundColor: backgroundColor }} >
                    <Stack sx={{height: "100%", p: 1}} direction={"row"} alignItems={"center"} justifyContent={"space-between"} spacing={3}>
                        <IconButton onClick={() => {dispatch(updateContactInfoCurrentPageNameAction("contactInfo"))} }>
                            <CaretLeft color={theme.palette.primary.main} />
                        </IconButton>
                        <Typography variant={"h5"} >
                            Top Messages
                        </Typography>
                    </Stack>
                </Box>
            </Stack>
            <Stack sx={{width: "100%",  flexGrow: 1, overflow: "hidden", height: "100%" }} >
                <SimpleBarReact style={{ maxHeight: "100%" }} >
                    <Message />
                </SimpleBarReact>
            </Stack>
        </Stack>
    )
}

export default TopMessages;