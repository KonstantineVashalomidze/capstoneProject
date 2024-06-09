import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {Avatar, Box, Divider, IconButton, Menu, MenuItem, Stack} from "@mui/material";
import Logo from "../../assets/Images/logo.ico";
import {Nav_Buttons, Profile_Menu} from "../../data";
import {Chats, Gear, Phone, Users} from "phosphor-react";
import {faker} from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";
import AntSwitch from "../../components/AntSwitch";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LogoutUser} from "../../redux/slices/auth";
import {socket} from "../../sockets/socket";
import {setCurrentConversationAction, setSelectedIconAction} from "../../redux/slices/app";


const getPath = (index) => {
    switch (index) {
        case 0:
            return "/app";
        case 1:
            return "/group";
        case 2:
            return "/call-history";
        case 4:
            return "/settings";
        case 5:
            return "/profile-setup";
        case 6:
            return "/settings";
        case 7:
            return "/auth/login"
        default:
            break;
    }
}




const SideBar = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(0);
    const { onToggleMode } = useSettings();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const userId = useSelector(state => state.app.loggedInUser._id);
    const sidebarChanged = useSelector(state => state.app.sidebar.selectedIcon);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);


    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        dispatch(setCurrentConversationAction(null));
    }, [sidebarChanged]);


    return (
        <Box p={2} sx={{ zIndex: 1, backgroundColor: theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", height: "100vh", width: 100}}>
            <Stack direction={"column"} alignItems={"center"} justifyContent={"space-between"} sx={{height: "100%"}} spacing={3}>
                <Stack alignItems={"center"} spacing={2}>
                    <Box>
                        <img src={Logo} alt={"Chat Meeting Logo"}/>
                    </Box>
                    <Stack spacing={2} sx={{width: "max-content"}} direction={"column"} alignItems={"center"}>
                        {Nav_Buttons.map((el) =>
                            el.index === selected ?
                                (
                                    <Box
                                        sx={{
                                            position: "relative",
                                            color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary,
                                        }}
                                    >
                                        <IconButton
                                            sx={{
                                                width: "max-content",
                                            }}
                                        >
                                            {el.index === 0 && <Chats color={theme.palette.primary.main} />}
                                            {el.index === 1 && <Users color={theme.palette.primary.main} />}
                                            {el.index === 2 && <Phone color={theme.palette.primary.main} />}
                                        </IconButton>
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: -8,
                                                height: "100%",
                                                width: 2,
                                                backgroundColor: theme.palette.primary.main,
                                            }}
                                        />
                                    </Box>
                                )
                                :
                                (
                                    <IconButton onClick={() => {
                                        setSelected(el.index);
                                        navigate(getPath(el.index));
                                        dispatch(setSelectedIconAction(el.selectedIcon));
                                    }}
                                                key={el.index}
                                                sx={{ width: "max-content" }}>
                                        {el.icon}
                                    </IconButton>
                                )
                        )}
                        <Divider sx={{width: "48px"}} />
                        {selected === 4
                            ? (
                                <Box
                                    sx={{
                                        position: "relative",
                                        color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary,
                                    }}
                                >
                                    <IconButton
                                        sx={{width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary}}
                                    >
                                        <Gear color={theme.palette.primary.main} />
                                    </IconButton>
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: -8,
                                            height: "100%",
                                            width: 2,
                                            backgroundColor: theme.palette.primary.main,
                                        }}
                                    />
                                </Box>
                            ) :
                            (<IconButton
                                onClick={() => {
                                    setSelected(4);
                                    navigate(getPath(4));
                                    dispatch(setSelectedIconAction("settings"));
                                }}>
                                <Gear />
                            </IconButton>)}
                    </Stack>
                </Stack>
                <Stack spacing={4}>
                    <AntSwitch onChange={() => {
                        onToggleMode();
                    }} checkedColor={theme.palette.primary.main} defaultChcked/>
                        <div style={{
                            border: "2px solid " + theme.palette.primary.main,
                            borderRadius: "50%",
                            padding: "2px"
                        }}>
                            <Avatar id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined} onClick={handleClick}
                                    src={faker.image.avatar()} sx={{cursor: "pointer", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"}}/>
                        </div>
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
                                {Profile_Menu.map((el) => (
                                    <MenuItem key={el.title} onClick={() => { handleClose(); navigate(getPath(el.index)); if (el.index === 7) {
                                        dispatch(LogoutUser());
                                        socket.emit("end", {userId});
                                    } }}>
                                        <Stack sx={{width: 100}} direction={"row"} alignItems={"center"}
                                               justifyContent={"space-between"}>
                                        <span>
                                            {el.title}
                                        </span>
                                            {el.icon}
                                        </Stack>
                                    </MenuItem>
                                ))}
                            </Stack>
                        </Menu>
                </Stack>
            </Stack>
        </Box>
);
};
export default SideBar;
