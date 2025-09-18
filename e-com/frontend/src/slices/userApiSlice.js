import { USERS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login:builder.mutation({
            query:(data) => ({
                url:`${USERS_URL}/login`,
                method:"POST",
                body:data,
            })
        }),
        logout:builder.mutation({
            query:(data) => ({
                url:`${USERS_URL}/logout`,
                method:"POST",
                body:data,
            })
        }),
        registerUser:builder.mutation({
            query:(data) => ({
                url:`${USERS_URL}/`,
                method:"POST",
                body:data,
            })
        })
    })
}); 

export const {useLoginMutation, useLogoutMutation, useRegisterUserMutation} = userApiSlice;

