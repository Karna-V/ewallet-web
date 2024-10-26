import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Typography, Box, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TopBar from '@/components/topbar';
import { TransactionService } from '@/services/transaction-service';
import { TransactionData } from '@/models/transaction';
import { ToastFunctions } from '@/utils/toast-functions';
import { format, parseISO } from 'date-fns';

const TransactionHistoryPage = () => {

    const [transactions, setTransactions] = useState<Array<TransactionData>>([]);

    useEffect(() => {
        apiCall();
    }, [])

    async function apiCall(searchText?: string) {
        let currentUser = localStorage.getItem("currentUserId");
        let response = await TransactionService.getAllTransactions(currentUser!, searchText);
        console.log(response, "res");

        if (response?.data) {
            if (!response.data.error) {
                let data = new Array<TransactionData>();
                response.data.data.forEach((each: any) => {
                    data.push(new TransactionData(each));
                })
                setTransactions(data)
            } else {
                ToastFunctions.onCloseFailure(response?.data?.message)
            }
        } else {
            ToastFunctions.onCloseFailure("error in transactions get")
        }
    }


    function formatISODate(isoDate: string): string {
        const date = parseISO(isoDate);
        return format(date, 'yyyy-MM-dd hh:ss a');
    }

    return (
        <div className="min-h-screen h-full">
            <TopBar />
            <Box className="flex flex-col items-center bg-[#f0f4f8] h-full p-4">
                <Typography variant="h4" component="h1" className="font-bold mb-4">
                    Transaction History
                </Typography>

                <TextField
                    label="Search by Recipient"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    className="max-w-lg"
                    onChange={(e) => apiCall(e.target.value)}
                />

                <List className="w-full max-w-lg bg-white shadow-lg rounded-lg" sx={{ height: '360px', overflowY: 'auto' }}>
                    {transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <React.Fragment key={transaction.id}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: '#1976d2' }}>
                                            <AccountCircleIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${transaction?.recipientData?.name} | Amount: ₹${transaction?.amount}`}
                                        secondary={` TXN-ID: ${transaction.id} | Date: ${formatISODate(transaction?.transactionDate!)}`}
                                    />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText primary="No transactions found." />
                        </ListItem>
                    )}
                </List>
            </Box>
        </div>
    );
};

export default TransactionHistoryPage;
