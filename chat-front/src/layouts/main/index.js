import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Container} from "@mui/material";
import {useSelector} from "react-redux";


const MainLayout = () => {

    const {isLoggedIn} = useSelector((state) => state.auth);


    if (isLoggedIn) {
        return <Navigate to={"/app"} />;
    }

    return (
        <Container sx={{ height: "100vh", alignContent: "center" }} maxWidth={"sm"} >
            <Outlet />
        </Container>
    );
};

export default MainLayout;
