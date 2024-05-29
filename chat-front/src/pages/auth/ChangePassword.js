import React, { useState } from "react";
import { LockSimple } from "phosphor-react";
import {Box, Button, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import Logo from "../../assets/Images/logo.ico";
import {useSearchParams} from "react-router-dom";
import {UpdatePassword} from "../../redux/slices/auth";
import {dispatch} from "../../redux/store";


const ChangePassword = () => {
    const [urlParameters] = useSearchParams();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            // Password change logic
            dispatch(UpdatePassword({password: newPassword, passwordConfirm: confirmPassword, token: urlParameters.get("token")}));

            // Simulate successful password change
            setNewPassword("");
            setConfirmPassword("");
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!newPassword.trim()) {
            errors.newPassword = "New password is required";
        } else if (newPassword.length < 8) {
            errors.newPassword = "New password must be at least 8 characters long";
        }

        if (confirmPassword.trim() !== newPassword.trim()) {
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    };

    return (
        <Box justifyContent={"center"} alignItems={"center"}>
            <Box boxShadow={5} borderRadius={8} p={4}>
                <Stack pb={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}
                       sx={{width: "100%"}}>
                    <Typography variant={"h5"}>Change Password</Typography>
                    <img style={{height: 64, width: 64}} src={Logo} alt={"Logo"}/>
                </Stack>
                <form onSubmit={handleSubmit}>
                    <Box pb={2}>
                        <TextField
                            fullWidth
                            label="New Password"
                            type="password"
                            variant="outlined"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword}
                            onFocus={() => setErrors((prevErrors) => ({...prevErrors, newPassword: ""}))}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockSimple size={20}/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box pb={4}>
                        <TextField
                            fullWidth
                            label="Confirm New Password"
                            type="password"
                            variant="outlined"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            onFocus={() => setErrors((prevErrors) => ({...prevErrors, confirmPassword: ""}))}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockSimple size={20}/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box pt={2}>
                        <Button fullWidth variant="contained" color="primary" type="submit">
                            Change Password
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default ChangePassword;