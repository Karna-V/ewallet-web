import { UserData } from "@/models/user";
import { UserService } from "@/services/user-service";
import { ToastFunctions } from "@/utils/toast-functions";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const NewUserComponent = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = React.useState(false);
    const [data, setData] = React.useState<UserData>(new UserData());
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleInputValue = (type: string, value: any) => {
        setData((prevData: any) => {
            const updatedData = { ...prevData, [type]: value };
            checkFormCompletion(updatedData);  // Update button state
            return updatedData;
        });
    };

    console.log(data, "data");

    const checkFormCompletion = (data: UserData) => {
        console.log(data, "isCompletedata");
        const isComplete = data.name != null && data.username != null && data.password != null && data.emailId != null && data.phone?.number != null;
        console.log(isComplete, "isComplete");

        setIsButtonDisabled(!isComplete);
    };

    const onCreateClick = async () => {
        let response = await UserService.createUser(data);
        console.log(response);
        if (response?.data) {
            if (!response.data.error) {
                localStorage.setItem("isSignedIn", "true");
                localStorage.setItem("currentUserId", response.data?.id);
                localStorage.setItem("currentUserData", JSON.stringify(response.data));
                router.push('/home');
            } else {
                ToastFunctions.onCloseFailure(response?.data?.message)
            }
        } else {
            ToastFunctions.onCloseFailure("error in create")
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
                Create Account
            </header>
            <Box sx={{
                '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'column',
                width: '100%', maxWidth: '400px', padding: '1rem',
            }}>
                <TextField variant="standard" id="input-with-icon-textfield" label="Full name" value={data?.name}
                    onChange={(event) => handleInputValue("name", event.target.value?.replace(/[^a-zA-Z]/g, ''))}
                />
                <TextField variant="standard" id="input-with-icon-textfield" label="User name" value={data?.username}
                    onChange={(event) => handleInputValue("username", event.target.value)}
                />
                <TextField
                    variant="standard" id="input-with-icon-textfield" label="Password" value={data?.password}
                    // fullWidth
                    onChange={(event) => handleInputValue("password", event.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    slotProps={{
                        input: {
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
                <TextField variant="standard" id="input-with-icon-textfield" label="Email" value={data?.emailId}
                    onChange={(event) => handleInputValue("emailId", event.target.value)}
                />
                <div className="flex space-x-4 items-center">
                    <TextField className="w-1/4" variant="standard" id="input-with-icon-textfield" label="CC" type="text" value={data?.phone?.countryCode}
                        onChange={(event) => handleInputValue("phone", { ...data.phone, countryCode: event.target.value?.replace(/\D/g, '') })}
                    />
                    <TextField className="w-3/4" variant="standard" id="input-with-icon-textfield" label="Phone" type="text" value={data?.phone?.number}
                        onChange={(event) => handleInputValue("phone", { ...data.phone, number: event.target.value?.replace(/\D/g, '') })}
                    />
                </div>
                <TextField variant="standard" id="input-with-icon-textfield" label="Wallet Topup(₹)" value={data?.walletBalance} type="text"
                    onChange={(event) => handleInputValue("walletBalance", event.target.value?.replace(/\D/g, ''))}
                />
                {/* Create Account Button */}
                <Button
                    variant="contained"
                    disabled={isButtonDisabled}
                    sx={{ marginTop: '0.5rem', color: '#ffffff' }}
                    onClick={onCreateClick}
                >
                    Create Account
                </Button>
            </Box>
        </Box>
    );
}

export default NewUserComponent;