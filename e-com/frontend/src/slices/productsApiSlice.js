import { PRODUCTS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts: builder.query({
            query:()=>{
                url:PRODUCTS_URL
            }
        })
    })
});

export const {useGetProductsQuery} = productsApiSlice;