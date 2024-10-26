import Link from "next/link";
import { useEffect, useState } from "react";
const TopBar = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("isSignedIn") && localStorage.getItem("isSignedIn") == "true") {
            setIsSignedIn(true);
        }
    }, [])
    return (
        <header className="flex justify-between p-4  bg-zinc-800 text-white">
            <Link href="/home" className="m-0 text-2xl no-underline">
                <h1 className="m-0 text-2xl">E-Wallet</h1>
            </Link>
            {/* <h1 className="m-0 text-2xl">E-Wallet</h1> */}
            <nav className="flex gap-4 text-white no-underline text-base">
                <Link href="/home" >Home</Link>
                <Link href="/about" >About</Link>
                <Link href="/user/sign-in">{!isSignedIn ? "Sign In" : "Logout"}</Link>
            </nav>
        </header>
    )
}
export default TopBar;