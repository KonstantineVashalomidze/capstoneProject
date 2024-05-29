import {Avatar, Badge, Divider, IconButton, Stack, Typography} from "@mui/material";
import {styled, useTheme} from "@mui/material/styles";
import {CaretDown, MagnifyingGlass, Phone, VideoCamera} from "phosphor-react";
import {useDispatch, useSelector} from "react-redux";
import {toggleContactInfoAction} from "../../redux/slices/app";




const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));




const Header = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const currentConversation = useSelector((state) => state.app.conversations.currentConversation);
    const userId = useSelector(state => state.app.loggedInUser._id);
    const participants = currentConversation?.participants.map(e => e._id !== userId);
    const isGroup = useSelector(state => state.app.sidebar.selectedIcon === "group");
    const avatarOnline = (participants?.map(el => el.status === "Online" && el._id !== userId).length > 0);


    return (
        <Stack alignItems={"center"} direction={"row"} justifyContent={"space-between"} sx={{width: "100%", height: "100%"}}>
            <Stack direction={"row"} spacing={2} >
                {avatarOnline ? (<StyledBadge overlap={"circular"} anchorOrigin={{vertical: "bottom", horizontal: "right"}} variant={"dot"}>
                    <Avatar onClick={() => {if (!isGroup) dispatch(toggleContactInfoAction()); } } alt={currentConversation?.name} src={currentConversation?.avatar} sx={{boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", cursor: "pointer"}} />
                </StyledBadge>) :
                   (<Avatar onClick={() => {if (!isGroup) dispatch(toggleContactInfoAction()); } } alt={currentConversation?.name} src={currentConversation?.avatar} sx={{boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", cursor: "pointer"}} />)
                }
                <Stack spacing={0.2} >
                    <Typography variant={"subtitle2"}>
                        {currentConversation?.name}
                    </Typography>
                    <Typography variant={"caption"}>
                        {currentConversation?.status}
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
                <IconButton >
                    <VideoCamera color={theme.palette.primary.main} />
                </IconButton>
                <IconButton >
                    <Phone color={theme.palette.primary.main} />
                </IconButton>
                <IconButton >
                    <MagnifyingGlass color={theme.palette.primary.main} />
                </IconButton>
                <Divider orientation={"vertical"} color={theme.palette.primary.main} flexItem />
                <IconButton >
                    <CaretDown color={theme.palette.primary.main} />
                </IconButton>
            </Stack>
        </Stack>
    )
}



export default Header