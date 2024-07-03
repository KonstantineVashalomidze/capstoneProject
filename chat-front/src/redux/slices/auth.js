import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios"
import {resetAppState, resetState, setLoggedInUserAction, setSnackbarAction} from "./app";


const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false,
    email:"",
    error: false,
    isVerified: false,
}


const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        updateIsLoading(state, action) {
            state.error = action.payload.error;
            state.isLoading = action.payload.isLoading;
        },
        logIn(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
            state.isVerified = action.payload.isVerified;
        },
        updateSignupEmail(state, action) {
            state.email = action.payload.email;
        },
        logOut(state, action) {
            state.isLoggedIn = false;
            state.token = "";
            state.email = "";
            state.isVerified = false;
        }
    }
});

export default slice.reducer;


export function LoginUser(form) { // Email and Password
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateIsLoading({isLoading: true, error: false}));
        await axios.post("/auth/login", {
           ...form
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(function (res) {
            dispatch(slice.actions.logIn({
                isLoggedIn: true,
                isVerified: res.data.isVerified,
                token: res.data.token,
            }));
            dispatch(slice.actions.updateIsLoading({isLoading: false, error: false}));
            dispatch(setSnackbarAction({
                duration: 3000,
                isOpened: true,
                message: res.data.message,
                severity: res.data.status
            }))
            dispatch(setLoggedInUserAction({
                _id: res.data.userId,
                friends: [],
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                friendRequests: [],
                about: "",
                avatar: "",
                mutualFriends: [],
                status: "",
            }));

        }).catch(function (err) {
            dispatch(slice.actions.updateIsLoading({isLoading: false, error: true})); // ????
            // Handle different types of errors
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: err.response.data.message,
                    severity: err.response.data.status
                }))
            } else if (err.request) {
                // The request was made but no response was received
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: "No response received from the server",
                    severity: err.response.data.status
                }))
            } else {
                // Something happened in setting up the request that triggered an error
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: err.message,
                    severity: err.response.data.status
                }))
            }
        });
    };
};


export function LogoutUser() {
    return (dispatch, getState) => {
        dispatch(resetAppState());
        dispatch(slice.actions.logOut());
        dispatch(slice.actions.updateIsLoading({isLoading: false, error: false}));

    };
};


export function ForgotPassword(form) {
    return async (dispatch, getState) => {
        await axios.post("/auth/forgot-password", {
            ...form
        }, {
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => {
            dispatch(setSnackbarAction({
                duration: 3000,
                isOpened: true,
                message: res.data.message,
                severity: res.data.status
            }))
        }).catch((err) => {
            // Handle different types of errors
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: err.response.data.message,
                    severity: err.response.data.status
                }))
            } else if (err.request) {
                // The request was made but no response was received
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: "No response received from the server",
                    severity: err.response.data.status
                }))
            } else {
                // Something happened in setting up the request that triggered an error
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: err.message,
                    severity: err.response.data.status
                }))
            }
        });
    };
};


export function UpdatePassword(form) {
    return async (dispatch, getState) => {
        await axios.post("/auth/reset-password", {
            ...form
        }, {
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => {
            dispatch(setSnackbarAction({
                duration: 3000,
                isOpened: true,
                message: res.data.message,
                severity: res.data.status
            }))
        }).catch((err) => {
            // Handle different types of errors
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: err.response.data.message,
                    severity: err.response.data.status
                }))
            } else if (err.request) {
                // The request was made but no response was received
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: "No response received from the server",
                    severity: err.response.data.status
                }))
            } else {
                // Something happened in setting up the request that triggered an error
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: err.message,
                    severity: err.response.data.status
                }))
            }
        });
    };
};


export function Signup(form) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateIsLoading({isLoading: true, error: false}));
        await axios.post("/auth/signup", {
            ...form
        }, {
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => {
            dispatch(slice.actions.updateSignupEmail({email: form.email}));
            dispatch(slice.actions.updateIsLoading({isLoading: false, error: false}));
            dispatch(setSnackbarAction({
                duration: 3000,
                isOpened: true,
                message: res.data.message,
                severity: res.data.status
            }))
        }).catch((err) => {
            dispatch(slice.actions.updateIsLoading({isLoading: false, error: true}));
            // Handle different types of errors
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: err.response.data.message,
                    severity: err.response.data.status
                }))
            } else if (err.request) {
                // The request was made but no response was received
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: "No response received from the server",
                    severity: err.response.data.status
                }))
            } else {
                // Something happened in setting up the request that triggered an error
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: err.message,
                    severity: err.response.data.status
                }))
            }
        }).finally(() => {
            if (!getState().auth.error) {
                window.location.href = "/auth/email-verification";
            }
        });
    };
};


export function VerifyEmail(form) {
    return async (dispatch, getState) => {
        await axios.post("/auth/verify-otp", {
            ...form
        },{
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => {
            dispatch(setSnackbarAction({
                duration: 3000,
                isOpened: true,
                message: res.data.message,
                severity: res.data.status
            }))
            dispatch(setLoggedInUserAction({
                _id: res.data.userId,
                friends: [],
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                friendRequests: [],
                about: "",
                avatar: "",
                mutualFriends: [],
                status: "",
            }));
        }).catch((err) => {
            console.log(err);
            // Handle different types of errors
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: err.response.data.message,
                    severity: err.response.data.status
                }))
            } else if (err.request) {
                // The request was made but no response was received
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: "No response received from the server",
                    severity: err.response.data.status
                }))
            } else {
                // Something happened in setting up the request that triggered an error
                dispatch(setSnackbarAction({
                    duration: 3000,
                    isOpened: true,
                    message: err.message,
                    severity: err.response.data.status
                }))
            }
        });
    };
};



