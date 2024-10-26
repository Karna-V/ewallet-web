import { UserData } from "@/models/user";
import { UserService } from "@/services/user-service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const HomeContent = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const router = useRouter();

    const [currentUserData, setCurrentUserData] = React.useState<UserData>(new UserData());
    useEffect(() => {
        if (localStorage.getItem("isSignedIn") && localStorage.getItem("isSignedIn") == "true") {
            setIsSignedIn(true);
            console.log("useEffect signedin")
            apiCall();
        }
    }, [])

    async function apiCall() {
        let userId = localStorage.getItem("currentUserId")!;
        let data = await UserService.getUser(userId);
        setCurrentUserData(new UserData(data?.data));
    }
    console.log(currentUserData);

    const handleSignInClick = () => {
        router.push('/user/sign-in');
    };

    const makeTransaction = () => {
        router.push('/transaction/new');
    }
    const seeTransactionHistory = () => {
        router.push('/transaction/history');
    }
    return (
        <div className="flex justify-center bg-[#97E5F0] items-center">
            <div className="flex gap-6 items-center justify-center">
                {isSignedIn ?
                    <div className="font bold text-3xl text-center flex flex-col gap-3 pl-20">
                        <div className="">Hi {currentUserData?.name}, Your Balance is</div>
                        <div className=""> &#8377;{currentUserData?.walletBalance}</div>
                        <button className="px-4 py-2 bg-blue-600 text-white border-none rounded-md cursor-pointer text-base"
                            onClick={makeTransaction}>Make Transaction</button>
                        <button className="px-4 py-2 border-none rounded-md cursor-pointer text-base text-blue-600"
                            onClick={seeTransactionHistory}>Your Transaction History</button>
                    </div>
                    :
                    <div className="flex flex-col items-center p-8 text-center gap-2 text-lg font-bold">
                        <h2>Welcome to the E-Wallet</h2>
                        <p>Manage your transactions easily and securely.</p>
                        <button className="px-4 py-2 bg-blue-600 text-white border-none rounded-md cursor-pointer text-base"
                            onClick={handleSignInClick}>Sign In</button>
                    </div>
                }

                <img src="/images/home_bg.webp" className="w-[680px] h-[490px]" alt="" />
            </div>
        </div>
    )
}

const styles = {
    button: {
        padding: '0.5rem 1rem',
        backgroundColor: '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
    }
};

export default HomeContent;