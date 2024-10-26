import React, { Dispatch, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SendIcon from '@mui/icons-material/Send';
import { TransactionService } from '@/services/transaction-service';
import { TransactionData } from '@/models/transaction';
import { ToastFunctions } from '@/utils/toast-functions';
import { useRouter } from 'next/router';

const SendMoneyDialog = ({ recipientId, open, setOpen }: { recipientId: string, open: boolean, setOpen: Dispatch<React.SetStateAction<boolean>> }) => {
    const router = useRouter();
    const [success, setSuccess] = useState(false);

    const [data, setData] = useState<TransactionData>(new TransactionData());

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        setData((prevData: any) => ({
            ...prevData,
            senderId: localStorage.getItem("currentUserId"),
            recipientId: recipientId,
            paymentType: "e_wallet"
        }));
    }, [])

    function setAmount(amount: any) {
        console.log(amount);
        // Use a functional update to ensure you're working with the latest state
        setData((prevData: any) => ({
            ...prevData,
            amount: amount, // Update the amount with the new value
        }));
    }
    const handleSendMoney = async () => {
        let response = await TransactionService.createTransaction(data);
        if (response?.data) {
            if (!response.data.error) {
                ToastFunctions.onCloseSuccess("Transaction success");
                setSuccess(true);
                setTimeout(() => {
                    router.push('/home');
                }, 2000)
            } else {
                ToastFunctions.onCloseFailure(response?.data?.message)
            }
        } else {
            ToastFunctions.onCloseFailure("error in create")
        }
    };

    console.log(data, "payload data");


    return (
        <div className="flex justify-center items-center h-screen bg-[#97E5F0]">
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{success ? "Transaction Successful" : "Enter Amount"}</DialogTitle>

                <DialogContent>
                    {success ? (
                        <div className="flex justify-center items-center">
                            <CheckCircleIcon style={{ color: 'green', fontSize: 60 }} />
                        </div>
                    ) : (
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Amount"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={data?.amount ?? undefined}
                            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                        />
                    )}
                </DialogContent>

                <DialogActions>
                    {!success && (
                        <>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<SendIcon />}
                                onClick={handleSendMoney}
                                disabled={!data?.amount}
                            >
                                Send Money
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SendMoneyDialog;
