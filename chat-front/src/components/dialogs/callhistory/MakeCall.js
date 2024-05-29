import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import {VideoCamera, Phone, MagnifyingGlass} from 'phosphor-react';
import {IconButton, Stack, Typography} from "@mui/material";
import {Search, SearchIconWrapper, StyledBadge, StyledInputBase} from "../../../pages/dashboard/Chats";
import {useTheme} from "@mui/material/styles";
import {faker} from "@faker-js/faker";
import {Call_history} from "../../../data";
import SimpleBarReact from "simplebar-react";


const MakeCall = ({ open, onClose }) => {



    const theme = useTheme();

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Make a Call</DialogTitle>
            <Stack sx={{ width: "100%", px: 5, py: 1 }}>
                <Search >
                    <SearchIconWrapper >
                        <MagnifyingGlass color={theme.palette.primary.main} />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder={"Search..."} />
                </Search>
            </Stack>
            <Stack spacing={2} direction={"column"} sx={{ flexGrow: 1, overflow: "hidden", height: "100%" }}>
                <SimpleBarReact style={{ maxHeight: 400 }}>
                    <DialogContent>
                        <List>
                            {Call_history.map((user) => (
                                <ListItem key={user.id}>
                                    <ListItemAvatar>
                                        <Stack direction="row" spacing={2} alignItems="center" >
                                            {Call_history.online ? (
                                                <StyledBadge overlap="circular" anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                                             variant="dot">
                                                    <div style={{
                                                        border: "2px solid " + theme.palette.primary.main,
                                                        borderRadius: "50%",
                                                        padding: "2px"
                                                    }}>
                                                        <Avatar src={faker.image.avatar()} sx={{boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"}}/>
                                                    </div>
                                                </StyledBadge>
                                            ) : (
                                                <Avatar src={faker.image.avatar()} sx={{boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"}} />
                                            )}
                                            <Stack spacing={0.3}>
                                                <Typography variant="subtitle2">{Call_history.name}</Typography>
                                            </Stack>
                                        </Stack>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.name} />
                                    <Stack direction={"row"} justifyContent={"space-between"} sx={{ width: "60px" }} >
                                        <IconButton >
                                            <VideoCamera size={24} color={theme.palette.primary.main} />
                                        </IconButton>
                                        <IconButton >
                                            <Phone size={24} color={theme.palette.primary.main} />
                                        </IconButton>
                                    </Stack>
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                </SimpleBarReact>
            </Stack>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MakeCall;