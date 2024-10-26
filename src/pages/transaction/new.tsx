import TopBar from "@/components/topbar";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import SendIcon from '@mui/icons-material/Send';
import SendMoneyDialog from "@/components/sendMoneyComponent";
import { useEffect, useState } from "react";
import { UserData } from "@/models/user";
import { UserService } from "@/services/user-service";
import { ToastFunctions } from "@/utils/toast-functions";

const MakeTransactionPage = () => {
    const [users, setUsers] = useState<Array<UserData>>([]);
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    useEffect(() => {
        apiCall();
    }, [])

    async function apiCall(searchText?: string) {
        let currentUser = localStorage.getItem("currentUserId");
        let response = await UserService.getAllUsers(currentUser!, searchText);
        console.log(response, "res");

        if (response?.data) {
            if (!response.data.error) {
                let data = new Array<UserData>();
                response.data.data.forEach((each: any) => {
                    data.push(new UserData(each));
                })
                setUsers(data)
            } else {
                ToastFunctions.onCloseFailure(response?.data?.message)
            }
        } else {
            ToastFunctions.onCloseFailure("error in users get")
        }
    }

    return (
        <div className="h-screen">
            <TopBar />
            <div className="flex justify-center h-full bg-[#97E5F0]">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96 h-full max-h-[90vh]">
                    <input
                        type="text" onChange={(event) => apiCall(event.target.value)}
                        placeholder="Search users to send money"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <div className="h-full overflow-y-auto space-y-4 pr-2">
                        {users.map((each, index) => (
                            <div key={index} className="flex items-center gap-4 p-2 border-b border-gray-200">
                                <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                                <div className="flex flex-col text-left w-full">
                                    <div className="font-semibold text-lg">{each?.name}</div>
                                    <div className="text-gray-600">+{each?.phone?.countryCode}{each?.phone?.number}</div>
                                </div>
                                <div className="" onClick={() => { setSelectedUserId(each?.id!), setOpen(true) }}>
                                    <SendIcon className="cursor-pointer text-blue-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {open &&
                <SendMoneyDialog {...{ recipientId: selectedUserId, open, setOpen }} />}
        </div>
    );
};

export default MakeTransactionPage;
