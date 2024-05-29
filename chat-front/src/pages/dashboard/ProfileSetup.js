import {
    Avatar,
    Box,
    Button,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import {UserCircleGear} from "phosphor-react";

const ProfileSetup = () => {
    const theme = useTheme();
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [nameError, setNameError] = useState(false);
    const [aboutError, setAboutError] = useState(false);
    const [avatarImage, setAvatarImage] = useState(null);

    const backgroundColor =
        theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.background.default;

    const handleSave = () => {
        let hasError = false;

        if (name.length < 4) {
            setNameError(true);
            hasError = true;
        } else {
            setNameError(false);
        }

        if (about.length < 20) {
            setAboutError(true);
            hasError = true;
        } else {
            setAboutError(false);
        }

        if (!hasError) {
            // Handle save logic here
            console.log("Name:", name);
            console.log("About:", about);
            console.log("Avatar Image:", avatarImage);
        }
    };

    const handleNameFocus = () => {
        setNameError(false);
    };

    const handleAboutFocus = () => {
        setAboutError(false);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarImage(file);
        }
    };

    const handleAvatarDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setAvatarImage(file);
        }
    };

    return (
        <>
            <Box
                sx={{
                    width: 320,
                    height: "100vh",
                    background: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
            >
                <Stack p={1} sx={{ height: "100%" }}>
                    <Box
                        sx={{
                            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                            width: "100%",
                            backgroundColor: backgroundColor,
                        }}
                    >
                        <Stack
                            sx={{ height: "100%", p: 1 }}
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            spacing={3}
                        >
                            <Typography variant={"h5"}>Set Profile</Typography>
                            <IconButton >
                                <UserCircleGear color={theme.palette.primary.main} />
                            </IconButton>
                        </Stack>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <Stack
                            alignItems={"center"}
                            paddingTop={2}
                            paddingBottom={1}
                            spacing={0.5}
                            sx={{
                                position: "relative",
                                flexGrow: 1,
                                overflow: "hidden",
                                height: "100%",
                            }}
                        >
                            <Stack alignItems={"center"} spacing={0.5}>
                                <div
                                    style={{
                                        border: "4px solid " + theme.palette.primary.main,
                                        borderRadius: "50%",
                                        padding: "2px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Avatar
                                        src={avatarImage ? URL.createObjectURL(avatarImage) : faker.image.avatar()}
                                        alt={name || "Avatar"}
                                        sx={{ height: 100, width: 100 }}
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        id="avatar-upload"
                                        onChange={handleAvatarChange}
                                    />
                                    <label
                                        htmlFor="avatar-upload"
                                        style={{
                                            cursor: "pointer",
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                        }}
                                        onDrop={handleAvatarDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                    >
                                        <Typography variant="body2" color="primary">
                                            {avatarImage ? "Change Avatar" : "Upload Avatar"}
                                        </Typography>
                                    </label>
                                </div>
                            </Stack>
                            <TextField
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                variant="outlined"
                                fullWidth
                                error={nameError}
                                helperText={nameError ? "Name must be at least 4 characters" : ""}
                                onFocus={handleNameFocus}
                            />
                            <TextField
                                label="About"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                error={aboutError}
                                helperText={aboutError ? "About must be at least 20 characters" : ""}
                                onFocus={handleAboutFocus}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                                sx={{ width: "100%" }}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </>
    );
};

export default ProfileSetup;