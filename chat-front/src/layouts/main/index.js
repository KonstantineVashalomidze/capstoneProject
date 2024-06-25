import React, {useEffect} from "react";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {Container} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {dispatch} from "../../redux/store";
import login from "../../pages/auth/Login";
import {SignOut} from "phosphor-react";
import {LogoutUser} from "../../redux/slices/auth";


const MainLayout = () => {
    const { isLoggedIn, isVerified, isLoading } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn && isVerified && !isLoading) {
            navigate("/app");
        } else if (isLoggedIn && !isVerified) {
            navigate("/auth/signup");
        }
    }, [isLoading, isLoggedIn, isVerified]);

    return (
        <Container sx={{ height: "100vh", alignContent: "center" }} maxWidth={"sm"}>
            <Outlet />
        </Container>
    );
};

export default MainLayout;
