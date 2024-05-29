import {Box, Divider, Grid, IconButton, Stack, Tab, Tabs, Typography} from "@mui/material";

import {CaretLeft} from "phosphor-react";
import React, {useState} from "react";
import {useTheme} from "@mui/material/styles";
import {useDispatch} from "react-redux";
import SimpleBarReact from "simplebar-react";
import {faker} from "@faker-js/faker"
import {Shared_documents, Shared_links} from "../../data";
import {DocumentMessage, LinkMessage} from "../conversation/MessageTypes";
import {updateContactInfoCurrentPageNameAction} from "../../redux/slices/app";


const Images = () => {
    return (
        <Grid container spacing={2} >
            {
                [0, 1, 2, 3, 4, 5, 6].map((el) => {
                  return <Grid item xs={4} >
                            <img src={faker.image.avatar()} alt={faker.name.fullName()} />
                         </Grid>;
                })
            }
        </Grid>
    )
}





const SharedMessages = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                            Shared
                        </Typography>
                    </Stack>
                </Box>
            </Stack>
            <Tabs
                sx={{px: 2, pt: 1, width: "100%"}}
                value={value}
                onChange={handleChange}
                centered
            >
                <Tab label="Media" />
                <Tab label="Links" />
                <Tab label="Documents" />
            </Tabs>
            <Stack sx={{width: "100%",  flexGrow: 1, overflow: "hidden", height: "100%" }} p={3} spacing={value === 1 ? 1 : 3} >
                <SimpleBarReact style={{ maxHeight: "100%" }} >
                    {(() => {
                        switch (value) {
                            case 0:
                                return <Images />;
                            case 1:
                                return Shared_links.map((el) => <><LinkMessage el={el} /><Divider /></>)
                            case 2:
                                return Shared_documents.map((el) => <><DocumentMessage el={el} /><Divider /></>)
                            default:
                                break;
                        }
                    }) ()}
                </SimpleBarReact>
            </Stack>
        </Stack>
    )
}

export default SharedMessages;


