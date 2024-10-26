import { Box, Button, IconButton, TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/router";
import { UserService } from "@/services/user-service";
import { UserData } from "@/models/user";
import { ToastFunctions } from "@/utils/toast-functions";

const LoginComponent = () => {
    const router = useRouter();

    const handleSignUpClick = () => {
        router.push('/user/new-sign-up');
    };

    const [loginData, setLoginData] = React.useState<UserData>(new UserData());
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    function inputValues(type: string, value: string) {
        if (type == "username")
            loginData.username = value;
        else if (type == "password")
            loginData.password = value;
        setLoginData(loginData);
    }

    const signInClick = async () => {
        let response = await UserService.userLogin(loginData);
        console.log(response);
        if (response && response.data) {
            if (!response.data.error) {
                localStorage.setItem("isSignedIn", "true");
                localStorage.setItem("currentUserId", response.data?.id);
                localStorage.setItem("currentUserData", JSON.stringify(response.data));
                router.push('/home');
            } else {
                ToastFunctions.onCloseFailure(response?.data?.message)
            }
        } else {
            ToastFunctions.onCloseFailure("error in login")
        }
    }

    return (
        <Box
            sx={{
                display: 'flex', pt: "20px",
                flexDirection: 'column', justifyContent: 'center',
                alignItems: 'center', textAlign: 'center',
            }}
        >
            <header style={{ marginBottom: '1rem', fontSize: '24px', fontWeight: 'bold' }}>
                Sign In
            </header>
            <Box sx={{
                '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'column',
                width: '100%', maxWidth: '400px', padding: '1rem',
            }}>
                <TextField variant="standard" id="input-with-icon-textfield" label="Username"
                    // fullWidth
                    onChange={(event) => inputValues("username", event.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineIcon />
                                </InputAdornment>
                            )
                        },
                    }}
                />
                <TextField
                    variant="standard" id="input-with-icon-textfield" label="Password"
                    onChange={(event) => inputValues("password", (event.target as HTMLInputElement)?.value)}
                    // fullWidth
                    type={showPassword ? 'text' : 'password'}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        },
                    }}
                />
                {/* Sign In Button */}
                <Button
                    variant="contained"
                    sx={{
                        marginTop: '1rem',
                        backgroundColor: '#27272a',
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: '#4b5563',
                        },
                    }}
                    onClick={signInClick}
                >
                    Sign In
                </Button>
                {/* Create Account Button */}
                <Button
                    variant="text"
                    sx={{
                        marginTop: '0.5rem',
                        // backgroundColor: '#27272a',
                        color: '#27272a',
                    }}
                    onClick={handleSignUpClick}
                >
                    Create Account
                </Button>
            </Box>
        </Box>
    );
}

export default LoginComponent;