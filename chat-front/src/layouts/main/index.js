import React, {useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Container} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {dispatch} from "../../redux/store";
import login from "../../pages/auth/Login";
import {SignOut} from "phosphor-react";
import {LogoutUser} from "../../redux/slices/auth";


const MainLayout = () => {
    const { isLoggedIn, isVerified } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn && !isVerified) {
            dispatch(LogoutUser());
        }
    }, [isLoggedIn, isVerified, dispatch]);

    if (isLoggedIn && isVerified) {
        return <Navigate to={"/app"} />;
    } else if (isLoggedIn && !isVerified) {
        return <Navigate to={"/auth/signup"} />;
    }

    return (
        <Container sx={{ height: "100vh", alignContent: "center" }} maxWidth={"sm"}>
            <Outlet />
        </Container>
    );
};

export default MainLayout;
