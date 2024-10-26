import LoginComponent from "@/components/loginComponent";
import TopBar from "@/components/topbar";
import { useEffect } from "react";

export default function SignInPage() {
    useEffect(() => {
        localStorage.clear();
    }, [])
    return (
        <>
            <TopBar />
            <LoginComponent />
        </>
    );
}