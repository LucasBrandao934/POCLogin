/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const StyledContainer = styled(Container)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh"
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    width: "100%",
    maxWidth: 400,
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: '#120a8f'
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    color: "#f5f2d0"
}));

const buttonStyles = {
    backgroundColor: '#f5f2d0',
};

const textStylesNavy = {
    color: '#120a8f',
};

const textStylesOffWhite = {
    color: '#f5f2d0',
};

const Login = () => {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    const handleLogout = () => {
        setIsUserLoggedIn(false);
    }


    return (
        <StyledContainer>
            <StyledPaper elevation={3}>
                <StyledTypography variant="h4" component="h1" gutterBottom>
                    POC Login
                </StyledTypography>
                <GoogleOAuthProvider clientId="51153627717-up3hkq5sdrqn5k6l4pvc3doavdf1crse.apps.googleusercontent.com">
                    {
                        isUserLoggedIn ? "" :
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    setIsUserLoggedIn(true);
                                    var decoded = jwt_decode(credentialResponse.credential);
                                    console.log(decoded)
                                    setUserData(decoded);
                                }}
                                onError={() => {
                                    setIsUserLoggedIn(false)
                                    console.log("Login Failed");
                                }}
                            />
                    }
                </GoogleOAuthProvider>
                {
                    isUserLoggedIn ?
                        <div className="userContainer">
                            <div className="userImage">
                                <img src={userData.picture} />
                            </div>
                            <div style={textStylesOffWhite}>
                                {userData.email}
                            </div>
                            <p>
                                <Button
                                    variant="contained"
                                    style={buttonStyles}
                                    onClick={handleLogout}
                                >
                                    <span style={textStylesNavy}>Logout</span>
                                </Button>
                            </p>
                        </div> : ""
                }
            </StyledPaper>
        </StyledContainer >
    );
};

export default Login;