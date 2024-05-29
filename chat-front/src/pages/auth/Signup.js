import React, { useState } from "react";
import { EnvelopeSimple, LockSimple, User } from "phosphor-react";
import {
    Box,
    Button,
    InputAdornment,
    Link,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Logo from "../../assets/Images/logo.ico";
import { Link as RouterLink } from "react-router-dom";
import SocialAuth from "./SocialAuth";
import {Signup} from "../../redux/slices/auth";
import {dispatch} from "../../redux/store";

const PasswordField = ({ label, value, onChange, error, helperText, onFocus }) => {
    return (
        <TextField
            fullWidth
            label={label}
            type="password"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
            onFocus={onFocus}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <LockSimple size={20} />
                    </InputAdornment>
                ),
            }}
        />
    );
};

const Registration = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});  // Reset errors before validating the form
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            // Registration logic
            dispatch(Signup({ firstName: name, lastName: surname, email: email, password: password }));
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = "Name is required";
        }

        if (!surname.trim()) {
            errors.surname = "Surname is required";
        }

        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Invalid email address";
        }

        if (!password.trim()) {
            errors.password = "Password is required";
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        }

        if (confirmPassword.trim() !== password.trim()) {
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    };

    return (
        <Box justifyContent={"center"} alignItems={"center"}>
            <Box boxShadow={5} borderRadius={8} p={3}>
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    sx={{ width: "100%" }}
                >
                    <Typography variant={"h5"}>Registration</Typography>
                    <img style={{ height: 64, width: 64 }} src={Logo} alt={"Logo"} />
                </Stack>
                <Typography variant="subtitle2" p={1}>
                    Already have an account?{" "}
                    <Link style={{ cursor: "pointer" }} component={RouterLink} to="/auth/login">
                        Login
                    </Link>
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box pb={1} display="flex" gap={1}>
                        <TextField
                            fullWidth
                            label="Name"
                            type="text"
                            variant="outlined"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
                            }}
                            error={!!errors.name}
                            helperText={errors.name}
                            onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, name: "" }))}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <User size={20} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Surname"
                            type="text"
                            variant="outlined"
                            value={surname}
                            onChange={(e) => {
                                setSurname(e.target.value);
                                setErrors((prevErrors) => ({ ...prevErrors, surname: "" }));
                            }}
                            error={!!errors.surname}
                            helperText={errors.surname}
                            onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, surname: "" }))}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <User size={20} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box pb={1}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
                            }}
                            error={!!errors.email}
                            helperText={errors.email}
                            onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, email: "" }))}
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
                        <PasswordField
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                            onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, password: "" }))}
                        />
                    </Box>
                    <Box pb={2}>
                        <PasswordField
                            label="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }))}
                        />
                    </Box>
                    <Box pt={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Register
                        </Button>
                    </Box>
                </form>
                <Box pt={2} pb={2}>
                    <Typography variant="body2" align="center">
                        By signing up, you agree to our{" "}
                        <Link
                            component={RouterLink}
                            to="/terms-of-service"
                            style={{ textDecoration: "underline" }}
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            component={RouterLink}
                            to="/privacy-policy"
                            style={{ textDecoration: "underline" }}
                        >
                            Privacy Policy
                        </Link>
                    </Typography>
                </Box>
            </Box>
            <SocialAuth isLogin={"Signup"} />
        </Box>
    );
};

export default Registration;