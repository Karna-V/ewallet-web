import axiosInstance from "./axiosinstance"

const getAllTransactions = async (userId: string, searchText?: string, sort?: "ASC" | "DESC", nextUrl?: string) => {
    let apiUrl = `/transaction/${userId}/get/all/0/10`;
    if (nextUrl == null) {
        let query = [];
        if (searchText)
            query.push(`searchText=${searchText}`);
        if (sort)
            query.push(`sort=${sort}`)
        if (query.length)
            apiUrl += `?${query.join('&')}`
    } else {
        apiUrl = nextUrl;
    }
    return await axiosInstance.get(apiUrl)
        .then((res: any) => {
            return { data: res.data.result };
        })
        .catch((error: any) => {
            console.log("error find in catch", error);
            return { data: error?.response?.data };
        });
}


const createTransaction = async (body: any) => {
    return await axiosInstance.post(`transaction/create`, body)
        .then((res: any) => {
            return { data: res.data.result };
        })
        .catch((error: any) => {
            console.log("error find in catch", error);
            return { data: error?.response?.data };
        });
}

export const TransactionService = {
    getAllTransactions, createTransaction
}