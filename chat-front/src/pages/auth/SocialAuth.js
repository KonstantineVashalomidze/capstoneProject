

import React from "react";
import {Divider, IconButton, Stack, Typography} from "@mui/material";
import {GithubLogo, GoogleLogo, TwitterLogo} from "phosphor-react";

const SocialAuth = ({isLogin}) => {
    return (
        <Stack p={3}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}  px={7}>
                <Divider width={"40%"} />
                <Typography variant={"caption"} >{isLogin} With</Typography>
                <Divider width={"40%"} />
            </Stack>
            <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} >
                <IconButton color="primary">
                    <GoogleLogo size={32} weight="fill" />
                </IconButton>
                <IconButton color="primary">
                    <GithubLogo size={32} weight="fill" />
                </IconButton>
                <IconButton color="primary">
                    <TwitterLogo size={32} weight="fill" />
                </IconButton>
            </Stack>
        </Stack>
    );
};


export default SocialAuth;


