import React, {useState} from "react";
import {Box, IconButton, ListItem, ListItemIcon, ListItemText, Stack, Typography} from "@mui/material";
import {updateContactInfoCurrentPageNameAction} from "../../redux/slices/app";
import {Lock, Image, Bell, Info, Key, Keyboard, Note, CaretRight} from "phosphor-react";
import {useTheme} from "@mui/material/styles";
import {useDispatch} from "react-redux";
import KeyboardShortcuts from "../../components/dialogs/settings/KeyboardShortcuts";
import SelectSetting from "../../assets/Illustration/SelectSetting";



const Settings = () => {
    const theme = useTheme();

    const dispatch = useDispatch();

    const backgroundColor = theme.palette.mode === "light"
        ? "#fff"
        : theme.palette.background.default;

    const [selectedItem, setSelectedItem] = useState(null);

    const [showShortcuts, setShowShortcuts] = useState(false);

    const handleShowShortcuts = () => {
        setShowShortcuts(true);
    }

    const handleHideShortcuts = () => {
        setShowShortcuts(false);
    }

    const list = [
        {
            key: 0,
            icon: <Bell size={20} />,
            title: "Notifications",
            onclick: () => setSelectedItem(0),
        },
        {
            key: 1,
            icon: <Lock size={20} />,
            title: "Privacy",
            onclick: () => setSelectedItem(1),
        },
        {
            key: 2,
            icon: <Key size={20} />,
            title: "Security",
            onclick: () => setSelectedItem(2),
        },
        {
            key: 3,
            icon: <Image size={20} />,
            title: "Chat Wallpaper",
            onclick: () => setSelectedItem(3),
        },
        {
            key: 4,
            icon: <Note size={20} />,
            title: "Request Account Info",
            onclick: () => setSelectedItem(4),
        },
        {
            key: 5,
            icon: <Keyboard size={20} />,
            title: "Keyboard Shortcuts",
            onclick: () => { setSelectedItem(5); handleShowShortcuts() },
        },
        {
            key: 6,
            icon: <Info size={20} />,
            title: "Help",
            onclick: () => setSelectedItem(6),
        },
    ];

    return (
        <>
            <Box sx={{ height: "100vh", width: "calc(100vw - 420px)" }}>
                <SelectSetting />
            </Box>
            <Stack alignItems={"center"} sx={{boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", width: 320, height: "100vh", background: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper}}>
                <Stack p={1} sx={{width: "100%"}} >
                    <Box sx={{boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", width: "100%", backgroundColor: backgroundColor }} >
                        <Stack sx={{height: "100%", p: 1}} direction={"row"} alignItems={"center"} justifyContent={"space-between"} spacing={3}>
                            <Typography variant={"h5"} >
                                Settings
                            </Typography>
                            <IconButton onClick={() => {dispatch(updateContactInfoCurrentPageNameAction("contactInfo"))} }>
                                <CaretRight color={theme.palette.primary.main} />
                            </IconButton>
                        </Stack>
                    </Box>
                </Stack>
                <Stack p={2} sx={{width: "100%"}}>
                    {list.map(item => (
                        <ListItem key={item.key} button onClick={item.onclick} selected={selectedItem === item.key} sx={{ paddingY: 2 }} >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))}
                </Stack>
                <KeyboardShortcuts open={showShortcuts} handleClose={ () => {handleHideShortcuts()} } />
            </Stack>
        </>
    );
};

export default Settings;
