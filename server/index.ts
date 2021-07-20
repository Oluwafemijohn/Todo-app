import axios, { AxiosResponse } from "axios";
import {useMutation, useQuery, useQueryClient} from "react-query"
import {END_POINT, FETCH_TODO_KEY } from "../constants";
import { ITodo, ITodoResponseType, ITodoUpdateType } from "../store/types";

export const usePostTodo = () =>{
    const client = useQueryClient()
    return useMutation((payload:ITodo) => {
       return axios.post(`${END_POINT}?ownerEmail=solomon@gmail.com`, payload)
    },
    {
        onSuccess: ()=>{
            client.invalidateQueries(FETCH_TODO_KEY)
        }
    }
    )
} 

export const fetchTodo = () => {
    return useQuery<AxiosResponse<ITodoResponseType>>([FETCH_TODO_KEY], ()=> {
        return axios.get(`${END_POINT}?ownerEmail=solomon@gmail.com`)
    })
}

export const useDeleteTodo = () =>{
    const client = useQueryClient()
    return useMutation((title:string) => {
       return axios.delete(`${END_POINT}?ownerEmail=solomon@gmail.com&todoTitle=${title}`)

    },
    {
        onSuccess: ()=>{
            client.invalidateQueries(FETCH_TODO_KEY)
        }
    }
    )
} 

export const useUpdateTodo = () =>{
    const client = useQueryClient();
    return useMutation((payload:ITodoUpdateType) => {
        return axios.put(`${END_POINT}?ownerEmail=solomon@gmail.com`, payload)
    },
    {
        onSuccess: () => {
            client.invalidateQueries(FETCH_TODO_KEY)
        }  
    }
    )
}