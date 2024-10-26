import axiosInstance from "./axiosinstance"

const userLogin = async (body: any) => {
    return await axiosInstance.post(`/user/login`, body)
        .then((res: any) => {
            return { data: res.data.result };
        })
        .catch((error: any) => {
            console.log("error find in catch", error);
            return { data: error?.response?.data };
        });
}

const createUser = async (body: any) => {
    return await axiosInstance.post(`/user/create`, body)
        .then((res: any) => {
            return { data: res.data.result };
        })
        .catch((error: any) => {
            console.log("error find in catch", error);
            return { data: error?.response?.data };
        });
}

const getUser = async (id: string) => {
    return await axiosInstance.get(`/user/get/${id}`)
        .then((res: any) => {
            return { data: res.data.result };
        })
        .catch((error: any) => {
            console.log("error find in catch", error);
            return { data: error?.response?.data };
        });
}

const getAllUsers = async (currentUser: string, searchText?: string, nextUrl?: string) => {
    let apiUrl = `/user/get/all/0/10?currentUser=${currentUser}`;
    if (nextUrl == null) {
        let query = [];
        if (searchText)
            query.push(`searchText=${searchText}`);
        if (query.length)
            apiUrl += `&${query.join('&')}`
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

export const UserService = {
    userLogin, createUser, getUser, getAllUsers
}