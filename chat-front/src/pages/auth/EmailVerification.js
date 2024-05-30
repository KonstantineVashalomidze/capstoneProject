import React, { useState, useRef } from "react";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import Logo from "../../assets/Images/logo.ico";
import { Link as RouterLink } from "react-router-dom";
import {VerifyEmail} from "../../redux/slices/auth";
import {dispatch} from "../../redux/store";
import {useSelector} from "react-redux";

const EmailVerification = () => {
    const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const inputRefs = useRef([]);
    const {email} = useSelector((state) => state.auth);

    const handleInputChange = (index, value) => {
        if (value.length > 1 || !/^\d*$/.test(value)) return; // Prevent entering more than one digit or non-digit characters

        const newVerificationCode = [...verificationCode];
        newVerificationCode[index] = value;
        setVerificationCode(newVerificationCode);

        if (value) {
            // Automatically focus on the next input field
            if (index < 5) {
                inputRefs.current[index + 1].focus();
            }
        } else {
            // If the input is deleted, focus on the previous input field
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleInputFocus = () => {
        // Clear the error message when an input field is focused
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsVerified(true);

        const enteredCode = verificationCode.join("");

        // Validate the entered code
        if (enteredCode.length !== 6 || !/^\d{6}$/.test(enteredCode)) {
            setError("Please enter a 6-digit integer code.");
            return;
        }

        try {
            dispatch(VerifyEmail({email: email, otp: enteredCode}));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box justifyContent={"center"} alignItems={"center"}>
            <Box boxShadow={5} borderRadius={8} p={4}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{ width: "100%" }}>
                    <Typography variant={"h5"}>Email Verification</Typography>
                    <img style={{ height: 64, width: 64 }} src={Logo} alt={"Logo"} />
                </Stack>
                {isVerified ? (
                    <Typography variant="body1" p={1}>
                        Your email has been successfully verified. You can now proceed to login.
                        <Link style={{ cursor: "pointer" }} component={RouterLink} to="/auth/login">
                            Login
                        </Link>
                    </Typography>
                ) : (
                    <>
                        <Typography variant="subtitle2" p={1}>
                            Please enter the 6-digit verification code sent to your email address.
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Box pb={4} display="flex" justifyContent="center" gap={1}>
                                {verificationCode.map((digit, index) => (
                                    <TextField
                                        key={index}
                                        name={`digit${index + 1}`}
                                        value={digit}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        onFocus={handleInputFocus}
                                        variant="outlined"
                                        maxLength={1}
                                        inputProps={{
                                            style: {
                                                textAlign: "center",
                                                fontSize: "1.5rem",
                                                padding: "0.5rem",
                                            },
                                            maxLength: 1,
                                        }}
                                        inputRef={(el) => (inputRefs.current[index] = el)}
                                    />
                                ))}
                            </Box>
                            {error && (
                                <Typography variant="subtitle2" color="error" pb={2}>
                                    {error}
                                </Typography>
                            )}
                            <Box pt={2}>
                                <Button fullWidth variant="contained" color="primary" type="submit">
                                    Verify Email
                                </Button>
                            </Box>
                        </form>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default EmailVerification;