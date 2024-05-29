import React, { useState } from "react";
import { EnvelopeSimple, LockSimple } from "phosphor-react";
import { Box, Button, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import Logo from "../../assets/Images/logo.ico";
import SocialAuth from "./SocialAuth";
import { Link as RouterLink } from "react-router-dom";
import {useDispatch} from "react-redux";
import {LoginUser} from "../../redux/slices/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");

        // Check if email is empty
        if (!email) {
            setEmailError("Email is required");
        }

        // Check if password is empty
        if (!password) {
            setPasswordError("Password is required");
        }

        // If both email and password are provided, proceed with login logic
        if (email && password) {
            dispatch(LoginUser({email: email, password: password}));
        }
    };

    return (
        <Box justifyContent={"center"} alignItems={"center"}>
            <Box boxShadow={5} borderRadius={8} p={4}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{ width: "100%" }}>
                    <Typography variant={"h5"}>Login</Typography>
                    <img style={{ height: 64, width: 64 }} src={Logo} alt={"Logo"} />
                </Stack>
                <Typography variant="subtitle2" p={1}>
                    Don't you have an account? <Link style={{ cursor: "pointer" }} component={RouterLink} to="/auth/signup">Sign Up</Link>
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
                    <Box pb={2}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!passwordError}
                            helperText={passwordError}
                            onFocus={() => setPasswordError("")}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockSimple size={20} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box pt={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Login
                        </Button>
                        <Typography
                            variant="subtitle2"
                            align="center"
                        >
                            Forgot password? <Link style={{ cursor: "pointer" }} component={RouterLink} to="/auth/reset-password">Reset</Link>
                        </Typography>
                    </Box>
                </form>
            </Box>
            <SocialAuth isLogin={"Login"} />
        </Box>
    );
};

export default Login;