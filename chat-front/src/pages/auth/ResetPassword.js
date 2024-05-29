import React, { useState } from "react";
import { EnvelopeSimple } from "phosphor-react";
import { Box, Button, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import Logo from "../../assets/Images/logo.ico";
import { Link as RouterLink } from "react-router-dom";
import {ForgotPassword} from "../../redux/slices/auth";
import {dispatch} from "../../redux/store";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError("");

        // Check if email is empty
        if (!email.trim()) {
            setEmailError("Email is required");
            return;
        }

        // Email sending logic
        try {
            dispatch(ForgotPassword({email: email}));
            // Simulating email sending process
            setEmailSent(true);
        } catch (err) {
            console.log(err);
        }
        // Reset the form after a successful submission
        setEmail("");
    };

    return (
        <Box justifyContent={"center"} alignItems={"center"}>
            <Box boxShadow={5} borderRadius={8} p={4}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{ width: "100%" }}>
                    <Typography variant={"h5"}>Forget Password</Typography>
                    <img style={{ height: 64, width: 64 }} src={Logo} alt={"Logo"} />
                </Stack>
                {emailSent ? (
                    <Typography variant="body1" p={1}>
                        Instructions to reset your password have been sent to your email address.
                    </Typography>
                ) : (
                    <>
                        <Typography variant="subtitle2" p={1}>
                            We'll email you instructions to reset your password.
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Box pb={4}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={!!emailError}
                                    helperText={emailError}
                                    onFocus={() => setEmailError("")}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EnvelopeSimple size={20} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box pt={2}>
                                <Button fullWidth variant="contained" color="primary" type="submit">
                                    Request Instructions
                                </Button>
                                <Typography variant="subtitle2" align="center" pt={2}>
                                    Remember your password?{" "}
                                    <Link style={{ cursor: "pointer" }} component={RouterLink} to="/auth/login">
                                        Login
                                    </Link>
                                </Typography>
                            </Box>
                        </form>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default ResetPassword;