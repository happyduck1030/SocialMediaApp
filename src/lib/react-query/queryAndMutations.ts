import { email } from 'zod/v4-mini';
import { 
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery
} from '@tanstack/react-query'
import {type INewUser } from '../../types'
import { createUserAccount, signInAccount } from '../appwrite/api'
export const useCreateUserAccount=()=>{
  return useMutation({
    mutationFn:(user:INewUser)=>createUserAccount(user)
  })
}
export const useSignInAccount=()=>{
    return useMutation({
      mutationFn:(user:{
        email:string,
        password:string;
      })=>signInAccount(user)
    })
}